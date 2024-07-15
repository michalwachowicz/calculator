const btnContainer = document.querySelector(".btn-container");
const screen = document.querySelector(".screen");

let firstNum = 0;
let currentOperator = null;
let updated = false;

const operate = () => {
  const secondNum = Number(screen.textContent);
  let total;

  switch (currentOperator) {
    case "×":
      total = firstNum * secondNum;
      break;
    case "÷":
      total = secondNum === 0 ? "Error" : firstNum / secondNum;
      break;
    case "+":
      total = firstNum + secondNum;
      break;
    case "-":
      total = firstNum - secondNum;
      break;
    default:
      total = "Error";
  }

  updated = true;
  firstNum = total;
  screen.textContent = total;
};

const fill = (num) => {
  const text = screen.textContent;
  const point = ".";

  if (num === point && (text.includes(point) || text === "")) return;

  screen.textContent = text === "0" || updated ? num : text + num;
  updated = false;
};

const updateOperator = (operator) => {
  if (currentOperator) {
    operate();
    currentOperator = operator;
    return;
  }

  firstNum = Number(screen.textContent);
  currentOperator = operator;
  updated = true;
};

const equals = () => {
  if (!currentOperator) return;

  operate();
  currentOperator = null;
};

const clear = () => {
  firstNum = 0;
  currentOperator = null;
  screen.textContent = "";
};

const backspace = () => {
  const text = screen.textContent;

  if (text == "Error") {
    screen.textContent = "";
    return;
  }

  screen.textContent = text.substring(0, text.length - 1);
};

btnContainer.addEventListener("click", (e) => {
  const target = e.target;
  if (!target || target.type != "submit") return;

  // Digit button clicked
  if (target.classList.contains("digit-btn")) {
    fill(target.textContent);
    return;
  }

  // Equals button clicked
  if (target.classList.contains("equals-btn")) {
    equals();
    return;
  }

  if (target.classList.contains("operator")) {
    updateOperator(target.textContent);
    return;
  }

  // Clear button clicked
  if (target.id == "clear") {
    clear();
    return;
  }

  // Back button clicked
  if (target.id == "back") backspace();
});
