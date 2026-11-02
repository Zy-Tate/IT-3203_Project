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

// Submits quiz on button click
quizForm.onsubmit = function (e) {
    e.preventDefault(); // Stops page from reloading
    submitQuiz();
};

// Reloads page to retake quiz
retakeButton.onclick = function () {
    location.reload();
};

function submitQuiz() {
    if (isDone) {
        return;
    }
    isDone = true;
    clearInterval(timer); // Stops timer

    // Calculate time spent
    let timeSpent = totalSeconds - secondsLeft;
    let spentMins = Math.floor(timeSpent / 60);
    let spentSecs = timeSpent % 60;
    let timeResult = spentMins + " minute(s), " + spentSecs + " second(s)";

    let score = 0;
    let breakdownHTML = "";
    
    // Question 1 (Fill-in)
    let q1 = quizForm.q1.value.trim().toLowerCase();
    let q1Correct = (q1 === "sdk" || q1 === "sdks");
    if (q1Correct) { score++; }
    breakdownHTML += makeItemHTML(1, q1Correct, quizForm.q1.value, "SDKs");

    // Question 2 (Fill-in)
    let q2 = quizForm.q2.value.trim().toLowerCase();
    let q2Correct = (q2 === "service");
    if (q2Correct) { score++; }
    breakdownHTML += makeItemHTML(2, q2Correct, quizForm.q2.value, "Service");

    // Question 3 (Fill-in)
    let q3 = quizForm.q3.value.trim().toLowerCase();
    let q3Correct = (q3 === "surveillance");
    if (q3Correct) { score++; }
    breakdownHTML += makeItemHTML(3, q3Correct, quizForm.q3.value, "Surveillance");

    // Question 4 (Fill-in)
    let q4 = quizForm.q4.value.trim().toLowerCase();
    let q4Correct = (q4 === "malicious");
    if (q4Correct) { score++; }
    breakdownHTML += makeItemHTML(4, q4Correct, quizForm.q4.value, "malicious");

    // Question 5 (Fill-in)
    let q5 = quizForm.q5.value.trim().toLowerCase();
    let q5Correct = (q5 === "text");
    if (q5Correct) { score++; }
    breakdownHTML += makeItemHTML(5, q5Correct, quizForm.q5.value, "Text");

    // Question 6 (Multiple Choice)
    let q6 = quizForm.q6.value;
    let q6Correct = (q6 === "C");
    if (q6Correct) { score++; }
    breakdownHTML += makeItemHTML(6, q6Correct, q6 ? "Option " + q6 : "(None)", "Option C");

    // Question 7 (Multiple Choice)
    let q7 = quizForm.q7.value;
    let q7Correct = (q7 === "B");
    if (q7Correct) { score++; }
    breakdownHTML += makeItemHTML(7, q7Correct, q7 ? "Option " + q7 : "(None)", "Option B");

    // Question 8 (Multiple Choice)
    let q8 = quizForm.q8.value;
    let q8Correct = (q8 === "A");
    if (q8Correct) { score++; }
    breakdownHTML += makeItemHTML(8, q8Correct, q8 ? "Option " + q8 : "(None)", "Option A");

    // Question 9 (Multi-Select)
    let q9Boxes = document.getElementsByName("q9");
    let q9A = q9Boxes[0].checked;
    let q9B = q9Boxes[1].checked;
    let q9C = q9Boxes[2].checked;
    let q9D = q9Boxes[3].checked;
    let q9Correct = (q9A && q9B && q9C && !q9D);
    if (q9Correct) { score++; }
    let q9UserAnswer = [];
    if (q9A) q9UserAnswer.push("A");
    if (q9B) q9UserAnswer.push("B");
    if (q9C) q9UserAnswer.push("C");
    if (q9D) q9UserAnswer.push("D");
    breakdownHTML += makeItemHTML(9, q9Correct, q9UserAnswer.length ? q9UserAnswer.join(", ") : "(None)", "A, B, and C");

    // Question 10 (Multi-Select)
    let q10Boxes = document.getElementsByName("q10");
    let q10A = q10Boxes[0].checked;
    let q10B = q10Boxes[1].checked;
    let q10C = q10Boxes[2].checked;
    let q10D = q10Boxes[3].checked;
    let q10Correct = (q10A && q10B && q10C && !q10D);
    if (q10Correct) { score++; }
    let q10UserAnswer = [];
    if (q10A) q10UserAnswer.push("A");
    if (q10B) q10UserAnswer.push("B");
    if (q10C) q10UserAnswer.push("C");
    if (q10D) q10UserAnswer.push("D");
    breakdownHTML += makeItemHTML(10, q10Correct, q10UserAnswer.length ? q10UserAnswer.join(", ") : "(None)", "A, B, and C");

    // Set Pass or Fail status
    let passStatus = document.getElementById("passFailStatus");
    if (score >= 7) {
        passStatus.textContent = "PASSED";
        passStatus.className = "result-pass";
    } else {
        passStatus.textContent = "FAILED";
        passStatus.className = "result-fail";
    }

    // Set numbers and time spent in the modal
    document.getElementById("scoreText").textContent = score;
    document.getElementById("timeSpentText").textContent = timeResult;
    document.getElementById("answersBreakdown").innerHTML = breakdownHTML;

    // Show modal popup
    document.getElementById("resultsModal").style.display = "block";
}

// Simple helper function to build basic HTML cards for each question
function makeItemHTML(qNum, isCorrect, userAns, realAns) {
    let cardClass = isCorrect ? "breakdown-item correct-card" : "breakdown-item incorrect-card";
    let textClass = isCorrect ? "result-pass" : "result-fail";
    let resultLabel = isCorrect ? "Correct" : "Incorrect";

    return '<div class="' + cardClass + '">' +
        '<p><strong>Question ' + qNum + ':</strong> <span class="' + textClass + '">' + resultLabel + '</span></p>' +
        '<p><strong>Your Answer:</strong> ' + (userAns === "" ? "(Empty)" : userAns) + '</p>' +
        '<p><strong>Correct Answer:</strong> ' + realAns + '</p>' +
        '</div>';
}