let CurrentQuestLevel, CurrentMagnetLevel, CurrentGoldenScrapLevel, CurrentStarFragmentLevel,
    CurrentXpLevel, CurrentWrenchLevel, CurrentScrapLevel;
let totalPositions = 0;
let targetMasteryLevel = 0;
let mergesNeeded = 0;
let reduction = 1;

let memoryEnabled = false;

function toggleMemory() {
    memoryEnabled = !memoryEnabled;
    document.getElementById("memoryStatus").textContent = memoryEnabled ? "ON" : "OFF";
    localStorage.setItem("memoryEnabled", memoryEnabled);

    if (memoryEnabled) {
        saveMemory();
        loadMemory();
    } else {
        localStorage.clear();
    }
}

function saveMemory() {
    if (!memoryEnabled) return;
    const inputs = document.querySelectorAll("input[type='number']");
    inputs.forEach(input => {
        localStorage.setItem(input.id, input.value);
    });
}

function loadMemory() {
    const inputs = document.querySelectorAll("input[type='number']");
    inputs.forEach(input => {
        const val = localStorage.getItem(input.id);
        if (val !== null) {
            input.value = val;
        }
    });

    totalPositions = parseFloat(document.getElementById("totalPosition").value) || 0;
    targetMasteryLevel = parseFloat(document.getElementById("masteryLevel").value) || 0;

    CurrentQuestLevel = parseFloat(document.getElementById("CurrentQuestLevel").value) || 0;
    CurrentMagnetLevel = parseFloat(document.getElementById("CurrentMagnetLevel").value) || 0;
    CurrentGoldenScrapLevel = parseFloat(document.getElementById("CurrentGoldenScrapLevel").value) || 0;
    CurrentStarFragmentLevel = parseFloat(document.getElementById("CurrentStarFragmentLevel").value) || 0;
    CurrentXpLevel = parseFloat(document.getElementById("CurrentXpLevel").value) || 0;
    CurrentWrenchLevel = parseFloat(document.getElementById("CurrentWrenchLevel").value) || 0;
    CurrentScrapLevel = parseFloat(document.getElementById("CurrentScrapLevel").value) || 0;

    updateMasteryCalculations();
    updateCalculations();

}

function showOnlyBody(bodyIdToShow) {
    const allBodies = ["body1", "body2", "body3", "body4", "body5"];
    allBodies.forEach(id => {
        const el = document.getElementById(id);
        if (id === bodyIdToShow) {
            el.classList.add("visible");
            el.classList.remove("hidden");
        } else {
            el.classList.remove("visible");
            el.classList.add("hidden");
        }
    });
}

function switchBodyMastery() {
    showOnlyBody("body2");
}

function switchBodyXp() {
    showOnlyBody("body1");
}

function switchBodyRR() {
    showOnlyBody("body3");
}

function switchBodyCredits() {
    showOnlyBody("body4");
}

function switchBodyHowTo() {
    showOnlyBody("body5");
}

window.addEventListener("DOMContentLoaded", () => {
    // Load saved inputs if enabled
    memoryEnabled = localStorage.getItem("memoryEnabled") === "true";
    document.getElementById("memoryStatus").textContent = memoryEnabled ? "ON" : "OFF";
    if (memoryEnabled) loadMemory();

    // Mastery Calculator input listeners
    ["totalPosition", "masteryLevel"].forEach(id => {
        const el = document.getElementById(id);
        el.addEventListener("input", () => {
            totalPositions = parseFloat(document.getElementById("totalPosition").value) || 0;
            targetMasteryLevel = parseFloat(document.getElementById("masteryLevel").value) || 0;
            updateMasteryCalculations();
            saveMemory();
        });
    });

    // XP Calculator logic
    XpCalculations();

    // Resource Research Calculator input listeners
    [
        "RRGs", "RTR", "RRCostReduction", "RRBrick",
        "RRMagnet", "RRBeam", "RRMoreReinforced",
        "RRFrag", "RRReinforcedValue"
    ].forEach(id => {
        const el = document.getElementById(id);
        el.addEventListener("input", () => {
            RRCalculations();
            saveMemory();
        });
    });

    // Save memory on any other input
    document.querySelectorAll("input[type='number']").forEach(input => {
        input.addEventListener("input", () => {
            saveMemory();
        });
    });

    // Run RR calculation once on page load
    RRCalculations();
});

function updateMasteryCalculations() {
    if (totalPositions >= 0 && targetMasteryLevel >= 0) {
        reduction = (8387769 / 8388608) ** totalPositions;
        const costs = [
            0, 250, 1000, 3000, 6000, 10000, 15000, 22000, 30000, 40000, 50000,
            64000, 75000, 92000, 110000, 130000, 155000, 180000, 210000, 250000, 300000
        ];

        if (targetMasteryLevel <= 20) {
            mergesNeeded = costs[targetMasteryLevel];
        } else {
            mergesNeeded = 2500 * (targetMasteryLevel - 10) ** 2 + 2500 * targetMasteryLevel;
        }

        document.getElementById("label1").textContent = `Merges needed = ${Math.floor(mergesNeeded * reduction).toLocaleString()}`;
        document.getElementById("label3").textContent = `Reduction = ${reduction}`;
        document.getElementById("myOverlay").textContent = targetMasteryLevel;
    }
}

