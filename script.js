// Simple calculator logic for the lab assignment

const previousOperandText = document.getElementById("previous-operand");
const currentOperandText = document.getElementById("current-operand");

let currentOperand = "0";
let previousOperand = "";
let currentOperation = null;
let justEvaluated = false;

function updateDisplay() {
  currentOperandText.textContent = currentOperand || "0";
  previousOperandText.textContent = currentOperation
    ? `${previousOperand} ${currentOperation}`
    : "";
}
// // CLEAR FUNCTION FROM BRANCH B
function clearAll() {
  currentOperand = "B-erase";
  previousOperand = "";
  currentOperation = null;
  justEvaluated = false;
  updateDisplay();
}

function deleteDigit() {
  if (justEvaluated) {
    // After equals, DEL behaves like AC on current result
    currentOperand = "0";
    justEvaluated = false;
  } else {
    currentOperand = currentOperand.toString().slice(0, -1);
    if (currentOperand === "" || currentOperand === "-") {
      currentOperand = "0";
    }
  }
  updateDisplay();
}

function appendNumber(number) {
  if (number === "." && currentOperand.includes(".")) return;

  if (currentOperand === "0" && number !== ".") {
    currentOperand = number.toString();
  } else if (justEvaluated) {
    // Start a new input after equals
    currentOperand = number.toString();
    justEvaluated = false;
  } else {
    currentOperand += number.toString();
  }

  updateDisplay();
}

function chooseOperation(operation) {
  if (currentOperand === "" && previousOperand === "") return;

  if (previousOperand !== "" && !justEvaluated) {
    compute();
  } else {
    previousOperand = currentOperand;
  }

  currentOperation = operation;
  currentOperand = "0";
  justEvaluated = false;
  updateDisplay();
}

function compute() {
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(curr)) return;

  let computation;
  switch (currentOperation) {
    case "+":
      computation = prev + curr;
      break;
    case "−":
      computation = prev - curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "×":
      computation = prev * curr;
      break;
    case "*":
      computation = prev * curr;
      break;
    case "÷":
      computation = curr === 0 ? "Error" : prev / curr;
      break;
    case "/":
      computation = curr === 0 ? "Error" : prev / curr;
      break;
    default:
      return;
  }

  currentOperand = computation.toString();
  previousOperand = "";
  currentOperation = null;
  justEvaluated = true;
  updateDisplay();
}

function toggleSign() {
  if (currentOperand === "0" || currentOperand === "Error") return;
  if (currentOperand.startsWith("-")) {
    currentOperand = currentOperand.slice(1);
  } else {
    currentOperand = "-" + currentOperand;
  }
  updateDisplay();
}

/* Button events */

document.addEventListener("click", (e) => {
  const target = e.target;
  if (!(target instanceof HTMLElement)) return;

  // Number buttons
  const number = target.getAttribute("data-number");
  if (number !== null) {
    appendNumber(number);
    return;
  }

  // Operation buttons
  const operation = target.getAttribute("data-operation");
  if (operation !== null) {
    chooseOperation(operation);
    return;
  }

  // Action buttons
  const action = target.getAttribute("data-action");
  if (action === "clear") {
    clearAll();
  } else if (action === "delete") {
    deleteDigit();
  } else if (action === "equals") {
    if (currentOperation !== null) compute();
  } else if (action === "sign") {
    toggleSign();
  }
});

/* Keyboard support */
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (key >= "0" && key <= "9") {
    appendNumber(key);
    return;
  }

  if (key === ".") {
    appendNumber(".");
    return;
  }

  if (key === "+" || key === "-" || key === "*" || key === "/") {
    chooseOperation(key);
    return;
  }

  if (key === "Enter" || key === "=") {
    e.preventDefault();
    if (currentOperation !== null) compute();
    return;
  }

  if (key === "Backspace") {
    deleteDigit();
    return;
  }

  if (key === "Escape") {
    clearAll();
    return;
  }
});

/* Initialize */
clearAll();
