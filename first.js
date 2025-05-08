const input = document.querySelector(`.wrapper .input-field`)
const typingText = document.querySelector(`.typing-text p`);
const Time = document.querySelector(`.time span b`);
const mistakeDisplay = document.querySelector(`.mistakes-display p span `);
const WPM = document.querySelector(`.wpm span`);
const CPM = document.querySelector(`.cpm span`);
const btn = document.querySelector(`button`);

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph() {
    const paragraph = ["Avoid daydreaming about the years to come.","You are the most important person in your whole life.","Always be true to who you are, and ignore what other people have to say about you.","Always be true to who you are, and ignore what other people have to say about you.","Only demonstrate your strength when it’s really required.","Whatever you can think you can do."];

    const randomIndex = Math.floor(Math.random()*paragraph.length);
    typingText.innerHTML = ``;
    for(const char of paragraph[randomIndex]) {
        console.log(char);
        typingText.innerHTML+= `<span>${char}</span>`;
    }
        typingText.querySelectorAll(`span`)[0].classList.add(`active`);
        document.addEventListener(`keydown`, () => input.focus());
        typingText.addEventListener(`click`, () => input.focus());
}

function initTyping() {
    const char = typingText.querySelectorAll(`span`);
    const typedChar = input.value.charAt(charIndex);
    if(charIndex < char.length && timeLeft > 0) {
        if(char[charIndex].innerText === typedChar) {
            if(!isTyping) {
                timer = setInterval(initTime,1000);
                isTyping = true;
            }
            char[charIndex].classList.add(`correct`);
            console.log(`correct`);
        } else {
            mistake++;
            char[charIndex].classList.add(`incorrect`);
            console.log(`incorrect`);
        }
        charIndex++;

        char[charIndex].classList.add(`active`);

        const mistakes = document.querySelector(".mistakes-display span");
        mistakes.innerText = mistake;
        CPM.innerText = charIndex - mistake;
        
    }
    else {
clearInterval(timer);
input.value = ``;
    }
}
function initTime() {
    if(timeLeft>0) {
        timeLeft--;
        Time.innerText = timeLeft;
        const wpmval = Math.round(((charIndex - mistake)/5)/(maxTime - timeLeft)*60);
        WPM.innerText =  wpmval;
    } 
    else {
        clearInterval(timer);
    }
}

// const Time = document.querySelector(".time-element-class-or-id");

function reset() {
    document.querySelector(".mistakes-display span").innerText = 0;
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    Time.innerText = timeLeft;
    input.value = ``;
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    WPM.innerText = 0;
    CPM.innerText = 0;
    mistakeDisplay.innerText = 0;
}

input.addEventListener(`input`,initTyping);
btn.addEventListener(`click`,reset);
loadParagraph();

