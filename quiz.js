let totalSeconds = 600; // 10 minutes (600 seconds)
let secondsLeft = totalSeconds; // Tracks time remaining
let isDone = false; // Flag to prevent multiple submissions

let timerText = document.getElementById("timer"); // Gets timer span from HTML
let quizForm = document.getElementById("privacyQuiz"); // Gets the quiz form
let retakeButton = document.getElementById("retakeBtn"); // Gets retake button

// Runs timer every second
let timer = setInterval(function () {
    if (secondsLeft <= 0) {
        clearInterval(timer); // Stops countdown
        if (!isDone) {
            alert("Time is up! Submitting your quiz.");
            submitQuiz(); // Submits when time reaches 0
        }
    } else {
        secondsLeft--; // Subtracts 1 second
        let mins = Math.floor(secondsLeft / 60); // Gets minutes
        let secs = secondsLeft % 60; // Gets seconds
        if (secs < 10) {
            secs = "0" + secs; // Adds leading zero
        }
        timerText.textContent = mins + ":" + secs; // Updates text on page
    }
}, 1000);
