const click = document.querySelector('audio[data-key="click"]');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const negativeButton = document.querySelector('[data-negative]');
const equalsButton = document.querySelector('[data-equals]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

function audio(sound) {
    sound.play();
}

// add(a, b) - Returns the sum of two numbers a and b.
function add(x,y) {
    return x + y;
}

// // subtract(a, b) - Returns the difference between two numbers a and b.
function subtract(x,y) {
  return x + y;
}

// multiply(a, b) - Returns the product of two numbers a and b.
function multiply(x,y) {
  return x * y;
}

// divide(a, b) - Returns the quotient of two numbers a and b.
function divide(x,y) {
  return x / y;
}

// percentage() - Allows the user to calculate percentages.
function percent(x,y) {
  return x % y;
}

// clear() - Clears the current input and resets the calculator.
function clear() {
  currentOperandTextElement.textContent = '';
}

// equals() - Evaluates the current expression and displays the result.
function equals() {

}

// decimal() - Allows the user to input decimal numbers.
function decimal() {

}

// negative() - Allows the user to input negative numbers.
function negative() {

}

// // displayOutput(num) - Displays the given number on the calculator screen.
function displayOutput(num) {
  currentOperandTextElement.append(num);
}

function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, e => {
    if(e.target.matches(selector)) callback(e)
  })
}

addGlobalEventListener("click", ".number", e => {  
  audio(click);

  displayOutput(e.target.innerText);
  console.log(e.target.innerText);
});

addGlobalEventListener("click", ".clear", () => {  
  audio(click);
  clear();
});

// btnList.forEach((button) => {
//   button.addEventListener('click', e => {
//     const buttonValue = button.getAttribute("value");
  
//     audio(click);

//     if(e.target.innerText) {
//       console.log(e.target.innerText);
//     } else {
//       console.log(buttonValue);
//     }
//   });
// });