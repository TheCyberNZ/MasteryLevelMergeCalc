 let memoryEnabled = false;

        function toggleMemory() {
            memoryEnabled = !memoryEnabled;
            document.getElementById("memoryStatus").textContent = memoryEnabled ? "ON" : "OFF";
            localStorage.setItem("memoryEnabled", memoryEnabled);
            if (memoryEnabled) loadMemory();
            else localStorage.clear();
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
                    input.dispatchEvent(new Event('input'));
                }
            });
        }

        function switchBody() {
            const body1 = document.getElementById("body1");
            const body2 = document.getElementById("body2");
            const isBody1Visible = body1.classList.contains("visible");

            body1.classList.toggle("visible", !isBody1Visible);
            body1.classList.toggle("hidden", isBody1Visible);
            body2.classList.toggle("visible", isBody1Visible);
            body2.classList.toggle("hidden", !isBody1Visible);
        }

        let CurrentQuestLevel, CurrentMagnetLevel, CurrentGoldenScrapLevel, CurrentStarFragmentLevel,
            CurrentXpLevel, CurrentWrenchLevel, CurrentScrapLevel;
        let totalPositions = 0;
        let targetMasteryLevel = 0;
        let mergesNeeded = 0;
        let reduction = 1;

        window.addEventListener("DOMContentLoaded", () => {
            document.getElementById("totalPosition").addEventListener("input", () => {
                totalPositions = parseFloat(document.getElementById("totalPosition").value) || 0;
                updateMasteryCalculations();
                saveMemory();
            });

            document.getElementById("masteryLevel").addEventListener("input", () => {
                targetMasteryLevel = parseFloat(document.getElementById("masteryLevel").value) || 0;
                updateMasteryCalculations();
                saveMemory();
            });

            if (localStorage.getItem("memoryEnabled") === "true") {
                memoryEnabled = true;
                document.getElementById("memoryStatus").textContent = "ON";
                loadMemory();
            }

            XpCalculations();
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
            const addListener = (id, handler) => {
                document.getElementById(id).addEventListener("input", function () {
                    window[id] = parseFloat(this.value) || 0;
                    updateCalculations();
                    saveMemory();
                });
            };

            [
                "CurrentQuestLevel",
                "CurrentMagnetLevel",
                "CurrentGoldenScrapLevel",
                "CurrentStarFragmentLevel",
                "CurrentXpLevel",
                "CurrentWrenchLevel",
                "CurrentScrapLevel"
            ].forEach(addListener);
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