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

// Detect clicks
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

        // Ask for name + save score
        let playerName = prompt("Game Over! Enter your name:");
        if (playerName) {
            saveScore(playerName, level - 1);
        }

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

/* ---------------------------
   LEADERBOARD FUNCTIONS
---------------------------- */

function saveScore(name, score) {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    leaderboard.push({ name: name, score: score });

    leaderboard.sort((a, b) => b.score - a.score);

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    displayLeaderboard();
}

function displayLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    let list = document.getElementById("leaderboard");

    list.innerHTML = "";

    leaderboard.forEach(entry => {
        let li = document.createElement("li");
        li.textContent = `${entry.name}: ${entry.score}`;
        list.appendChild(li);
    });
}

// Load leaderboard on page start
displayLeaderboard();
