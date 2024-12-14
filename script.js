const submitGuess = document.getElementById('submit-guess');
const rows = document.querySelectorAll('.row');
let targetWord = "";
let currentRowIndex = 0;

async function getData() {
    const url = "https://random-word-api.herokuapp.com/word?length=5";
    try {
        let word;
        do {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Response Status: ${response.status}`);
            const json = await response.json();
            word = json[0];
        } while (word.length !== 5);

        targetWord = word.toLowerCase();
        console.log(`Target word: ${targetWord}`);
    } catch (error) {
        console.error(`Error fetching word: ${error.message}`);
    }
}

function checkWord(word, row) {
    const wordSplit = targetWord.split('');
    const inputSplit = word.split('');
    const cells = Array.from(row.querySelectorAll('.cell'));
    const targetUsed = Array(targetWord.length).fill(false);

    inputSplit.forEach((letter, i) => {
        if (letter === wordSplit[i]) {
            cells[i].classList.add('correct');
            targetUsed[i] = true;
        }
    });

    inputSplit.forEach((letter, i) => {
        if (!cells[i].classList.contains('correct') && wordSplit.includes(letter)) {
            const matchIndex = wordSplit.findIndex((l, idx) => l === letter && !targetUsed[idx]);
            if (matchIndex !== -1) {
                cells[i].classList.add('present');
                targetUsed[matchIndex] = true;
            } else {
                cells[i].classList.add('absent');
            }
        } else if (!cells[i].classList.contains('correct')) {
            cells[i].classList.add('absent');
        }
    });
}

function enableNextRow() {
    if (currentRowIndex < rows.length - 1) {
        currentRowIndex++;
        const nextRow = rows[currentRowIndex];
        const cells = Array.from(nextRow.querySelectorAll('.cell'));
        cells.forEach(cell => {
            cell.setAttribute('contenteditable', 'true');
            cell.classList.remove('disabled');
        });
    } else {
        console.log("Game Over: All rows used!");
    }
}

function handleInput() {
    const currentRow = rows[currentRowIndex];
    const cells = Array.from(currentRow.querySelectorAll('.cell'));

    if (cells.every(cell => cell.textContent.trim().length === 1)) {
        const word = cells.map(cell => cell.textContent.trim().toLowerCase()).join('');
        console.log(`Word formed: ${word}`);
        checkWord(word, currentRow);

        cells.forEach(cell => {
            cell.setAttribute('contenteditable', 'false');
            cell.classList.add('disabled');
        });

        if (word !== targetWord) {
            enableNextRow();
        } else {
            console.log("Congratulations! You've guessed the word!");
        }
    }
}

rows.forEach((row, rowIndex) => {
    const cells = Array.from(row.querySelectorAll('.cell'));
    cells.forEach(cell => {
        cell.addEventListener('input', function () {
            const inputText = this.textContent.trim();

            if (inputText.length > 1) {
                this.textContent = inputText.charAt(0);
            }

            handleInput();
        });
    });
});

submitGuess.addEventListener('click', () => {
    handleInput();
});

getData();
