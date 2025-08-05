// Script.js
document.addEventListener('DOMContentLoaded', () => {
            const display = document.getElementById('display');
            const historyDisplay = document.getElementById('history');
            const buttons = document.querySelectorAll('button');
            let currentInput = '0';
            let previousInput = '';
            let operation = null;
            let resetInput = false;

            // Update display
            const updateDisplay = () => {
                display.textContent = currentInput;
                historyDisplay.textContent = previousInput + (operation ? ' ' + operation : '');
            };

            // Handle number input
            const inputNumber = (number) => {
                if (currentInput === '0' || resetInput) {
                    currentInput = number;
                    resetInput = false;
                } else {
                    currentInput += number;
                }
                updateDisplay();
            };

            // Handle decimal point
            const inputDecimal = () => {
                if (resetInput) {
                    currentInput = '0.';
                    resetInput = false;
                } else if (!currentInput.includes('.')) {
                    currentInput += '.';
                }
                updateDisplay();
            };

            // Handle operator
            const handleOperator = (nextOperator) => {
                const inputValue = parseFloat(currentInput);
                
                if (operation && !resetInput) {
                    calculate();
                } else {
                    previousInput = currentInput;
                }
                
                operation = nextOperator;
                resetInput = true;
                updateDisplay();
            };

            // Calculate result
            const calculate = () => {
                if (!operation || resetInput) return;
                
                const prev = parseFloat(previousInput);
                const current = parseFloat(currentInput);
                let result = 0;
                
                switch (operation) {
                    case '+':
                        result = prev + current;
                        break;
                    case '-':
                        result = prev - current;
                        break;
                    case '*':
                        result = prev * current;
                        break;
                    case '/':
                        result = prev / current;
                        break;
                    case '%':
                        result = prev % current;
                        break;
                    default:
                        return;
                }
                
                // Handle division by zero
                if (isNaN(result) || !isFinite(result)) {
                    currentInput = 'Error';
                } else {
                    currentInput = result.toString();
                }
                
                operation = null;
                resetInput = true;
                previousInput = '';
                updateDisplay();
            };

            // Handle clear
            const clearAll = () => {
                currentInput = '0';
                previousInput = '';
                operation = null;
                updateDisplay();
            };

            // Handle backspace
            const backspace = () => {
                if (currentInput.length === 1 || (currentInput[0] === '-' && currentInput.length === 2)) {
                    currentInput = '0';
                } else {
                    if (!resetInput) {
                        currentInput = currentInput.slice(0, -1);
                    }
                }
                updateDisplay();
            };

            // Handle percentage
            const percentage = () => {
                const value = parseFloat(currentInput);
                currentInput = (value / 100).toString();
                updateDisplay();
            };

            // Button click handler
            const handleButtonClick = (e) => {
                const { value } = e.target.dataset;
                
                switch (value) {
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                        inputNumber(value);
                        break;
                    case '.':
                        inputDecimal();
                        break;
                    case '+':
                    case '-':
                    case '*':
                    case '/':
                    case '%':
                        handleOperator(value);
                        break;
                    case 'equals':
                        calculate();
                        break;
                    case 'clear':
                        clearAll();
                        break;
                    case 'backspace':
                        backspace();
                        break;
                    case 'percentage':
                        percentage();
                        break;
                }
            };

            // Keyboard support
            const handleKeyboardInput = (e) => {
                const key = e.key;
                
                if (key >= '0' && key <= '9') {
                    inputNumber(key);
                } else if (key === '.') {
                    inputDecimal();
                } else if (key === '+' || key === '-' || key === '*' || key === '/') {
                    handleOperator(key);
                } else if (key === '%') {
                    percentage();
                } else if (key === 'Enter' || key === '=') {
                    calculate();
                } else if (key === 'Escape') {
                    clearAll();
                } else if (key === 'Backspace') {
                    backspace();
                }
            };

            // Add event listeners
            buttons.forEach(button => {
                button.addEventListener('click', handleButtonClick);
            });
            
            document.addEventListener('keydown', handleKeyboardInput);
        });