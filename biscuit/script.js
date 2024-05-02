// Define variables to track game state
let biscuits = 0; // Total number of biscuits
let biscuitsPerSecond = 0; // Biscuits earned per second
let clickValue = 1; // Biscuits earned per click
let upgradeCosts = [10, 100, 1000, 10000, 50000, 500000]; // Costs of upgrades
let upgradeLevels = [0, 0, 0, 0, 0, 0]; // Current levels of upgrades

// Get references to HTML elements
const counterDisplay = document.getElementById("counter"); // Display total biscuits
const bpsCounterDisplay = document.getElementById("bps-counter"); // Display biscuits per second
const bpcCounterDisplay = document.getElementById("bpc-counter"); // Display biscuits per click
const upgradeButtons = document.querySelectorAll(".upgrade-button"); // Get all upgrade buttons

// Function to update game state every second
function gameLoop() {
    biscuits += biscuitsPerSecond; // Increment biscuits based on biscuits per second
    updateCounters(); // Update counters display
    updateUpgradeButtons(); // Update upgrade buttons state
    setTimeout(gameLoop, 1000); // Call the game loop again after 1 second
}

// Function to update upgrade buttons state
function updateUpgradeButtons() {
    upgradeButtons.forEach((button, index) => {
        // Disable the button if player cannot afford the upgrade
        if (biscuits < upgradeCosts[index]) {
            button.disabled = true;
        } else {
            button.disabled = false;
        }
    });
}

// Function to update game counters
function updateCounters() {
    // Update total biscuits display
    counterDisplay.textContent = `Biscuits: ${Math.floor(biscuits)}`;
    // Update biscuits per second display
    bpsCounterDisplay.textContent = `Biscuits Per Second: ${biscuitsPerSecond.toFixed(3)}`;
    // Update biscuits per click display
    bpcCounterDisplay.textContent = `Biscuits Per Click: ${clickValue}`;
}

// Function to handle clicking on the biscuit
function clickBiscuit() {
    biscuits += clickValue; // Increment biscuits by click value
    updateCounters(); // Update counters display
}

// Function to handle purchasing an upgrade
function purchaseUpgrade(index) {
    // Check if player has enough biscuits to purchase the upgrade
    if (biscuits >= upgradeCosts[index]) {
        biscuits -= upgradeCosts[index]; // Deduct cost of upgrade from total biscuits
        upgradeCosts[index] *= 1.15; // Increase the cost of the upgrade for next purchase
        upgradeLevels[index]++; // Increment the level of the upgrade
        // Update biscuits per click if upgrade 1 is purchased
        if (index === 0) {
            clickValue = upgradeLevels[index] + 1; // Update click value
        }
        // Calculate biscuits per second based on upgrade level and upgrade type
        biscuitsPerSecond += calculateBiscuitsPerSecond(index);
        updateCounters(); // Update counters display
        updateUpgradeTables(); // Update upgrade tables
    }
}

// Function to calculate biscuits per second based on upgrade level and type
function calculateBiscuitsPerSecond(index) {
    switch (index) {
        case 1:
            return 0.2 * upgradeLevels[index]; // Upgrade 2: Increase by 0.002 per level
        case 2:
            return 0.5 * upgradeLevels[index]; // Upgrade 3: Increase by 0.05 per level
        case 3:
            return 2 * upgradeLevels[index]; // Upgrade 4: Increase by 0.2 per level
        case 4:
            return 6 * upgradeLevels[index]; // Upgrade 5: Increase by 6 per level
        case 5:
            return 12 * upgradeLevels[index]; // Upgrade 6: Increase by 50 per level
        default:
            return 0; // For other upgrades, return 0
    }
}

// Function to update upgrade tables
function updateUpgradeTables() {
    upgradeLevels.forEach((level, index) => {
        const table = document.querySelector(`#upgrade-container .upgrade-wrapper:nth-child(${index + 1}) .upgrade-table`);
        const ownedCell = table.querySelector("tbody tr td");
        ownedCell.textContent = level;
    });
}

// Event listeners for clicking on the biscuit and purchasing upgrades
document.getElementById("biscuit-clickable").addEventListener("click", clickBiscuit);
upgradeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        purchaseUpgrade(index);
    });
});

// Call updateUpgradeTables initially to populate the tables
updateUpgradeTables();

// Start the game loop
gameLoop();
