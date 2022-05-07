import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    inputEl: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    outputDays: document.querySelector('[data-days]'),
    outputHours: document.querySelector('[data-hours]'),
    outputMinutes: document.querySelector('[data-minutes]'),
    outputSeconds: document.querySelector('[data-seconds]'),
};

let selectedDate = null;
const isDisabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      dateSelectedByTheUser(selectedDates[0]);
  },
};

refs.startBtn.addEventListener('click', onStartBtnCkick);
refs.startBtn.disabled = isDisabled;

const fp = flatpickr(refs.inputEl, options);

function dateSelectedByTheUser(date) {
    if (Date.now() > date) {
        refs.startBtn.disabled = isDisabled;
        Notify.failure("Please choose a date in the future");
    } else {
        refs.startBtn.disabled = !isDisabled;
        selectedDate = date;
    };
};

function onStartBtnCkick() {
    fp.destroy();
    refs.inputEl.disabled = isDisabled;
    refs.startBtn.disabled = isDisabled;
    timer();
};

function timer() {
    const timerId = setInterval(() => {
        let restMs = null;
        const restOfTime = convertMs(restMs = selectedDate - Date.now());

        markupOutputData(restOfTime);
        // Stop timer and disable input interface
        if (restMs < 1000) {
            clearInterval(timerId);
            Notify.failure("Time is over!");
            refs.inputEl.disabled = !isDisabled;
            refs.startBtn.disabled = !isDisabled;
        }
    }, 1000);
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return String(value).padStart(2, 0);
}

function markupOutputData({ days, hours, minutes, seconds }) {
    refs.outputDays.textContent = addLeadingZero(days);
    refs.outputHours.textContent = addLeadingZero(hours);
    refs.outputMinutes.textContent = addLeadingZero(minutes);
    refs.outputSeconds.textContent = addLeadingZero(seconds);
};