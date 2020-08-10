
var gamePattern=[];
 var userClickedPattern = [];
var buttonColors=["red","blue","green","yellow"];
var level=0;
var started=false;
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  var selectedButton="#"+randomChosenColor;
  $(selectedButton).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

$(".btn").click(function(event){
  var userChosenColor=event.toElement.id;
  userClickedPattern.push(userChosenColor);``
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentlvl){
  if(userClickedPattern[currentlvl]===gamePattern[currentlvl]){
    if(userClickedPattern.length===gamePattern.length){
    setTimeout(function () {
      nextSequence();
    }, 1000);}
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function playSound(name){
  var source="sounds/"+name+".mp3";
  var audio=new Audio(source);
  audio.play();
}
function animatePress(currentColor){
  var cc="."+currentColor;
  $(cc).addClass("pressed");
  setTimeout(function(){
    $(cc).removeClass("pressed");
  },100);
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
