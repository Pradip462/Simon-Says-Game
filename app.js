let gameSeq = [];
let userSeq = [];
let btns = ["yellow" , "red" , "purple" , "green"];
let lvl = [];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){
    
    if(started == false) {
        console.log("game started");
        started = true;

        levelUp();
    }
});


function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    },250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*3);
    //random button choose
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);

}

function checkAns(index){

    // console.log(`Current Level:${level}`);
    // let index = level-1;
    if(userSeq[index] == gameSeq[index]) {
        console.log("same value");
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp,1000);
        } 
    }
    else{
        lvl.push(level);
        let maxLevel = lvl[0];
        for(let i = 0;i < lvl.length;i++) {
            if(maxLevel < lvl[i]){
                maxLevel = lvl[i];
            }
        }
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br>Press Any Key to start<br> <b>HIGHEST SCORE:${maxLevel}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}

function btnPress() {
    console.log(this);
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click" ,btnPress );
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}