"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const datePickerButton = document.querySelector(".date-picker-button");
const datePicker = document.querySelector(".date-picker");
const datePickerHeaderText = document.querySelector(".current-month");
const previousMonthButton = document.querySelector(".prev-month-button");
const nextMonthButton = document.querySelector(".next-month-button");
const dateGrid = document.querySelector(".date-picker-grid-dates");
let currentDate = new Date();
datePickerButton === null || datePickerButton === void 0 ? void 0 : datePickerButton.addEventListener("click", () => {
    datePicker === null || datePicker === void 0 ? void 0 : datePicker.classList.toggle("show");
    const selectedDate = (0, date_fns_1.fromUnixTime)(Number(datePickerButton === null || datePickerButton === void 0 ? void 0 : datePickerButton.dataset.selectedDate));
    currentDate = selectedDate;
    setupDatePicker(selectedDate);
});
function setDate(date) {
    datePickerButton.innerText = (0, date_fns_1.format)(date, "MMMM do, yyyy");
    datePickerButton.dataset.selectedDate = String((0, date_fns_1.getUnixTime)(date));
}
function setupDatePicker(selectedDate) {
    datePickerHeaderText.innerText = (0, date_fns_1.format)(currentDate, "MMMM - yyyy");
    setupDates(selectedDate);
}
function setupDates(selectedDate) {
    const firstWeekStart = (0, date_fns_1.startOfWeek)((0, date_fns_1.startOfMonth)(currentDate));
    const lastWeekEnd = (0, date_fns_1.endOfWeek)((0, date_fns_1.endOfMonth)(currentDate));
    const dates = (0, date_fns_1.eachDayOfInterval)({ start: firstWeekStart, end: lastWeekEnd });
    dateGrid.innerHTML = "";
    dates.forEach(date => {
        const dateElement = document.createElement("button");
        dateElement.classList.add("date");
        dateElement.innerText = date.getDate().toString();
        if (!(0, date_fns_1.isSameMonth)(date, currentDate)) {
            dateElement.classList.add("date-picker-other-month-date");
        }
        if ((0, date_fns_1.isSameDay)(date, selectedDate)) {
            dateElement.classList.add("selected");
        }
        console.log(selectedDate);
        dateElement.addEventListener("click", () => {
            setDate(date);
            datePicker === null || datePicker === void 0 ? void 0 : datePicker.classList.remove("show");
        });
        dateGrid.appendChild(dateElement);
    });
}
nextMonthButton === null || nextMonthButton === void 0 ? void 0 : nextMonthButton.addEventListener("click", () => {
    const selectedDate = (0, date_fns_1.fromUnixTime)(Number(datePickerButton === null || datePickerButton === void 0 ? void 0 : datePickerButton.dataset.selectedDate));
    currentDate = (0, date_fns_1.addMonths)(currentDate, 1);
    setupDatePicker(selectedDate);
});
previousMonthButton === null || previousMonthButton === void 0 ? void 0 : previousMonthButton.addEventListener("click", () => {
    const selectedDate = (0, date_fns_1.fromUnixTime)(Number(datePickerButton === null || datePickerButton === void 0 ? void 0 : datePickerButton.dataset.selectedDate));
    currentDate = (0, date_fns_1.subMonths)(currentDate, 1);
    setupDatePicker(selectedDate);
});
setDate(new Date());
