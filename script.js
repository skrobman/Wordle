async function getData() {
    let url = "https://random-word-api.herokuapp.com/word?length=5";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
        checkWord(json[0]);
    } catch (error) {
        console.error(error.message);
    }
}

function inputWord() {
    document.querySelectorAll('.cell').forEach(div => {
        div.addEventListener('input', function () {
            // Limit input to 1 character
            if (this.innerText.length > 1) {
                this.innerText = this.innerText.charAt(0);
            }

            // If all cells are filled, disable all cells
            if (Array.from(document.querySelectorAll('.cell')).every(d => d.innerText.length === 1)) {
                document.querySelectorAll('.cell').forEach(d => {
                    d.setAttribute('contenteditable', 'false'); // Disable editing
                    d.classList.add('disabled'); // Optional: add a class for styling (e.g., gray out)
                });
            }
        });
    });
}


function checkWord(word) {
    const firstRow = document.querySelector('.row');

    const cells = Array.from(firstRow.querySelectorAll('.cell')); // Ensure we're selecting '.cell' not '.cells'

    let wordSplit = word.split('');

    // Check if the number of cells in the first row equals the length of the word
    if (cells.length === wordSplit.length) {
        // Check if the content of the cells in the first row is equal to the word
        const rowContent = cells.map(cell => cell.textContent).join('').split('');

        if (rowContent === wordSplit) {
            console.log("The first row matches the word.");
        } else {
            console.log("The first row does not match the word.");
            for (let i = 0; i < cells.length; i++) {
                if (rowContent[i] === wordSplit[i]) {
                    console.log(`${i} : ${rowContent[i]}`);
                }
            }
        }
    }
}

inputWord();

getData();