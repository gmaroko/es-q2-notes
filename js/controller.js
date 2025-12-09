import { getAllNotes, addNote, deleteNote } from "./model.js";
import { renderList, bindAdd, bindDelete } from "./view.js";

function init() {
  // for the start, get our nots from local storage
  renderList(getAllNotes());
  bindAdd((text) => {
    const note = addNote(text);
    if (note) {
      renderList(getAllNotes());
    }
  });
  bindDelete((id) => {
    const removed = deleteNote(id);
    if (removed) {
      renderList(getAllNotes());
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}