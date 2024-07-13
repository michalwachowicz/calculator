const btnContainer = document.querySelector(".btn-container");
const screen = document.querySelector(".screen");

let firstNum = 0;
let currentOperator = null;
let updated = false;

const operate = (a, operator, b) => {
  switch (operator) {
    case "×":
      return a * b;
    case "÷":
      return b === 0 ? "Error" : a / b;
    case "+":
      return a + b;
    case "-":
      return a - b;
    default:
      return "Error";
  }
};

const fill = (num) => {
  const text = screen.textContent;

  screen.textContent = text === "0" || updated ? num : text + num;
  updated = false;
};

const updateOperator = (operator) => {
  if (currentOperator) {
    const total = operate(
      firstNum,
      currentOperator,
      Number(screen.textContent)
    );

    firstNum = total;
    currentOperator = operator;
    updated = true;

    screen.textContent = total;
    return;
  }

  firstNum = Number(screen.textContent);
  currentOperator = operator;
  updated = true;
};

const equals = () => {
  if (!currentOperator) return;

  const total = operate(firstNum, currentOperator, Number(screen.textContent));

  firstNum = total;
  currentOperator = null;
  updated = true;

  screen.textContent = total;
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
    return;
  }

  // Back button clicked
  if (target.id == "back") {
    return;
  }
});
