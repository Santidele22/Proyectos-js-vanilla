const dropZone = document.querySelectorAll(".box");
const items = document.querySelectorAll("img");
const resetContainer = document.querySelector(".reset");
const container = document.querySelector(".card-container");
const title = document.querySelector("#title");
//variable
let attempts = 0;

items.forEach((item) =>
  item.addEventListener("dragstart", (ev) => {
    ev.dataTransfer.setData("text/plain", item.id);
  })
);

dropZone.forEach((e) => {
  e.addEventListener("dragover", (ev) => ev.preventDefault());
});

dropZone.forEach((e) =>
  e.addEventListener("drop", (ev) => {
    const id = ev.dataTransfer.getData("text/plain");
    const item = document.querySelector("#" + id);

    if (id === e.id) {
      e.textContent = "";
      e.append(item);
      gameWin();
    } else {
      attempts++;
      alert("Incorrecto! te quedan " + (3 - attempts) + " intentos");
    }
    if (attempts === 3) {
      gameOver();
    }
  })
);

function gameOver() {
  title.textContent = "Perdiste!! Sos un fracasado de la vida";
  createBtn();
}

function reset() {
  attempts = 0;
  title.textContent = "Arrastra donde corresponda";
  container.textContent = "";
  dropZone.forEach((e) => (e.textContent = e.id));

  // Restablecer las imágenes a su contenedor original
  items.forEach((item) => {
    const imageContainer = document.createElement("figure");
    imageContainer.setAttribute("class", "image-container");

    imageContainer.appendChild(item);
    container.appendChild(imageContainer);
  });

  resetContainer.textContent = "";
}

function gameWin() {
  const allHaveImage = Array.from(dropZone).every((box) =>
    box.querySelector("img")
  );
  if (allHaveImage) {
    title.textContent = "Felicitaciones haz ganado!!";
    createBtn();
  }
}

const createBtn = () => {
  const btn = document.createElement("button");
  btn.textContent = "Reset Game";
  resetContainer.append(btn);
  btn.addEventListener("click", reset);
};
