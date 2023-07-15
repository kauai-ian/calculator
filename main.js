//declare variables for number inputs and an operator
const firstArg = 0;
const secondArg = 0;
const operator = 0;

const numberBtns = document.querySelectorAll("[data-number");
const operatorBtns = document.querySelectorAll("data-operator");
const equalsBtn = document.getElementById("equalsBtn");
const deleteBtn = document.getElementById("deleteBtn");
const clearBtn = document.getElementById("clearBtn");
const pointBtn = document.getElementById("pointBtn");
const lastOperationScreen = document.getElementById("lastOperationScreen");
const currentOperationScreen = document.getElementById(
  "currentOperationScreen"
);
//
equalsBtn.addEventListener("click", evaluate);
clearBtn.addEventListener("click", clear);
deleteBtn.addEventListener("click", deleteNumber);
pointBtn.addEventListener("click", appendPoint);

//

function add(...nums) {
  return nums.reduce((num1, num2) => num1 + num2);
}

function subtract(...nums) {
  return nums.reduce((num1, num2) => num1 - num2);
}

function multiply(...nums) {
  return nums.reduce((num1, num2) => num1 * num2);
}

function divide(...nums) {
  return nums.reduce((num1, num2) => num1 / num2);
}

function operate(operator, firstArg, secondArg) {
  switch (operator) {
    case "+":
      return add(firstArg, secondArg);
      break;
    case "-":
      return subtract(firstArg, secondArg);
      break;
    case "x":
      return multiply(firstArg, secondArg);
      break;
    case "÷":
      return divide(firstArg, secondArg);
      break;
  }
}
