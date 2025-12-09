import { getJSON, setJSON } from "./utils/storage.js";

const STORAGE_KEY = "672305-GMAROKO";

let state = {
  notes: loadInitial(),
};

function loadInitial() {
  const saved = getJSON(STORAGE_KEY, []);
  if (Array.isArray(saved)) {
    // data validation
    return saved
      .filter(n => n && typeof n.id === "string" && typeof n.text === "string")
      .map(n => ({ ...n, createdAt: Number(n.createdAt) || Date.now() }));
  }
  return [];
}

function persist() {
  setJSON(STORAGE_KEY, state.notes);
}

function uid() {
  return (
    Date.now().toString(36) +
    "-" +
    Math.random().toString(36).slice(2, 9)
  );
}

export function getAllNotes() {
  return [...state.notes];
}

export function addNote(text) {
  const trimmed = String(text ?? "").trim();
  if (!trimmed) return null;

  const note = { id: uid(), text: trimmed, createdAt: Date.now() };
  state.notes.unshift(note);       // newest first
  persist();
  return note;
}

export function deleteNote(id) {
  const before = state.notes.length;
  state.notes = state.notes.filter(n => n.id !== id);
  const changed = state.notes.length !== before;
  if (changed) persist();
  return changed;
}

export function clearAll() {
  state.notes = [];
  persist();
}
