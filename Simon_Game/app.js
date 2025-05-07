let gameSeq = []; // empty arrary
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false; //kya game start start ho chuka hain
let level = 0; // level 0 hain start nhi huwa hain

//access
let h2 = document.querySelector("h2");

// we want any key press in button and start game

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game Started");
    started = true;
    levelUp();
  }
});

// random button flash hoga

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
  userSeq = []; // user sequ ko empty kr denge wrong hone pe
  level++; // level incresse hoga
  h2.innerText = `Level ${level}`; // level ka value update krna hain

  // random btn choose

  let randIdx = Math.floor(Math.random() * 3);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  // console.log(randIdx);
  // console.log(randColor);
  // console.log(randBtn);
  gameSeq.push(randColor);
  console.log("game sequesnce", gameSeq);
  gameFlash(randBtn);
}

function checkAns(idx) {
  // console.log("curr level: ", level);
  // let idx = level-1;
  if (userSeq[idx] === gameSeq[idx]) {
    // console.log("same value");
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp(), 1000);
    }
  } else {
    h2.innerHTML = `Game over! Your Score was <b> ${level} </b> <b> Press any key to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function btnPress() {
  // console.log("btn was pressed");
  console.log(this);
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id"); // id attribute ka value nikal lenge
  //  console.log(userColor);
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn"); // ACCESS ALL BUTTONS
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
