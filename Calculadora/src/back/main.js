const inputResult = document.getElementById('result');
const btnClear = document.querySelector('.btn-clear');
const btnEqual = document.querySelector('.btn-equal');

let currentResult = '';
let previousResult = '';
let operation = null;

btnClear.addEventListener('click', clearResult);
btnEqual.addEventListener('click', calculate);
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    clearResult();
  }
});


window.addEventListener('keydown', (event) => {
  const key = event.key;
  if (/[0-9]/.test(key)) {
    addNumber(key);
  } else if (/[\+\-\*\/]/.test(key)) {
    setOperation(key);
  } else if (event.key === 'Enter') {
    calculate();
  }
});

function addNumber(number) {
  currentResult += number;
  inputResult.value = currentResult;
}

function setOperation(operator) {
  operation = operator;
  previousResult = currentResult;
  currentResult = '';
}

function clearResult() {
  currentResult = '';
  previousResult = '';
  operation = null;
  inputResult.value = '0';
}

function calculate() {
  let result = 0;
  const prev = parseFloat(previousResult);
  const curr = parseFloat(currentResult);

  if (isNaN(prev) || isNaN(curr)) {
    inputResult.value = 'Error';
    return;
  }

  switch (operation) {
    case '+':
      result = prev + curr;
      break;
    case '-':
      result = prev - curr;
      break;
    case '*':
      result = prev * curr;
      break;
    case '/':
      if (curr === 0) {
        inputResult.value = 'Error';
        return;
      }
      result = prev / curr;
      break;
    default:
      return;
  }

  currentResult = result.toString();
  previousResult = '';
  operation = null;
  inputResult.value = currentResult;
}

function handleKeyPress(event) {
  const keyPressed = event.key;

  if (!isNaN(keyPressed) || keyPressed === '.') {
    addNumber(keyPressed);
  } else if (keyPressed === '+' || keyPressed === '-' || keyPressed === '*' || keyPressed === '/') {
    setOperation(keyPressed);
  } else if (keyPressed === 'Enter') {
    calculate();
  }
}

inputResult.addEventListener('keydown', handleKeyPress);
