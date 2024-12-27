export { gameStates, setDialogueIndex, getDialogueIndex, setCurrentState };

declare global {
    interface Window {
        exitGame: () => void;
    }
}

type GameState = {
    text: string[]; // Array of strings for the messages
    image: string;  // URL as a string for the image
};

type GameStateDict = {
    [key: string]: GameState;
};

const gameStates: GameStateDict = {
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

let dialogueIndex: number = 0;
let currentState: string = 'start';

// Update your click handler in gameContent.js
const gameScreen: HTMLDivElement = document.getElementById('gameScreen') as HTMLDivElement;

gameScreen.addEventListener('click', function(event: MouseEvent): void {

    if (this.style.display === 'flex') {
        handleGameDialogue();
    }

    event.stopPropagation();
});

function setDialogueIndex(index: number): void {
    dialogueIndex = index;
}

function getDialogueIndex(): number {
    return dialogueIndex;
}

function setCurrentState(state: string): void {
    currentState = state;
}

function showChoices():void {
    const eyeSymbols: HTMLDivElement = document.getElementById('gameEyeSymbols') as HTMLDivElement;
    const choiceButtons: HTMLDivElement = document.getElementById('choiceButtons') as HTMLDivElement;

    eyeSymbols.style.opacity = '0';
    setTimeout((): void => {
        eyeSymbols.style.display = 'none';
        choiceButtons.style.display = 'flex';
    }, 500);
}

function makeChoice(choice: string): void {
    const characterImg: HTMLImageElement | null = document.querySelector('.character img');
    const choiceButtons: HTMLDivElement | null = document.getElementById('choiceButtons') as HTMLDivElement;
    const eyeSymbols: HTMLDivElement | null = document.getElementById('gameEyeSymbols') as HTMLDivElement;
    const dialogueText: HTMLDivElement | null = document.getElementById('gameDialogueText') as HTMLDivElement;

    if (!characterImg || !choiceButtons || !eyeSymbols || !dialogueText) {
        console.error('Unable to access one or more elements in the DOM.');
        return;
    }

    choiceButtons.style.display = 'none';
    eyeSymbols.style.display = 'flex';
    eyeSymbols.style.opacity = '1';

    characterImg.src = gameStates[choice].image;
    currentState = choice;
    dialogueIndex = 0;

    dialogueText.innerHTML = `<p>${gameStates[choice].text[0]}</p>`;
}

function resetToMainMenu(): void {
    const gameScreen: HTMLDivElement | null = document.getElementById('gameScreen') as HTMLDivElement;
    const buttons: HTMLDivElement | null = document.querySelector('.buttons');

    if (!gameScreen || !buttons) {
        console.error('One or more elements missing from the DOM.');
        return;
    }

    gameScreen.style.display = 'none';
    buttons.style.display = 'flex';
    buttons.style.opacity = '1';

    dialogueIndex = 0;
    currentState = 'start';
}

function handleGameDialogue(): void {
    const state: GameState = gameStates[currentState];
    const dialogueText: HTMLDivElement | null = document.getElementById('gameDialogueText') as HTMLDivElement;

    if (!dialogueText) {
        console.error('No dialogue text found.');
        return;
    }

    if (dialogueIndex < state.text.length - 1) {
        dialogueIndex++;
        dialogueText.innerHTML = `<p>${state.text[dialogueIndex]}</p>`;

        if (state.text[dialogueIndex] === '[CHOICE]') {
            showChoices();
        }

    }

    else {
        resetToMainMenu();
    }
}

document.addEventListener('click', function(event: MouseEvent): void {
    const gameScreen: HTMLDivElement | null = document.getElementById('gameScreen') as HTMLDivElement;

    if (!gameScreen) {
        console.error('No game screen found.');
        return;
    }

    if (gameScreen.style.display === 'flex') {
        handleGameDialogue();
    }
});

function startGame(): void {
    const gameScreen: HTMLDivElement | null = document.getElementById('gameScreen') as HTMLDivElement;
    const buttons: HTMLDivElement | null = document.querySelector('.buttons');

    if (!buttons || !gameScreen) {
        console.error('One or more elements missing from the DOM.');
        return;
    }

    buttons.style.transition = 'opacity 1s';
    buttons.style.opacity = '0';

    setTimeout((): void => {
        buttons.style.display = 'none';
        gameScreen.style.display = 'flex';
        gameScreen.style.opacity = '1';

        currentState = 'start';
        dialogueIndex = 0;
        const dialogueText: HTMLDivElement = document.getElementById('gameDialogueText') as HTMLDivElement;
        dialogueText.innerHTML = `<p>${gameStates.start.text[0]}</p>`;
    }, 1000);
}

window.exitGame = function exitGame(): void {
    const background: HTMLImageElement | null = document.querySelector('.background');
    const character: HTMLImageElement | null = document.querySelector('.character img');
    const buttons: HTMLDivElement | null = document.querySelector('.buttons');
    const endScreen: HTMLDivElement | null = document.getElementById('endScreen') as HTMLDivElement;
    const gameScreen: HTMLDivElement | null = document.getElementById('gameScreen') as HTMLDivElement;
    const dialogueText: HTMLDivElement | null = document.getElementById('dialogueText') as HTMLDivElement;

    if (!background || !character || !buttons || !endScreen || !gameScreen || !dialogueText) {
        console.error('One or more elements missing from the DOM.');
        return;
    }

    gameScreen.style.display = 'none';
    background.style.opacity = '0';
    character.style.opacity = '0';
    buttons.style.opacity = '0';

    setTimeout(() => {
        background.style.display = 'none';
        character.style.display = 'none';
        buttons.style.display = 'none';
        endScreen.style.display = 'flex';
        endScreen.style.opacity = '1';

        dialogueIndex = 0;
        const childElement: HTMLDivElement = dialogueText.children[0] as HTMLDivElement;
        childElement.style.display = 'block';
        Array.from(dialogueText.children).slice(1).forEach((p: Element): void => {
            (p as HTMLParagraphElement).style.display = 'none';
        });
    }, 1000);
}