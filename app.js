class Calculator {
    constructor(previous, current) {
        this.previous = previous;
        this.current = current;
        this.clear();
    }

    clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.opreation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = number.toString() + this.currentOperand.toString() 
      }

    chooseOpreation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';

    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
                case '-':
                computation = prev - current
                break
                case '*':
                computation = prev * current
                break
                case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber (number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
        integerDisplay = ''
        } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
        } else {
        return integerDisplay
        }
   }

    updateDisplay() {
        this.current.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previous.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previous.innerText = ''
          }
    }
}

const number = document.querySelectorAll('[data-number]');
const operation = document.querySelectorAll('[data-opreation]');
const EqualBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const clear = document.querySelector('[data-all-clear]');
const previous = document.querySelector('[data-previous]');
const current = document.querySelector('[data-current]');

const calculator = new Calculator(previous, current);

number.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operation.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOpreation(button.innerText);
        calculator.updateDisplay();
    });
});

EqualBtn.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
});

clear.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
});

deleteBtn.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
});