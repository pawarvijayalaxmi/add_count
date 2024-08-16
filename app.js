document.addEventListener('DOMContentLoaded', function () {
    const subtractButton = document.getElementById('subtractButton');
    const addButton = document.getElementById('addButton');
    const numberDisplay = document.getElementById('numberDisplay');
    const progressBar = document.getElementById('progressBar');
    const undoButton = document.getElementById('undoButton');
    const redoButton = document.getElementById('redoButton');

    let currentValue = 0;
    let history = [];
    let redoStack = [];

    function updateDisplay() {
        numberDisplay.textContent = currentValue;
        const progressPercentage = (currentValue / 150) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }

    function addToHistory() {
        history.push(currentValue);
        if (history.length > 20) {
            history.shift(); // Limit the history to the last 20 actions
        }
        redoStack = []; // Clear redo stack when a new action is taken
    }

    subtractButton.addEventListener('click', function () {
        if (currentValue > 0) {
            addToHistory();
            currentValue--;
            updateDisplay();
        }
    });

    addButton.addEventListener('click', function () {
        if (currentValue < 150) {
            addToHistory();
            currentValue++;
            updateDisplay();
        }
    });

    undoButton.addEventListener('click', function () {
        if (history.length > 0) {
            redoStack.push(currentValue);
            currentValue = history.pop();
            updateDisplay();
        }
    });

    redoButton.addEventListener('click', function () {
        if (redoStack.length > 0) {
            history.push(currentValue);
            currentValue = redoStack.pop();
            updateDisplay();
        }
    });

    // Initial display update
    updateDisplay();
});