function XpCalculations() {
    const inputIds = [
        "CurrentQuestLevel",
        "CurrentMagnetLevel",
        "CurrentGoldenScrapLevel",
        "CurrentStarFragmentLevel",
        "CurrentXpLevel",
        "CurrentWrenchLevel",
        "CurrentScrapLevel"
    ];

    function updateAllVariables() {
        CurrentQuestLevel = parseFloat(document.getElementById("CurrentQuestLevel").value) || 0;
        CurrentMagnetLevel = parseFloat(document.getElementById("CurrentMagnetLevel").value) || 0;
        CurrentGoldenScrapLevel = parseFloat(document.getElementById("CurrentGoldenScrapLevel").value) || 0;
        CurrentStarFragmentLevel = parseFloat(document.getElementById("CurrentStarFragmentLevel").value) || 0;
        CurrentXpLevel = parseFloat(document.getElementById("CurrentXpLevel").value) || 0;
        CurrentWrenchLevel = parseFloat(document.getElementById("CurrentWrenchLevel").value) || 0;
        CurrentScrapLevel = parseFloat(document.getElementById("CurrentScrapLevel").value) || 0;
    }

    inputIds.forEach(id => {
        document.getElementById(id).addEventListener("input", () => {
            updateAllVariables();
            updateCalculations();
            saveMemory();
        });
    });

    updateAllVariables();
    updateCalculations();
}

function updateCalculations() {
    const levelCost = level => level + level + 2;

    const sumCost = level => {
        let total = 0;
        for (let i = 0; i <= level; i++) total += i + i + 2;
        return total;
    };

    let CurrentMagnetCost = levelCost(CurrentMagnetLevel);
    let CurrentGoldenScrapCost = levelCost(CurrentGoldenScrapLevel);
    let CurrentStarFragmentCost = levelCost(CurrentStarFragmentLevel);
    let CurrentXpCost = levelCost(CurrentXpLevel);
    let CurrentWrenchCost = levelCost(CurrentWrenchLevel);
    let CurrentScrapCost = levelCost(CurrentScrapLevel);

    let CurrentTotalMagnet = sumCost(CurrentMagnetLevel);
    let CurrentTotalGoldenScrap = sumCost(CurrentGoldenScrapLevel);
    let CurrentTotalStarFragment = sumCost(CurrentStarFragmentLevel);
    let CurrentTotalXp = sumCost(CurrentXpLevel);
    let CurrentTotalWrench = sumCost(CurrentWrenchLevel);
    let CurrentTotalScrap = sumCost(CurrentScrapLevel);

    let CurrentTotalBooksEarnt = 0;
    for (let j = 0; j <= CurrentQuestLevel; j++) {
        CurrentTotalBooksEarnt += j;
    }

    let CurrentTotalBooksSpent =
        (CurrentTotalGoldenScrap - CurrentGoldenScrapCost) +
        (CurrentTotalMagnet - CurrentMagnetCost) +
        (CurrentTotalStarFragment - CurrentStarFragmentCost) +
        (CurrentTotalXp - CurrentXpCost) +
        (CurrentTotalWrench - CurrentWrenchCost) +
        (CurrentTotalScrap - CurrentScrapCost);

    document.getElementById("output16").textContent = `Extra Books: ${Math.floor(CurrentTotalBooksEarnt - CurrentTotalBooksSpent).toLocaleString()}`;
}

function RRCalculations() {
    const RRGs = parseFloat(document.getElementById("RRGs").value) || 0;
    const RTR = parseFloat(document.getElementById("RTR").value) || 0;
    const RRCostReduction = parseFloat(document.getElementById("RRCostReduction").value) || 0;
    const RRBrick = parseFloat(document.getElementById("RRBrick").value) || 0;
    const RRMagnet = parseFloat(document.getElementById("RRMagnet").value) || 0;
    const RRBeam = parseFloat(document.getElementById("RRBeam").value) || 0;
    const RRMoreReinforced = parseFloat(document.getElementById("RRMoreReinforced").value) || 0;
    const RRFrag = parseFloat(document.getElementById("RRFrag").value) || 0;
    const RRReinforcedValue = parseFloat(document.getElementById("RRReinforcedValue").value) || 0;



    // Add more RR calculation logic here as needed...








    //just for testing to display
    document.getElementById("output17").textContent = `RRGs: ${Math.floor(RRGs).toLocaleString()}`;
    document.getElementById("output18").textContent = `RTR: ${Math.floor(RTR).toLocaleString()}`;
    document.getElementById("output19").textContent = `RRCostReduction: ${Math.floor(RRCostReduction).toLocaleString()}`;
    document.getElementById("output20").textContent = `RRBrick: ${Math.floor(RRBrick).toLocaleString()}`;
    document.getElementById("output21").textContent = `RRMagnet: ${Math.floor(RRMagnet).toLocaleString()}`;
    document.getElementById("output22").textContent = `RRBeam: ${Math.floor(RRBeam).toLocaleString()}`;
    document.getElementById("output23").textContent = `RRMoreReinforced: ${Math.floor(RRMoreReinforced).toLocaleString()} `;
    document.getElementById("output24").textContent = `RRFrag: ${Math.floor(RRFrag).toLocaleString()}`;
    document.getElementById("output25").textContent = `RRReinforcedValue: ${Math.floor(RRReinforcedValue).toLocaleString()}`;
    document.getElementById("output26").textContent = `Total Upgrades: ${Math.floor(RRReinforcedValue + RRGs + RTR + RRCostReduction + RRBrick + RRMagnet + RRBeam + RRMoreReinforced + RRFrag).toLocaleString()}`;

}
