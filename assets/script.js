var timer;
var timeLeft = 100;
var qIndex = 0;
var qArray = [
    {
        "question": "Commonly used data types do NOT include:",
        "answers": ["strings", "booleans", "alerts", "numbers"],
        "answerStatus": ["n", "n", "y", "n"]
    },
    {
        "question": "The condition in an if/else statement is enclosed in:",
        "answers": ["quotes", "curly brackets", "parentheses", "square brackets"],
        "answerStatus": ["n", "n", "y", "n"]
    },
    {
        "question": "Arrays in Javascript can be used to store:",
        "answers": ["numbers and strings", "other arrays", "booleans", "all of the above"],
        "answerStatus": ["n", "n", "n", "y"]
    },
    {
        "question": "String values must be enclosed within what when being assigned to variables?",
        "answers": ["commas", "curly brackets", "quotes", "parentheses"],
        "answerStatus": ["n", "n", "y", "n"]
    },
    {
        "question": "A very useful tool used during development and debugging for printing content to the debugger:",
        "answers": ["Javascript", "terminal", "for loops", "console log"],
        "answerStatus": ["n", "n", "n", "y"]
    }
]
var score = {
    "who": "",
    "value": 0
}

//timer
function startTimer() {
    timer = setInterval(function () {
            if(timeLeft > 0) {
                document.getElementById("timer").textContent = timeLeft;
                timeLeft--;
            }
            else {
                endQuiz();
                clearInterval(timer)
            }
        },1000)
}

//start quiz
function startQuiz() {
    qIndex = 0;
    timeLeft = 100;
    hideAll();
    document.getElementById("quiz-container").setAttribute("class", "show");
    startTimer();
    nextQuestion();
}

//get the next question
function nextQuestion() {
    var qArea = document.getElementById("question-display");
    var aArea = document.getElementById("answer-display");
    var aButton = "";

    qArea.innerHTML = "";
    aArea.innerHTML = "";

    qArea.textContent = qArray[qIndex].question
    for(var i=0;i<qArray[qIndex].answers.length;i++) {
        aButton = document.createElement("button")
        aButton.setAttribute("data-status", qArray[qIndex].answerStatus[i])
        aButton.textContent = qArray[qIndex].answers[i]
        aArea.appendChild(aButton)
    }
}

//question answered
function answerQuestion(event) {
    var buttonClicked = event.target
    var lastAnswer = document.getElementById("last-answer")
    if(buttonClicked.matches("button") === true) {
        var ans = buttonClicked.getAttribute("data-status");
        //incorrect answer penalty
        if(ans === "n") {
            timeLeft -= 10;
            lastAnswer.textContent = "Wrong!"
        }
        else {
            lastAnswer.textContent = "Correct!"
        }
        //check for last question, either get next or end
        if(qIndex < qArray.length - 1) {
            qIndex++;
            nextQuestion();
        }
        else {
            endQuiz();
        }
    }
}
//either all questions answered or time expires
function endQuiz() {
    clearInterval(timer);
    //time expired, prevent negative score
    if(timeLeft < 0) {
        timeLeft = 0;
    }

    document.getElementById("timer").textContent = "";
    document.getElementById("score").textContent = timeLeft
    hideAll();
    document.getElementById("score-container").setAttribute("class", "show");
}

//save to local storage
function saveScore() {
    var newScores = [];
    score.who = document.getElementById("initials").value;
    score.value = timeLeft;
    var prevScores = JSON.parse(localStorage.getItem("scores"));
    if(prevScores !== null) {
        newScores = prevScores
    }
    newScores.push(score);
    localStorage.setItem("scores", JSON.stringify(newScores));
    displayHighScores();
}

//display high scores
function displayHighScores() {
    var hsDiv = document.getElementById("high-scores");
    var scores = JSON.parse(localStorage.getItem("scores"));
    hsDiv.innerHTML = "";
    if(scores == "") {
        hsDiv.textContent = "No scores logged"
    }
    else {
        for(var i=0;i<scores.length;i++) {
            var newHS = document.createElement("div")
            newHS.textContent = scores[i].who + "  " + scores[i].value;
            hsDiv.appendChild(newHS)
        }
    }
    hideAll();
    document.getElementById("high-scores-container").setAttribute("class", "show");
  
}

//clear screen to start over
function resetScreen() {
    score.who = ""
    score.value = 0;
    document.getElementById("initials").value = ""
    hideAll();
    document.getElementById("start-container").setAttribute("class", "show");
    document.getElementById("hsbutton").setAttribute("class", "show");
}

//hide all containers
function hideAll() {
    document.getElementById("hsbutton").setAttribute("class", "hidden");
    document.getElementById("start-container").setAttribute("class", "hidden");
    document.getElementById("quiz-container").setAttribute("class", "hidden");
    document.getElementById("score-container").setAttribute("class", "hidden");
    document.getElementById("high-scores-container").setAttribute("class", "hidden");
}

//event listeners
document.getElementById("startButton").addEventListener("click", startQuiz)
document.getElementById("hsbutton").addEventListener("click", function () {
        displayHighScores()
    }
)
document.getElementById("answer-display").addEventListener("click", answerQuestion)
document.getElementById("save").addEventListener("click", saveScore);
document.getElementById("return").addEventListener("click", resetScreen);
document.getElementById("reset").addEventListener("click", function() {
        localStorage.removeItem("scores")
        document.getElementById("high-scores").textContent = "No scores logged"
    }
);