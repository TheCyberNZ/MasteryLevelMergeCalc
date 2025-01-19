let totalPositions;

document.getElementById("totalPositionSubmit").onclick = function(){
totalPositions = document.getElementById("totalPosition").value;
document.getElementById("myTotalPositions").textContent = `Current Total Positions:  ${totalPositions}`
}
let targetMasteryLevel;

document.getElementById("masteryLevelSubmit").onclick = function(){
targetMasteryLevel = document.getElementById("masteryLevel").value;
document.getElementById("myMasteryLevel").textContent = `Target Mastery level:  ${targetMasteryLevel}`
}
