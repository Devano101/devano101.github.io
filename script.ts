import { gameStates, setDialogueIndex, getDialogueIndex, setCurrentState } from './gameContent';

function startGame(): void {
    const buttons: HTMLDivElement | null = document.querySelector('.buttons');
    const gameScreen: HTMLDivElement | null = document.getElementById('gameScreen') as HTMLDivElement;

    if (!buttons || !gameScreen) {
        console.log('Some elements missing from the DOM.');
        return;
    }

    buttons.style.transition = 'opacity 1s';
    buttons.style.opacity = '0';

    setTimeout((): void => {
        buttons.style.display = 'none';
        gameScreen.style.display = 'flex';
        gameScreen.style.opacity = '1';
        gameScreen.style.background = 'none';

        const dialogueText: HTMLDivElement = document.getElementById('gameDialogueText') as HTMLDivElement;
        dialogueText.innerHTML = `<p>${gameStates.start.text[0]}</p>`;
        setDialogueIndex(0);
    }, 1000);
}

function exitGame(): void {
    const background: HTMLDivElement | null = document.querySelector('.background');
    const character: HTMLDivElement | null = document.querySelector('.character img');
    const buttons: HTMLDivElement | null = document.querySelector('.buttons');
    const endScreen: HTMLDivElement | null = document.getElementById('endScreen') as HTMLDivElement;
    const dialogueText: HTMLDivElement | null = document.getElementById('dialogueText') as HTMLDivElement;
    const gameScreen: HTMLDivElement | null = document.getElementById('gameScreen') as HTMLDivElement;

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
        setDialogueIndex(0);

        const dialogueLines: HTMLCollection = dialogueText.children;
        Array.from(dialogueLines).forEach((p: Element, index: number): void => {
            (p as HTMLParagraphElement).style.display = index === 0 ? 'block' : 'none';
        });
    }, 1000);
}

function handleExitDialogue(): void {
    const dialogueText: HTMLDivElement | null = document.querySelector('dialogueText') as HTMLDivElement;

    if (!dialogueText) {
        console.log('Missing dialogue.');
        return;
    }

    const dialogueContent: HTMLCollection = dialogueText.children;

    if (getDialogueIndex() < dialogueContent.length - 1) {
        // Progress through dialogue
        let currentContent: HTMLParagraphElement = dialogueContent[getDialogueIndex()] as HTMLParagraphElement;
        currentContent.style.display = 'none';
        setDialogueIndex(getDialogueIndex() + 1);
        currentContent = dialogueContent[getDialogueIndex()] as HTMLParagraphElement;
        currentContent.style.display = 'block';
    }

    else {
        // Reset to main menu after all dialogue
        resetToMainMenu();
    }
}


function resetToMainMenu(): void {
    const gameScreen: HTMLDivElement | null = document.getElementById('gameScreen') as HTMLDivElement;
    const buttons: HTMLDivElement | null = document.querySelector('.buttons');
    const dialogueText: HTMLDivElement | null = document.getElementById('gameDialogueText') as HTMLDivElement;

    if (!gameScreen || !buttons || !dialogueText) {
        console.error('One or more elements missing from the DOM.');
        return;
    }

    // Hide game screen
    gameScreen.style.transition = 'opacity 1s';
    gameScreen.style.opacity = '0';

    setTimeout((): void => {
        gameScreen.style.display = 'none';

        // Reset buttons
        buttons.style.display = 'flex';
        buttons.style.opacity = '1';

        // Reset game state
        dialogueText.innerHTML = ''; // Clear dialogue text
        setCurrentState('start');
        setDialogueIndex(0);
    }, 1000);
}

const endScreen: HTMLDivElement = document.getElementById('endScreen') as HTMLDivElement;

endScreen.addEventListener('click', function(event: MouseEvent): void {
    if (this.style.display === 'flex') {
        handleExitDialogue();
        event.stopPropagation();
    }
});