// Updated app.js

let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let audioCorrect = new Audio("correct.mp3");
let audioIncorrect = new Audio("incorrect.mp3");

function startGame() {
  started = true;
  levelUp();
}

document.addEventListener("keypress", function () {
  if (!started) {
    console.log("game is started");
    startGame();
  }
});

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * btns.length);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

function checkAns() {
  for (let i = 0; i < userSeq.length; i++) {
    if (userSeq[i] !== gameSeq[i]) {
      playSound(audioIncorrect);
      h2.innerHTML = "<span class='game-over'>Game Over!</span>";
      document.querySelector("body").style.backgroundColor = "red";
      setTimeout(function () {
        document.querySelector("body").style.backgroundColor = "white";
      }, 150);
      setTimeout(function () {
        h2.innerHTML = "<span class='press-to-start'>Press any key to start.</span>";
        h2.classList.add("fade-in");
      }, 1500);
      reset();
      return;
    }
  }

  if (userSeq.length === gameSeq.length) {
    playSound(audioCorrect);
    h2.innerText = "Level Completed!";
    setTimeout(function () {
      h2.innerText = `Level ${level}`;
    }, 1000);
    setTimeout(levelUp, 2000);
  }
}


function btnPress() {
  let btn = this;
  userFlash(btn);
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  playSound(new Audio(`${userColor}.mp3`));
  checkAns();
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
