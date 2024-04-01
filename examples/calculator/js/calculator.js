// FUNCTIONALITY WORKS WITH BOTH KEYPRESS AND KEYPAD


//Create an obj to keep track of values
const calculator = {
    //This will display 0 on the calculator screen.
    displayValue: '0',
    //This will hold the first operand for any expressions, but we set it to null for now.
    firstOperand: null,
    //This checks whether or not the second operand has been input by the user
    waitSecondOperand: false,
    //This will hold the operator, we set it to null for now
    operator: null
};

//This modifies values each time a button is clicked on.
function inputDigit(digit){
    const { displayValue, waitSecondOperand } = calculator;
    //this checks if the waitSecondOperand is true and sets displayValue to the key that was clicked on.
    if (waitSecondOperand === true){
        calculator.displayValue = digit;
        calculator.waitSecondOperand = false;
    }else{
        //This overwrites displayValue if the current value is 0 otherwise it adds into it
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

//this section handles decimal points
function inputDecimal(dot){
    //this ensures that accidental clicking of the decimal point doesn't cause bugs in operation
    if(calculator.waitSecondOperand === true) return;
    if(!calculator.displayValue.includes(dot)){
        //we are saying that if the displayValue does not container a decimal point we want to add it
        calculator.displayValue += dot;
    }
}

//this section handles operators
function handleOperator(nextOperator){
    const { firstOperand, displayValue, operator} = calculator;
    //when an operator key is pressed we convert the current # displayed on the screen to a # and then
    //store the result in calculator.firstOperand if it doesn't already exist
    const valueOfInput = parseFloat(displayValue);
    //checks if an operator already exists and waitSecondOperand is true, then updates the operator
    //and exits from the function
    if(operator && calculator.waitSecondOperand){
        calculator.operator = nextOperator;
        return;
    }
    if(firstOperand == null){
        calculator.firstOperand = valueOfInput;
    }else if(operator){ //checks if an operator already exists
        const valueNow = firstOperand || 0;
        //if operator exists, property lookup is performed for the operator in the performCalculation
        //obj and the function that matches the operator is executed
        let result = performCalculation[operator](valueNow,valueOfInput);
        //here we add a fixed amount of #s after the decimal
        result = Number(result).toFixed(9);
        //this will remove any trailing 0's
        result = (result * 1).toString();
        calculator.displayValue = parseFloat(result);
        calculator.firstOperand = parseFloat(result);
    }

    console.log(calculator)

    calculator.waitSecondOperand = true;
    calculator.operator = nextOperator;
}

const performCalculation = {
    '/': (firstOperand, waitSecondOperand) => firstOperand / waitSecondOperand,
    '*': (firstOperand, waitSecondOperand) => firstOperand * waitSecondOperand,
    '+': (firstOperand, waitSecondOperand) => firstOperand + waitSecondOperand,
    '-': (firstOperand, waitSecondOperand) => firstOperand - waitSecondOperand,
    '=': (firstOperand, waitSecondOperand) => waitSecondOperand
};

function calculatorReset(){
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitSecondOperand = false;
    calculator.operator = null;
}

//this function updates the calculator screen with the contents of displayValue
function updateDisplay(){
    //makes use of the calculator-screen class to target the input tag in the HTML element
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

updateDisplay();

//this section monitors button clicks
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    //that target var is an object that represents the element that was clicked
    
    const {target} = event;
    //if the element that was clicked is not a button, exit the function
    if(!target.matches('button')){
        //alert('1')
        return;
        
    }
    if(target.classList.contains('operator')){
        //alert('2')
        handleOperator(target.value);
        console.log('----------FUNC-----------');
        console.log(target.value)
        updateDisplay();
        return;
    }
    if(target.classList.contains('decimal')){
        //alert('3')
        inputDecimal(target.value);
        updateDisplay();
        return;
    }
    //ensures that AC clears all inputs from the calculator screen.
    if(target.classList.contains('all-clear')){
        calculatorReset();
        updateDisplay();
        return;
    }
    inputDigit(target.value);
    updateDisplay();
});

/* for displaying current window size
document.getElementById('xwidth').innerHTML = window.innerWidth;
document.getElementById('xheight').innerHTML = window.innerHeight;
window.addEventListener('resize', function(event) {
    document.getElementById('xwidth').innerHTML = window.innerWidth;
    document.getElementById('xheight').innerHTML = window.innerHeight;
}, true);
*/

const checkNum = (a, b) => a.every(el => b.includes(el));
addEventListener("keypress", (e) => {
    if(isNaN(e.key) == false){
        document.getElementById(e.key).click();
        // code block
        console.log('+++++++++ NUMBER +++++++++++');
        console.log("The key was: " + e.key) 
    }else{

          var operation = null;
          if(e.key == '+') { operation = "add"; }
          else if(e.key == '-') { operation = "subtract"; }
          else if(e.key == 'x' || e.key == '*') { operation = "multiply"; }
          else if(e.key == '?') { operation = "divide"; }
          else if(e.key == '=' || e.key == 'Enter') { operation = "equal"; }
        // code block
        console.log('+++++++++ OPERATION +++++++++++');
        console.log("The key was: " + e.key);
        if(operation != null) document.getElementById(operation).click();
        
    }

    




});

setTimeout(function () { 
  
    if(localStorage.getItem("alertState") == null){
        localStorage.setItem("alertState", true);
        var msg = "An additional note:\n\
        Feel free to use the number keys, as well as\n\
            'x' or '*' for multiplication,\n\
            '?' for division (due to preexisting key map),\n\
            '+' for addition,\n\
            '-' for subtraction,\n\
            '=' or 'Enter' for sum of products,\n";
        alert(msg);
    }    
}, 2000);