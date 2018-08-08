const printChar = {

    'equal': '=',
    'addition': '\53',
    'subtraction': '\55',
    'multiplication': '\u00d7',
    'division': '\367',
    'point': '.',
    'plus-minus': '\261',
    'percent': '\45'

};

// printChar.equal

// let = key = 'equal';
// printChar[key];

$(function() {


    let ekran1 = $('div.ekran1'),
        ekran2 = $('div.ekran2');
    ekran2.html("");
    let lastOperationClick = false;
    let allInputs = [];

    let shift = false;

    // TASTATURA

    window.addEventListener('keydown', function(event) {
        console.log(event);
        console.log(event.key);
        console.log(event.keyCode);

        if (event.keyCode === 16) {
            shift = true;
        }

    });

    window.addEventListener('keyup', function(event) {


        if (event.keyCode === 16) {
            shift = false;
        }
        if (event.keyCode === 187) {
            if (shift) {
                $('button[data-operation = "addition"]').trigger('click');
            } else {
                $('button[data-operation = "equal"]').trigger('click');
            }
        }

        if (event.keyCode >= 96 && event.keyCode <= 105 || event.keyCode >= 48 && event.keyCode <= 57) {
            let selector = `button[data-number="${event.key}"]`;
            $(selector).trigger('click');
        }

        if (event.keyCode === 107) {
            $('button[data-operation = "addition"]').trigger('click');
        }

        if (event.keyCode === 109 || event.keyCode === 189) {
            $('button[data-operation = "subtraction"]').trigger('click');
        }

        if (event.keyCode === 106) {
            $('button[data-operation = "multiplication"]').trigger('click');
        }

        if (event.keyCode === 111) {
            $('button[data-operation = "division"]').trigger('click');
        }

        if (event.keyCode === 46) {
            clear('entry');
        }

        if (event.keyCode === 27) {
            clear('all');
        }

        if (event.keyCode === 13) {
            defaultOperation("equal");
            reset();
        }

        if (event.keyCode === 8) {
            backspace();
        }

        if (event.keyCode === 190 || event.keyCode === 110) {
            addPoint();
        }

    });

    // KRAJ TASTATURE

    $('button[data-number]').click(function() {
        let number = $(this).data('number');
        console.log(number);
        if (lastOperationClick) {
            ekran2.html('');
            lastOperationClick = false;
        }
        ekran2.html(`${ekran2.html()}${number}`)
    });

    $('button[data-operation]').click(function() {

        let operation = $(this).data('operation');
        console.log(operation);

        switch (operation) {

            case "clear-all":
                clear('all');
                break;
            case "clear-entry":
                clear('entry');
                break;
            case "backspace":
                backspace();
                break;
            case "plus-minus":
                plusMinus();
                break;
            case "point":
                addPoint();
                break;
            case "equal":
                defaultOperation(operation);
                reset();
                break;
            default:
                defaultOperation(operation);
                break

        }


    });

    function printEkran1(number, operation) {

        ekran1.html(`${ekran1.html()} ${number} ${operation}`);
    }

    function clear(options) {

        if (options === 'all') {
            ekran1.html('');
            ekran2.html('');
            reset();

        } else if (options === 'entry') {
            ekran2.html('');
        }
    }

    function backspace() {
        let currentInput = ekran2.html();
        ekran2.html(`${currentInput.substring(0, currentInput.length -1)}`);
    }

    function plusMinus() {

        let currentInput = Number(ekran2.html());
        ekran2.html(`${currentInput * -1}`);
    }

    function defaultOperation(operation) {

        if (ekran2.html().length >= 1) {
            lastOperationClick = true;
            let currentNumber = Number(ekran2.html());
            printEkran1(currentNumber, printChar[operation]);

            allInputs.push(currentNumber);
            if (allInputs.length === 3) {
                equal(function(rez) {
                    ekran2.html(rez);
                });

            }
            allInputs.push(operation);
        }
    }

    function equal(callback) {
        let rez = 0;
        switch (allInputs[1]) {
            case 'addition':
                rez = addition(allInputs[0], allInputs[2]);
                break;
            case 'subtraction':
                rez = subtraction(allInputs[0], allInputs[2]);
                break;
            case 'multiplication':
                rez = multiplication(allInputs[0], allInputs[2]);
                break;
            case 'division':
                rez = division(allInputs[0], allInputs[2]);
                break

        }

        allInputs = [];
        allInputs.push(rez);
        callback(rez);
    }

    function addition(num1, num2) {

        return Number(num1) + Number(num2);
    }

    function subtraction(num1, num2) {

        return Number(num1) - Number(num2);
    }

    function multiplication(num1, num2) {

        return Number(num1) * Number(num2);
    }

    function division(num1, num2) {

        return Number(num1) / Number(num2);
    }


    function reset() {

        ekran1.html('');
        allInputs = [];
        lastOperationClick = true;
    }

    function addPoint() {
        let = currentInput = ekran2.html();
        if (!currentInput.includes('.')) {

            ekran2.html(`${ekran2.html()}.`)
        }
    }

    function getKey() {
        for (let i = 0; i < Object.keys(printChar).length; i++) {
            console.log(Object.keys(printChar)[i]);
            if (Object.keys(printChar)[i] === 'equal') {
			console.log(printChar(Object.keys(printChar)[i]));
            		                                                              //JSON
        }

        
    }
}
});