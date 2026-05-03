let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editId = null;

// دریافت نام کاربر از ایتا
let userName = "کاربر";
// if (window.Eitaa && Eitaa.WebApp) {
//   const user = Eitaa.WebApp.initDataUnsafe?.user;
//   if (user?.first_name) userName = user.first_name;
// }
document.getElementById("username").innerText = `سلام ${userName} 👋`;

const form = document.getElementById("noteForm");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const list = document.getElementById("notesList");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (editId) {
    notes = notes.map(n =>
      n.id === editId ? { ...n, title: titleInput.value, content: contentInput.value } : n
    );
    editId = null;
  } else {
    notes.push({
      id: Date.now(),
      title: titleInput.value,
      content: contentInput.value
    });
  }

  saveAndRender();
  form.reset();
});

function renderNotes() {
  list.innerHTML = "";

  notes.forEach(note => {
    const card = document.createElement("div");
    card.className = "card mb-2 shadow-sm";

    card.innerHTML = `
      <div class="card-body">
        <h6 class="card-title">${note.title}</h6>
        <p class="card-text small">${note.content}</p>

        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-warning" onclick="editNote(${note.id})">✏ ویرایش</button>
          <button class="btn btn-sm btn-danger" onclick="deleteNote(${note.id})">🗑 حذف</button>
        </div>
      </div>
    `;

    list.appendChild(card);
  });
}

function editNote(id) {
  const note = notes.find(n => n.id === id);
  if (!note) return;

  titleInput.value = note.title;
  contentInput.value = note.content;
  editId = id;
}

function deleteNote(id) {
  notes = notes.filter(n => n.id !== id);
  saveAndRender();
}

function clearAll() {
  if (confirm("همه یادداشت‌ها حذف شوند؟")) {
    notes = [];
    saveAndRender();
  }
}

function clearForm() {
  titleInput.value = ""
  contentInput.value = ""
}

function saveAndRender() {
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}

renderNotes();
