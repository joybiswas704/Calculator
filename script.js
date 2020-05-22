// Defining Calculator class//
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear(); 
    }
    // Clear the screen//
    clear() {
        this.previousOperand = "";
        this.currentOperand = "";
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = String(this.currentOperand).slice(0,-1);
    }

    appendNumber(number) {
        if(number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = String(this.currentOperand) + String(number) ;
    }

    // Take the operation from event handler and decides what to do//
    chooseOperation(operation) {
        if(this.currentOperand == "") return;
        if(this.previousOperand != "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;
        switch(this.operation) {
            case "+" :
                computation = prev + current;
                break;
            case "-" :
                computation = prev - current;
                break;
            case "*":
                computation = prev * current;
                break;
            case "÷" :
                computation = prev / current;
                break; 
            default :
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        // showing both previous text element and the operation
        if(this.operation != null) {
            this.previousOperandTextElement.innerText = 
            `${this.previousOperand} ${this.operation}`
        }
        else {
            this.previousOperandTextElement.innerText = "";
        }
    }
}
//................................................//

// selecting all the elements from the html file //
const numberButton = document.querySelectorAll("[data-number]");
const operationButton = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");
//.............................................//

// creating a calculator object//
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// adding event listener to all the number button//
numberButton.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

// adding event listener to clear button//
allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

// adding event listener to all operation button//
operationButton.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

// adding event listener to the equal button//
equalsButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
});

// adding event listener to delete button//
deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
});








