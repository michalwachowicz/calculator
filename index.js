const btnContainer = document.querySelector(".btn-container");
const operators = document.querySelectorAll(".operator");
const screen = document.querySelector(".screen-text");

const MAX_CHAR = 20;

let firstNum = 0;
let currentOperator = null;
let updated = false;

const adjustScreenFontSize = () => {
  let fontSize = 56;
  screen.style.fontSize = `${fontSize}px`;

  while (
    screen.clientWidth > screen.parentNode.clientWidth - 16 &&
    fontSize > 24
  ) {
    fontSize--;
    screen.style.fontSize = `${fontSize}px`;
  }

  while (screen.clientWidth < screen.scrollWidth && fontSize < 56) {
    fontSize++;
    screen.style.fontSize = `${fontSize}px`;
  }
};

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

  if (total != "Error") {
    total = Math.round(Number(total) * 100) / 100;
  }

  updated = true;
  firstNum = total;
  screen.textContent = total;

  adjustScreenFontSize();
};

const fill = (num) => {
  const text = screen.textContent;
  const point = ".";

  if (screen.textContent.length >= MAX_CHAR) return;
  if (num === point && (text.includes(point) || text === "")) return;

  screen.textContent =
    (text === "0" && num !== point) || updated ? num : text + num;
  updated = false;

  adjustScreenFontSize();
};

const clearOperators = () => {
  operators.forEach((op) => op.classList.remove("current"));
};

const highlightOperator = (operator) => {
  clearOperators();
  [...operators]
    .find((op) => op.textContent == operator)
    .classList.add("current");
};

const updateOperator = (operator) => {
  const text = screen.textContent;
  if (text === "" || text === "Error") return;

  if (currentOperator) {
    operate();
    highlightOperator(operator);

    currentOperator = operator;
    return;
  }

  firstNum = Number(text);
  currentOperator = operator;
  updated = true;

  highlightOperator(operator);
};

const equals = () => {
  if (!currentOperator) return;

  operate();
  clearOperators();

  currentOperator = null;
};

const clear = () => {
  firstNum = 0;
  currentOperator = null;
  screen.textContent = "";

  clearOperators();
};

const backspace = () => {
  const text = screen.textContent;

  if (text == "Error") {
    screen.textContent = "";
    return;
  }

  screen.textContent = text.substring(0, text.length - 1);
  adjustScreenFontSize();
};

const press = (selector, text = null) => {
  const element = text
    ? [...document.querySelectorAll(selector)].find(
        (el) => el.textContent == text
      )
    : document.querySelector(selector);
  if (!element) return;

  const activeClass = "active";

  if (!element.classList.contains(activeClass)) {
    element.classList.add(activeClass);
    element.click();

    setTimeout(() => element.classList.remove(activeClass), 50);
  }
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

window.addEventListener("keydown", (e) => {
  const key = e.key;

  switch (key) {
    case ".":
      press(".point-btn");
      break;
    case "=":
    case "Enter":
      press(".equals-btn");
      break;
    case "*":
      press(".operator", "×");
      break;
    case "/":
      press(".operator", "÷");
      break;
    case "+":
    case "-":
      press(".operator", key);
      break;
    case "c":
    case "C":
      press("#clear");
      break;
    case "Backspace":
      press("#back");
      break;
    default:
      if (key >= 0 && key <= 9) press(".digit-btn", key);
  }
});

window.addEventListener("resize", adjustScreenFontSize);
