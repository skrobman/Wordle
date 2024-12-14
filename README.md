# Wordle Game

Welcome to the Wordle game! This is a simple browser-based implementation of the popular word-guessing game. Your goal is to guess the correct 5-letter word in 5 attempts. Each attempt provides feedback on the accuracy of your guess, helping you get closer to the correct word.

## How It Works

The game board consists of 5 rows, each with 5 cells for the 5 letters of the word. The user has 5 attempts to guess the correct word. After each guess:

- **Green (Correct)**: The letter is in the correct position.
- **Yellow (Present)**: The letter is in the word but in the wrong position.
- **Red (Absent)**: The letter is not in the word at all.

### Steps:

1. **Input Letters**: The user can type one letter per cell in each row. When all 5 cells in a row are filled, the user can submit the guess.
2. **Feedback**: After submitting the guess, the cells change color based on the accuracy of the guess.
3. **Next Row**: If the guess is incorrect, the next row becomes editable. If the guess is correct, the game ends with a success message.
4. **Game Over**: If the user uses all attempts without guessing the word correctly, the game ends with a failure message.

### Game Logic

1. **Word Generation**: The game fetches a random 5-letter word from an external API (`https://random-word-api.herokuapp.com/word?length=5`), ensuring that it’s a valid word.
2. **Input Validation**: The game validates the input to ensure the user is only typing one letter at a time in each cell.
3. **Feedback Mechanism**: After every guess, the system compares the guess to the target word and provides feedback in the form of colors:
   - **Green**: The letter is correct and in the right position.
   - **Yellow**: The letter is correct but in the wrong position.
   - **Red**: The letter is not in the word.
4. **Next Row Activation**: After each guess, the game disables editing for the current row and moves to the next one.
5. **End Conditions**: If the word is guessed correctly or all attempts are used up, the game concludes.

## Design

- **Responsive Layout**: The game board and interface are designed to be responsive and easy to use across different devices.
- **Intuitive UX**: Each letter in the guess is interactive, providing a seamless experience for the user.
- **Colorful Feedback**: The color-coded feedback (Green, Yellow, Red) makes it easy for users to understand how close they are to guessing the correct word.

---

This project aims to provide a fun and educational experience while implementing core web development concepts like DOM manipulation, event handling, and asynchronous operations with APIs.

Enjoy playing the game and try to guess the word in as few attempts as possible!
