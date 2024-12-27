"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameContent_1 = require("./gameContent");
function startGame() {
    const buttons = document.querySelector('.buttons');
    const gameScreen = document.getElementById('gameScreen');
    if (!buttons || !gameScreen) {
        console.log('Some elements missing from the DOM.');
        return;
    }
    buttons.style.transition = 'opacity 1s';
    buttons.style.opacity = '0';
    setTimeout(() => {
        buttons.style.display = 'none';
        gameScreen.style.display = 'flex';
        gameScreen.style.opacity = '1';
        gameScreen.style.background = 'none';
        const dialogueText = document.getElementById('gameDialogueText');
        dialogueText.innerHTML = `<p>${gameContent_1.gameStates.start.text[0]}</p>`;
        (0, gameContent_1.setDialogueIndex)(0);
    }, 1000);
}
function exitGame() {
    const background = document.querySelector('.background');
    const character = document.querySelector('.character img');
    const buttons = document.querySelector('.buttons');
    const endScreen = document.getElementById('endScreen');
    const dialogueText = document.getElementById('dialogueText');
    const gameScreen = document.getElementById('gameScreen');
    if (!background || !character || !buttons || !endScreen || !dialogueText || !gameScreen) {
        console.error('One or more elements missing from the DOM.');
        return;
    }
    if (gameScreen.style.display === 'flex') {
        gameScreen.style.display = 'none';
    }
    background.style.opacity = '0';
    character.style.opacity = '0';
    buttons.style.opacity = '0';
    setTimeout(() => {
        background.style.display = 'none';
        character.style.display = 'none';
        buttons.style.display = 'none';
        endScreen.style.display = 'flex';
        endScreen.style.opacity = '0';
        (0, gameContent_1.setDialogueIndex)(0);
        const dialogueLines = dialogueText.children;
        Array.from(dialogueLines).forEach((p, index) => {
            p.style.display = index === 0 ? 'block' : 'none';
        });
    }, 1000);
}
function handleExitDialogue() {
    const dialogueText = document.querySelector('dialogueText');
    if (!dialogueText) {
        console.log('Missing dialogue.');
        return;
    }
    const dialogueContent = dialogueText.children;
    if ((0, gameContent_1.getDialogueIndex)() < dialogueContent.length - 1) {
        // Progress through dialogue
        let currentContent = dialogueContent[(0, gameContent_1.getDialogueIndex)()];
        currentContent.style.display = 'none';
        (0, gameContent_1.setDialogueIndex)((0, gameContent_1.getDialogueIndex)() + 1);
        currentContent = dialogueContent[(0, gameContent_1.getDialogueIndex)()];
        currentContent.style.display = 'block';
    }
    else {
        // Reset to main menu after all dialogue
        resetToMainMenu();
    }
}
function resetToMainMenu() {
    const gameScreen = document.getElementById('gameScreen');
    const buttons = document.querySelector('.buttons');
    const dialogueText = document.getElementById('gameDialogueText');
    if (!gameScreen || !buttons || !dialogueText) {
        console.error('One or more elements missing from the DOM.');
        return;
    }
    // Hide game screen
    gameScreen.style.transition = 'opacity 1s';
    gameScreen.style.opacity = '0';
    setTimeout(() => {
        gameScreen.style.display = 'none';
        // Reset buttons
        buttons.style.display = 'flex';
        buttons.style.opacity = '1';
        // Reset game state
        dialogueText.innerHTML = ''; // Clear dialogue text
        (0, gameContent_1.setCurrentState)('start');
        (0, gameContent_1.setDialogueIndex)(0);
    }, 1000);
}
const endScreen = document.getElementById('endScreen');
endScreen.addEventListener('click', function (event) {
    if (this.style.display === 'flex') {
        handleExitDialogue();
        event.stopPropagation();
    }
});
