//declare variables for number inputs and an operator
let firstArg = "";
let secondArg = "";
let operator = null;

// creates a boolean check to reset the screen. If true, screen resets, otherwise keep going.
let shouldResetScreen = false;

// creates a placeholder variable for the current operation
let currentOperation = null;

// create a set of variables that can modify the DOM
const numberBtns = document.querySelectorAll("[data-number]");
const operatorBtns = document.querySelectorAll("[data-operator]");
const equalsBtn = document.getElementById("equalsBtn");
const deleteBtn = document.getElementById("deleteBtn");
const clearBtn = document.getElementById("clearBtn");
const pointBtn = document.getElementById("pointBtn");
const lastOperationScreen = document.getElementById("lastOperationScreen");
const currentOperationScreen = document.getElementById(
  "currentOperationScreen"
);

// adds click listener to run a function
window.addEventListener("keydown", handleKeyboardInput);
equalsBtn.addEventListener("click", evaluate);
clearBtn.addEventListener("click", clear);
deleteBtn.addEventListener("click", deleteNumber);
pointBtn.addEventListener("click", appendPoint);

numberBtns.forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.textContent));
});

operatorBtns.forEach((button) => {
  button.addEventListener("click", () => setOperation(button.textContent));
});

// creates a function that remembers the last number entered via the display
function appendNumber(number) {
  if (currentOperationScreen.textContent === "0" || shouldResetScreen)
    resetScreen();
  currentOperationScreen.textContent += number;
}

// resets the screen to blank
function resetScreen() {
  currentOperationScreen.textContent = "";
  shouldResetScreen = false;
}

// creats a function clear screen and all input history
function clear() {
  currentOperationScreen.textContent = "0";
  lastOperationScreen.textContent = "";
  firstArg = "";
  secondArg = "";
  currentOperation = null;
}

// creates a function to add a decimal
function appendPoint() {
  if (shouldResetScreen) resetScreen();
  if (currentOperationScreen.textContent === "");
  currentOperationScreen.textContent = "0";
  if (currentOperationScreen.textContent.includes(".")) return;
  currentOperationScreen.textContent += ".";
}

// creates a function to delete a number
function deleteNumber() {
  currentOperationScreen.textContent = currentOperationScreen.textContent
    .toString()
    .slice(0, 1);
}

// create a function to set the operation using the operator.
// after setting the operator, the screen will clear to add the next argument.
function setOperation(operator) {
  if (currentOperation !== null) evaluate();
  firstArg = currentOperationScreen.textContent;
  currentOperation = operator;
  lastOperationScreen.textContent = `${firstArg} ${currentOperation}`;
  shouldResetScreen = true;
}

//creates a function to evaluate the inputs
function evaluate() {
  if (currentOperation === null || shouldResetScreen) return;
  if (currentOperation === "÷" && currentOperationScreen.textContent === "0") {
    alert("You can't divide by 0!");
    return;
  }
  secondArg = currentOperationScreen.textContent;
  currentOperationScreen.textContent = roundResult(
    operate(currentOperation, firstArg, secondArg)
  );
  lastOperationScreen.textContent = `${firstArg} ${currentOperation} ${secondArg} =`;
  currentOperation = null;
}

// rounds a deceminal
function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

// allow use of computer keyboard
function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") appendPoint();
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "Backspace") deleteNumber();
  if (e.key === "Escape") clear();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    setOperation(convertOperator(e.key));
}

// convert keyboard input operator to calculator operator
function convertOperator(keyboardOperator) {
  if (keyboardOperator === "/") return "÷";
  if (keyboardOperator === "*") return "x";
  if (keyboardOperator === "+") return "+";
  if (keyboardOperator === "-") return "-";
}

// basic math operators on a simple calculator
function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

// calls the above basic math functions
function operate(operator, num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "x":
      return multiply(num1, num2);
    case "÷":
      if (num2 === 0) return null;
      else return divide(num1, num2);
    default:
      return null;
  }
}
