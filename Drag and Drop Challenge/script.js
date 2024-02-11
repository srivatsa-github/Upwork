const drag = document.querySelectorAll(".drag");
const drop1 = document.querySelectorAll(".drop");

for (let i = 0; i < drag.length; i++) {
  drag[i].setAttribute("draggable", true);
  drag[i].addEventListener("dragstart", setting);
  drop1[i].addEventListener("dragover", pD);
  drop1[i].addEventListener("drop", getting);
}

function pD(e) {
  e.preventDefault();
}

function setting(e) {
  e.dataTransfer.setData("storage", e.target.innerText);
}

function getting(e) {
  const data = e.dataTransfer.getData("storage");
  const drag = document.querySelectorAll(".drag");
  if (e.target.innerText[0].charCodeAt(0) + 1 == data.charCodeAt(0)) {
    e.target.innerText =
      e.target.innerText[0] +
      " " +
      data +
      " " +
      e.target.innerText[e.target.innerText.length - 1];
    for (let i = 0; i < drag.length; i++) {
      if (data == drag[i].innerText) {
        drag[i].innerText = "";

        drag[i].style.backgroundColor = "white";
        drag[i].style.border = "none";
      }
    }
  }
}
