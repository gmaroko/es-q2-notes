// cache
const listEl = document.getElementById("notes-list");
const template = document.getElementById("note-template");
const formEl = document.getElementById("note-form");
const inputEl = document.getElementById("note-input");
const listRegion = document.getElementById("list-region");

// render list using template
export function renderList(notes) {
  listEl.textContent = "";

  if (!notes.length) {
    listRegion.innerHTML = `<div class="empty">No notes yet. Add your first one!</div>`;
    return;
  } else {
    listRegion.innerHTML = "";
    listRegion.appendChild(listEl);
  }

  const frag = document.createDocumentFragment();

  for (const note of notes) {
    const node = template.content.firstElementChild.cloneNode(true);

    node.dataset.id = note.id;

    const textEl = node.querySelector(".note__text");
    textEl.textContent = note.text;

    const timeEl = node.querySelector(".note__time");
    const date = new Date(note.createdAt);
    timeEl.dateTime = date.toISOString();
    timeEl.textContent = date.toLocaleString();

    frag.appendChild(node);
  }

  listEl.appendChild(frag);
}


export function bindAdd(handler) {
  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = inputEl.value;
    handler(value);
    formEl.reset();
    inputEl.focus();
  });

  inputEl.addEventListener("keydown", (e) => {
    const isCmdOrCtrl = e.metaKey || e.ctrlKey;
    if (isCmdOrCtrl && e.key === "Enter") {
      e.preventDefault();
      formEl.requestSubmit();
    }
  });
}

export function bindDelete(handler) {
  listEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action='delete']");
    if (!btn) return;

    const li = btn.closest("[data-id]");
    if (!li) return;

    const id = li.dataset.id;
    handler(id);
  });
}
