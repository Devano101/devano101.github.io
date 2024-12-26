function startGame() {
    const buttons = document.querySelector('.buttons');
    const gameScreen = document.getElementById('gameScreen');
    
    buttons.style.transition = 'opacity 1s';
    buttons.style.opacity = 0;
    
    setTimeout(() => {
        buttons.style.display = 'none';
        gameScreen.style.display = 'flex';
        gameScreen.style.opacity = 1;
        gameScreen.style.background = 'none';
        
        const dialogueText = document.getElementById('gameDialogueText');
        dialogueText.innerHTML = `<p>${gameStates.start.text[0]}</p>`;
        dialogueIndex = 0;
    }, 1000);
}

function exitGame() {
    const background = document.querySelector('.background');
    const character = document.querySelector('.character img');
    const buttons = document.querySelector('.buttons');
    const endScreen = document.getElementById('endScreen');
    const dialogueText = document.getElementById('dialogueText');
    const gameScreen = document.getElementById('gameScreen');

    if (gameScreen.style.display === 'flex') {
        gameScreen.style.display = 'none';
    }
    
    background.style.opacity = 0;
    character.style.opacity = 0;
    buttons.style.opacity = 0;
    
    setTimeout(() => {
        background.style.display = 'none';
        character.style.display = 'none';
        buttons.style.display = 'none';
        endScreen.style.display = 'flex';
        endScreen.style.opacity = 1;
        dialogueIndex = 0;
        const dialogueLines = dialogueText.children;
        Array.from(dialogueLines).forEach((p, index) => {
            p.style.display = index === 0 ? 'block' : 'none';
        });
    }, 1000);
}

function handleExitDialogue() {
    const dialogueText = document.getElementById('dialogueText').children;

    if (dialogueIndex < dialogueText.length - 1) {
        // Progress through dialogue
        dialogueText[dialogueIndex].style.display = 'none';
        dialogueIndex++;
        dialogueText[dialogueIndex].style.display = 'block';
    } else {
        // Reset to main menu after all dialogue
        resetToMainMenu();
    }
}


function resetToMainMenu() {
    const gameScreen = document.getElementById('gameScreen');
    const buttons = document.querySelector('.buttons');
    const dialogueText = document.getElementById('gameDialogueText');

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
        currentState = 'start';
        dialogueIndex = 0;
    }, 1000);
}


document.getElementById('endScreen').addEventListener('click', function(event) {
    if (this.style.display === 'flex') {
        handleExitDialogue();
        event.stopPropagation();
    }
});