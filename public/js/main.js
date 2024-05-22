const correctCodes = {
    1: 'RITEH1', // Correct code for Sticker 1
    2: 'LABOSI',  // Correct code for Sticker 2
    3: '5ENDviC-5a-KulEn0M'
    // Add more stickers with their correct codes if needed
};

function submitCode(button) {
    const stickerId = button.getAttribute('data-sticker-id');
    const code = document.getElementById(`sticker-code-${stickerId}`).value;

    if (code === correctCodes[stickerId]) {
        document.querySelector(`#sticker-${stickerId} .sticker-status`).textContent = 'Found!';
        alert('Correct code! Sticker found.');
    } else {
        alert('Incorrect code! Please try again.');
    }
}

function showHint(stickerId) {
    // Add hint logic for each sticker
    switch (stickerId) {
        case 1:
            alert("Hint: Kraj P4.");
            break;
        case 2:
            alert("Hint: Most");
            break;
	case 3:
	    alert("Hint: Bathroom 2nd floor");
	    break;
        // Add more cases for additional stickers
        default:
            alert("No hint available for this sticker.");
            break;
    }
}
