"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

const MAX_IMAGES = 5;

let play = true;
let noCount = 0;

yesButton.addEventListener("click", handleYesClick);

noButton.addEventListener("click", function () {
  if (play) {
    noCount++;
    const imageIndex = Math.min(noCount, MAX_IMAGES);
    changeImage(imageIndex);
    resizeYesButton();
    shrinkNoButtonText();
    if (noCount === MAX_IMAGES) {
      play = false;
    }
  }
});

function handleYesClick() {
  titleElement.innerHTML = "Yay! I knew you would say yes! :3";
  buttonsContainer.style.display = "none"; // Hide button container
  changeImage("yes");
}

function resizeYesButton() {
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  const newFontSize = fontSize * 1.6;

  yesButton.style.fontSize = `${newFontSize}px`;
}

function generateMessage(noCount) {
  const messages = [
    "How would we know if we don’t try?",
    "Pookie please",
    "Don't do this to me :(",
    "You're breaking my heart",
    "Miss ganda, sige na"
  ];

  const messageIndex = Math.min(noCount, messages.length - 1);
  return messages[messageIndex];
}

function changeImage(image) {
  catImg.src = `img/cat-${image}.jpg`;
}

function updateNoButtonText() {
  noButton.innerHTML = generateMessage(noCount);

  // When reaching "Miss ganda, sige na", turn both buttons into "Yes"
  if (noCount === 4) {
    noButton.innerHTML = "Yes";
    noButton.classList.add("btn--yes");
    noButton.removeEventListener("click", handleNoClick);
    noButton.addEventListener("click", handleYesClick);

    yesButton.innerHTML = "Yes"; // Change Yes button too
    yesButton.removeEventListener("click", handleYesClick);
    yesButton.addEventListener("click", handleYesClick);
  }
}

function handleNoClick() {
  if (play) {
    noCount++;
    changeImage(noCount);
    resizeYesButton();
    updateNoButtonText();
  }
}

