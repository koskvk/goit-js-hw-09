function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

let isStartActive = false;
let timerId = null;

const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');

buttonStart.addEventListener('click', onButtonStartClick);
buttonStop.addEventListener('click', onButtonStopClick);

buttonStop.disabled = true;

function onBodyChangeBackgroundColor() {
    document.body.style.backgroundColor = getRandomHexColor();
}

function onButtonStartClick() {
    if (isStartActive) {
        return;
    };

    timerId = setInterval(onBodyChangeBackgroundColor, 1000);
    
    buttonStart.disabled = true;
    buttonStop.disabled = false;
    isStartActive = true;
};

function onButtonStopClick() {
    clearInterval(timerId);

    buttonStart.disabled = false;
    buttonStop.disabled = true;
    isStartActive = false;
};


