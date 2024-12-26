const exitStates = {
    start: {
        text: [
            "What the fuck.",
            "I worked hard on this code.",
            "Nuh uh.",
            "Go play the stupid game.",
            "Dumbass."
        ]
    }
};

let exitDialogueIndex = 0;
let currentExitState = 'start';

function handleExitDialogue() {
    const state = exitStates[currentExitState];
    const dialogueText = document.getElementById('dialogueText');
    
    if (exitDialogueIndex < state.text.length - 1) {
        exitDialogueIndex++;
        dialogueText.innerHTML = `<p>${state.text[exitDialogueIndex]}</p>`;
    } else {
        resetToMainMenu();
    }
}

function resetToMainMenu() {
    const background = document.querySelector('.background');
    const character = document.querySelector('.character img');
    const buttons = document.querySelector('.buttons');
    const endScreen = document.getElementById('endScreen');
    
    endScreen.style.transition = 'opacity 1s';
    endScreen.style.opacity = 0;
    
    setTimeout(() => {
        endScreen.style.display = 'none';
        background.style.display = 'block';
        character.style.display = 'block';
        buttons.style.display = 'flex';
        background.style.opacity = 1;
        character.style.opacity = 1;
        buttons.style.opacity = 1;
        exitDialogueIndex = 0;
    }, 1000);
}

document.addEventListener('click', function(event) {
    const endScreen = document.getElementById('endScreen');
    if (endScreen.style.display === 'flex') {
        handleExitDialogue();
    }
});