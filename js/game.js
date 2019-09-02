const numDivs = 36;
const maxHits = 10;

let hits = 0;
let misses = 0;
let prevScores = 0;
let firstHitTime = 0;
let divSelector = 0;
let divMiss = 0;

function removeTarget() {
  if((divSelector) && ($(divSelector).hasClass("target")))
  {
    $(divSelector).removeClass("target");
    $(divSelector).text("");
  }
}

function removeMiss() {
  if((divMiss) && ($(divMiss).hasClass("miss")))
      $(divMiss).removeClass("miss");
}

function initValues() {
  hits = 0;
  misses = 0;
  divMiss = 0;
  divSelector = 0;
}

function startNewGame() {
  initValues();
  $("#button-newgame").addClass("d-none");
  if(!$("#win-message").hasClass("d-none"))
    $("#win-message").addClass("d-none");
  $("#game-box").removeClass("d-none");
  round();
}

function reloadGame() {
  removeTarget();
  removeMiss();
  initValues();
  round();
}

function round() {
  removeTarget();
  divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits + 1);
  if (hits === maxHits)
    endGame();
}

function endGame() {
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#game-box").addClass("d-none");
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-misses").text(misses);
  let scores = Math.round((10000000/totalPlayedMillis)-(misses*10));
  if(scores < 0)
    scores = 0;
  $("#total-scores").text(scores);
  $("#prev-scores").text(prevScores);
  $("#win-message").removeClass("d-none");
  $("#button-newgame").removeClass("d-none");
  removeTarget();
  if(scores > prevScores)
  	prevScores = scores;
}

function handleClick(event) {
  if((!hits) && (!misses))
    firstHitTime = getTimestamp();
  removeMiss();
  if ($(event.target).hasClass("target"))
  {
    hits++;
  }
  else
  {
    $(event.target).addClass("miss");
    divMiss = "#" + event.target.id;
    misses++;
  }
  round();
}

function init() {
  $(".game-field").click(handleClick);
  $("#button-newgame").click(startNewGame);
  $("#button-reload").click(reloadGame);
}

$(document).ready(init);