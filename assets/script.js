var timer;
var timeLeft = 5;
var qIndex = 0;
var qArray = [
    {
        "question": "ask a question",
        "answers": ["answer1", "answer2"],
        "answerStatus": ["correct", "incorrect"]
    }
]
var score = {
    "who": "",
    "value": ""
}

function startTimer() {
    timer = setInterval(function () {
            if(timeLeft > 0) {
                document.getElementById("timer").textContent = timeLeft;
                timeLeft--;
            }
            else clearInterval(timer)
        },1000)
}

function nextQuestion() {
    var qArea = document.getElementById("question-display");
    var aArea = document.getElementById("answer-display");
    var aButton = "";

    qArea.innerHTML = "";
    aArea.innerHTML = "";

    qArea.textContent = qArray[qIndex].question
    for(var i=0;i<qArray[qIndex].answers.length;i++) {
        aButton = document.createElement("button")
        aButton.setAttribute("data-status",qArray[qIndex].answerStatus[i])
        aButton.textContent = qArray[qIndex].answers[i]
        aArea.appendChild(aButton)
    }
}

function startQuiz() {
    qIndex = 0;
    timeLeft = 5;
    startTimer();
    nextQuestion();
}

function answerQuestion(event) {
    var buttonClicked = event.target
    if(buttonClicked.matches("button") === true) {
        var ans = buttonClicked.getAttribute("data-status");

        if(ans="incorrect") {
            timeLeft -= 15;
        }
        if(qIndex < qArray.length - 1) {
            qIndex++;
            nextQuestion();
        }
        else {
            endQuiz();
        }
    }
}

function endQuiz() {
    var prevScores = localStorage.getItem("scores");
    if(timeLeft < 0) {
        timeLeft = 0;
    }
    score.value = timeLeft;
    clearInterval(timer);
    displayHighScores("end");


}

function displayHighScores(quizEnded) {
    if(quizEnded) {
        //display entry to log new score
    }
        //display previous scores

}

document.getElementById("startButton").addEventListener("click",startQuiz)
document.getElementById("hsbutton").addEventListener("click", function () {
    displayHighScores(false)
}
)
document.getElementById("answer-display").addEventListener("click", answerQuestion)
