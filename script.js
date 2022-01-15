const display = document.querySelector(".calculator-input");
const tempResult = document.querySelector(".calculator-temp-input");
const keys = document.querySelector(".calculator-keys");

let displayValue = "0";
let tempValue = '0';
let firstNum = null;
let isClickedOperetor = false;
let operator = "";

updateDisplay();

function updateDisplay() {

    display.value = displayValue;
    tempResult.value = tempValue + operator;
}

keys.addEventListener('click', function(e) {


    if (!e.target.matches("button")) return

    if (e.target.classList.contains('operator')) {
        handleOperators(e.target.value);
        updateDisplay();
        return
    }

    if (e.target.classList.contains('decimal')) {
        inputDecimal(e.target.value);
        updateDisplay();
        return
    }

    if (e.target.classList.contains('clear')) {
        clear();
        updateDisplay();
        return
    }
    inputNumber(e.target.value);
    updateDisplay();

})

function inputNumber(num) {
    if (isClickedOperetor) {
        displayValue = num;
        tempValue = num;
        isClickedOperetor = false;
    } else {


        displayValue = displayValue === tempValue ? num : displayValue + num;
    }

    console.log(firstNum, displayValue, operator);
}

function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += ".";

    }
}

function clear() {
    displayValue = '0';
}

function handleOperators(number) {

    const value = parseFloat(displayValue);

    if (firstNum === null) {
        firstNum = value;
    } else if (operator) {
        const result = calculate(firstNum, value, operator);

        displayValue = String(result);
        firstNum = result;
    }
    isClickedOperetor = true;
    operator = number;
}

function calculate(first, second, operator) {

    if (operator === "+") {
        return first + second;
    } else if (operator === '-') {
        return first - second;
    } else if (operator === '*') {
        return first * second;
    } else if (operator === '/') {
        return first / second;
    }
    return second;


}