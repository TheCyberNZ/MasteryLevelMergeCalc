let totalPositions;
let mergesNeeded;
let targetMasteryLevel;
let reduction;

document.getElementById("totalPosition").addEventListener("input", function() {
    totalPositions = parseFloat(document.getElementById("totalPosition").value) || 0;
  //  document.getElementById("myTotalPositions").textContent = `Current Total Positions:  ${totalPositions.toLocaleString()}`;
    updateCalculations();
});

document.getElementById("masteryLevel").addEventListener("input", function() {
    targetMasteryLevel = parseFloat(document.getElementById("masteryLevel").value) || 0;
 //   document.getElementById("myMasteryLevel").textContent = `Target Mastery level:  ${targetMasteryLevel.toLocaleString()}`;
    updateCalculations();
});


function updateCalculations() {
    if (totalPositions >= 0 && targetMasteryLevel >= 0) {
        reduction = (8387769 / 8388608) ** totalPositions;
        if (targetMasteryLevel === 0) {
            mergesNeeded = 0;
        } 
        else if (targetMasteryLevel === 1) {
            mergesNeeded = 250;
        } 
        else if (targetMasteryLevel === 2) {
            mergesNeeded = 1000;
        }
         else if (targetMasteryLevel === 3) {
            mergesNeeded = 3000;
        } 
        else if (targetMasteryLevel === 4) {
            mergesNeeded = 6000;
        } 
        else if (targetMasteryLevel === 5) {
            mergesNeeded = 10000;
        } 
        else if (targetMasteryLevel === 6) {
            mergesNeeded = 15000;
        } 
        else if (targetMasteryLevel === 7) {
            mergesNeeded = 22000;
        }
         else if (targetMasteryLevel === 8) {
            mergesNeeded = 30000;
        }
         else if (targetMasteryLevel === 9) {
            mergesNeeded = 40000;
        }
         else if (targetMasteryLevel === 10) {
            mergesNeeded = 50000;
        } 
        else if (targetMasteryLevel === 11) {
            mergesNeeded = 64000;
        } 
        else if (targetMasteryLevel === 12) {
            mergesNeeded = 75000;
        } 
        else if (targetMasteryLevel === 13) {
            mergesNeeded = 92000;
        } 
        else if (targetMasteryLevel === 14) {
            mergesNeeded = 110000;
        } 
        else if (targetMasteryLevel === 15) {
            mergesNeeded = 130000;
        } 
        else if (targetMasteryLevel === 16) {
            mergesNeeded = 155000;
        } 
        else if (targetMasteryLevel === 17) {
            mergesNeeded = 180000;
        } 
        else if (targetMasteryLevel === 18) {
            mergesNeeded = 210000;
        } 
        else if (targetMasteryLevel === 19) {
            mergesNeeded = 250000;
        } 
        else if (targetMasteryLevel === 20) {
            mergesNeeded = 300000;} 
        else  {
            mergesNeeded = 2500 * Math.pow((targetMasteryLevel - 10), 2) + 2500 * targetMasteryLevel;
        }

        document.getElementById("label1").textContent = `Merges needed = ${Math.floor(mergesNeeded * reduction).toLocaleString()}`;
        document.getElementById("label2").textContent = `Mastery Level = ${targetMasteryLevel}`;
        document.getElementById("label3").textContent = `Reduction =  ${reduction}`;
    }
}
