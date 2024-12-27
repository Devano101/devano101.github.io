const exitStates: string[] = [
    "What the fuck.",
    "I worked hard on this code.",
    "Nuh uh.",
    "Go play the stupid game.",
    "Dumbass."
];

let exitDialogueIndex: number = 0;

function handleExitDialogue(): void {
    const dialogueText: HTMLDivElement = document.getElementById('dialogueText') as HTMLDivElement;

    if (exitDialogueIndex < exitStates.length - 1) {
        exitDialogueIndex++;
        dialogueText.innerHTML = `<p>${exitStates[exitDialogueIndex]}</p>`;
    }

    else {
        resetToMainMenu();
    }
}

function resetToMainMenu(): void {

    // Select the elements and provide type annotations
    const background: HTMLImageElement | null = document.querySelector('.background');
    const character: HTMLImageElement | null = document.querySelector('.character img');
    const buttons: HTMLDivElement | null = document.querySelector('.buttons');
    const endScreen: HTMLDivElement = document.getElementById('endScreen') as HTMLDivElement;

    // Check if all elements exist before manipulating them
    if (!background || !character || !buttons || !endScreen) {
        console.error('One or more required elements were not found in the DOM.');
        return;
    }

    // Add transition to endScreen and make it fade out
    endScreen.style.transition = 'opacity 1s';
    endScreen.style.opacity = '0';

    // Use a timeout to make changes after the transition
    setTimeout((): void => {
        endScreen.style.display = 'none';
        background.style.display = 'block';
        character.style.display = 'block';
        buttons.style.display = 'flex';

        // Reset opacity values
        background.style.opacity = '1';
        character.style.opacity = '1';
        buttons.style.opacity = '1';

        // Reset the exit dialogue index
        exitDialogueIndex = 0;
    }, 1000);
}

document.addEventListener('click', function(): void {
    const endScreen: HTMLDivElement = document.getElementById('endScreen') as HTMLDivElement;

    if (!endScreen) {
        console.error('Unable to access end screen in the DOM.');
        return;
    }

    if (endScreen.style.display === 'flex') {
        handleExitDialogue();
    }
});