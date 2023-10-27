
import {
    format,
    getUnixTime,
    fromUnixTime,
    addMonths,
    subMonths,
    startOfWeek,
    startOfMonth,
    endOfWeek,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay
  } from "date-fns"
  
  const datePickerButton: HTMLElement | null = document.querySelector(".date-picker-button")
  const datePicker: HTMLElement | null = document.querySelector(".date-picker")
  const datePickerHeaderText: HTMLElement | null = document.querySelector(".current-month")
  const previousMonthButton: HTMLElement | null = document.querySelector(".prev-month-button")
  const nextMonthButton: HTMLElement | null = document.querySelector(".next-month-button")
  const dateGrid: HTMLElement | null = document.querySelector(".date-picker-grid-dates")
  let currentDate: Date = new Date()
  
  datePickerButton?.addEventListener("click", () => {
    datePicker?.classList.toggle("show")
    const selectedDate: Date = fromUnixTime(Number(datePickerButton?.dataset.selectedDate))
    currentDate = selectedDate
    setupDatePicker(selectedDate)
  })
  
  function setDate(date: Date): void {
    datePickerButton!.innerText = format(date, "MMMM do, yyyy")
    datePickerButton!.dataset.selectedDate = String(getUnixTime(date))
  }
  
  function setupDatePicker(selectedDate: Date): void {
    datePickerHeaderText!.innerText = format(currentDate, "MMMM - yyyy")
    setupDates(selectedDate)
  }
  
  function setupDates(selectedDate: Date): void {
    const firstWeekStart: Date = startOfWeek(startOfMonth(currentDate))
    const lastWeekEnd: Date = endOfWeek(endOfMonth(currentDate))
    const dates: Date[] = eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd })
    dateGrid!.innerHTML = ""
  
    dates.forEach(date => {
      const dateElement: HTMLButtonElement = document.createElement("button")
      dateElement.classList.add("date")
      dateElement.innerText = date.getDate().toString()
      if (!isSameMonth(date, currentDate)) {
        dateElement.classList.add("date-picker-other-month-date")
      }
      if (isSameDay(date, selectedDate)) {
        dateElement.classList.add("selected")
      }
      console.log(selectedDate)
      dateElement.addEventListener("click", () => {
        setDate(date)
        datePicker?.classList.remove("show")
      })
  
      dateGrid!.appendChild(dateElement)
    })
  }
  
  nextMonthButton?.addEventListener("click", () => {
    const selectedDate: Date = fromUnixTime(Number(datePickerButton?.dataset.selectedDate))
    currentDate = addMonths(currentDate, 1)
    setupDatePicker(selectedDate)
  })
  
  previousMonthButton?.addEventListener("click", () => {
    const selectedDate: Date = fromUnixTime(Number(datePickerButton?.dataset.selectedDate))
    currentDate = subMonths(currentDate, 1)
    setupDatePicker(selectedDate)
  })
  
  setDate(new Date())

