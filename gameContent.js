const gameStates = {
    start: {
        text: ["Welcome, mortal.", "Shall we make a deal?", "[CHOICE]"],
        image: "https://cdn.imgchest.com/files/yrgcnx2z894.png"
    },
    accept: {
        text: ["Excellent choice...", "You won't regret this.", "Maybe."],
        image: "https://cdn.imgchest.com/files/yd5ce56rkr4.png"
    },
    reject: {
        text: ["How disappointing...", "Very well then.", "Your loss."],
        image: "https://cdn.imgchest.com/files/yd5ce56rkr4.png"
    }
};

let dialogueIndex = 0;
let currentState = 'start';

// Update your click handler in gameContent.js
document.getElementById('gameScreen').addEventListener('click', function(event) {
    if (this.style.display === 'flex') {
        handleGameDialogue();
    }
    event.stopPropagation();
});

function showChoices() {
    const eyeSymbols = document.getElementById('gameEyeSymbols');
    const choiceButtons = document.getElementById('choiceButtons');
    
    eyeSymbols.style.opacity = 0;
    setTimeout(() => {
        eyeSymbols.style.display = 'none';
        choiceButtons.style.display = 'flex';
    }, 500);
}

function makeChoice(choice) {
    const characterImg = document.querySelector('.character img');
    const choiceButtons = document.getElementById('choiceButtons');
    const eyeSymbols = document.getElementById('gameEyeSymbols');
    const dialogueText = document.getElementById('gameDialogueText');
    
    choiceButtons.style.display = 'none';
    eyeSymbols.style.display = 'flex';
    eyeSymbols.style.opacity = 1;
    
    characterImg.src = gameStates[choice].image;
    currentState = choice;
    dialogueIndex = 0;
    
    dialogueText.innerHTML = `<p>${gameStates[choice].text[0]}</p>`;
}

function resetToMainMenu() {
    const gameScreen = document.getElementById('gameScreen');
    const buttons = document.querySelector('.buttons');
    
    gameScreen.style.display = 'none';
    buttons.style.display = 'flex';
    buttons.style.opacity = '1';
    
    dialogueIndex = 0;
    currentState = 'start';
}

function handleGameDialogue() {
    const state = gameStates[currentState];
    const dialogueText = document.getElementById('gameDialogueText');
    
    if (dialogueIndex < state.text.length - 1) {
        dialogueIndex++;
        dialogueText.innerHTML = `<p>${state.text[dialogueIndex]}</p>`;
        
        if (state.text[dialogueIndex] === '[CHOICE]') {
            showChoices();
        }
    } else {
        resetToMainMenu();
    }
}

document.addEventListener('click', function(event) {
    const gameScreen = document.getElementById('gameScreen');
    if (gameScreen.style.display === 'flex') {
        handleGameDialogue();
    }
});

function startGame() {
    const buttons = document.querySelector('.buttons');
    const gameScreen = document.getElementById('gameScreen');
    
    buttons.style.transition = 'opacity 1s';
    buttons.style.opacity = '0';
    
    setTimeout(() => {
        buttons.style.display = 'none';
        gameScreen.style.display = 'flex';
        gameScreen.style.opacity = '1';
        
        currentState = 'start';
        dialogueIndex = 0;
        const dialogueText = document.getElementById('gameDialogueText');
        dialogueText.innerHTML = `<p>${gameStates.start.text[0]}</p>`;
    }, 1000);
}

window.exitGame = function() {
    const background = document.querySelector('.background');
    const character = document.querySelector('.character img');
    const buttons = document.querySelector('.buttons');
    const endScreen = document.getElementById('endScreen');
    const gameScreen = document.getElementById('gameScreen');
    const dialogueText = document.getElementById('dialogueText');

    gameScreen.style.display = 'none';
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
        dialogueText.children[0].style.display = 'block';
        Array.from(dialogueText.children).slice(1).forEach(p => p.style.display = 'none');
    }, 1000);
}