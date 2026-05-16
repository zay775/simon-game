let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;
let highScore = 0;

// Start game
document.getElementById("start-btn").addEventListener("click", function () {
    if (!started) {
        nextSequence();
        started = true;
    }
});

// Click detection
document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", function () {
        let userColor = this.id;
        userClickedPattern.push(userColor);

        animatePress(userColor);
        checkAnswer(userClickedPattern.length - 1);
    });
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 800);
        }
    } else {
        document.body.style.backgroundColor = "red";
        setTimeout(() => document.body.style.backgroundColor = "", 200);

        document.getElementById("level-title").textContent = "Game Over! Press Start";

        updateHighScore();
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.getElementById("level-title").textContent = "Level " + level;

    let randomNumber = Math.floor(Math.random() * 4);
    let randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);

    let button = document.getElementById(randomColor);
    button.classList.add("pressed");
    setTimeout(() => button.classList.remove("pressed"), 200);
}

function animatePress(color) {
    let button = document.getElementById(color);
    button.classList.add("pressed");
    setTimeout(() => button.classList.remove("pressed"), 100);
}

function updateHighScore() {
    if (level - 1 > highScore) {
        highScore = level - 1;
        document.getElementById("high-score").textContent = "High Score: " + highScore;
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

