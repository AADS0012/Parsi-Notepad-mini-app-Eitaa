let userName = "کاربر";

if (window.Eitaa && Eitaa.WebApp) {
  const user = Eitaa.WebApp.initDataUnsafe?.user;
  if (user) {
    userName = user.first_name || "کاربر";
  }
}

document.getElementById("username").innerText =
  `سلام ${userName} 👋`;

function saveNote() {
  const note = document.getElementById("note").value;
  localStorage.setItem("note", note);
  document.getElementById("result").innerText = "✅ ذخیره شد";
}
