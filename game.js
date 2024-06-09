let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").html("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(function() {
            $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
            playSound(gamePattern[i]);
        }, i * 500);
    }
}

function playSound(name) {
    let audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    let currentButton = "." + currentColor;
    $(currentButton).addClass("pressed");
    setTimeout(function() {
        $(currentButton).removeClass("pressed");
    }, 50);
}

function checkAnswer(idx) {
    if (userClickedPattern[idx] === gamePattern[idx]) {
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").html("Game Over, Press Any Key To Restart");
        startOver();
    }
}

function startOver() {
    gameStarted = false;
    level = 0;
    gamePattern = [];
}

$(".btn").on("click", function() {
    let colorId = $(this).attr("id");
    playSound(colorId);
    animatePress(colorId);
    userClickedPattern.push(colorId);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keydown", function() {
    if (!gameStarted) {
        gameStarted = true;
        $("h1").html("Level 0");
        nextSequence();
    }
});