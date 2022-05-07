import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
        onClose(selectedDates) {
            // dateSelectedByTheUser(selectedDates[0]);
            console.log(selectedDates[0]);
        },
};
const inputEl = document.querySelector("#datetime-picker");
const fp = flatpickr(inputEl, options);

// function dateSelectedByTheUser(date) {
//     console.log(date);
// };