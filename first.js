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
    const paragraph = ["Be at miss or each good play home they. It leave taste mr in it fancy. She son lose does fond bred gave lady get. Sir her company conduct expense bed any. Sister depend change off piqued one. Contented continued any happiness instantly objection yet her allowance. Use correct day new brought tedious. By come this been in. Kept easy or sons my it done.","Fog everywhere. Fog up the river, where it flows among green aits and meadows; fog down the river, where it rolls deified among the tiers of shipping and the waterside pollutions of a great (and dirty) city. Fog on the Essex marshes, fog on the Kentish heights. Fog creeping into the cabooses of collier-brigs; fog lying out on the yards and hovering in the rigging of great ships; fog drooping on the gunwales of barges and small boats.","It is Spring, moonless night in the small town, starless and bible-black, the cobblestreets silent and the hunched, courters'-and- rabbits' wood limping invisible down to the sloeblack, slow, black, crowblack, fishingboat-bobbing sea. The houses are blind as moles (though moles see fine to-night in the snouting, velvet dingles) or blind as Captain Cat there in the muffled middle by the pump and the town clock, the shops in mourning, the Welfare Hall in widows' weeds.", "Hush, the babies are sleeping, the farmers, the fishers, the tradesmen and pensioners, cobbler, schoolteacher, postman and publican, the undertaker and the fancy woman, drunkard, dressmaker, preacher, policeman, the webfoot cocklewomen and the tidy wives. Young girls lie bedded soft or glide in their dreams, with rings and trousseaux, bridesmaided by glow-worms down the aisles of the organplaying wood. The boys are dreaming wicked or of the bucking ranches of the night and the jollyrogered sea."];

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




