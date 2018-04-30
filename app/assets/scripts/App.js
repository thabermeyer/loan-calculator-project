// Listen for submit

document.querySelector('.calculator__btn-calc').addEventListener('click', (e) => {

    // Hide resulsts

    document.querySelector('.results').style.display = 'none';

    // Show loader

    document.querySelector('.loader').classList.add('loader--visible');

    setTimeout(calculateResults, 1000);

    e.preventDefault();

});

function calculateResults(e) {

    // UI Variables

    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');

    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payments

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if(isFinite(monthly)) {

        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        // Show results

        document.querySelector('.results').style.display = 'block';

        // Hide loader

        document.querySelector('.loader').classList.remove('loader--visible');

        // Add clear button

        const calcBtn = document.querySelector('.calculator__btn');

        const clearBtn = document.createElement('button');
        clearBtn.className = 'calculator__btn calculator__btn-clear';
        clearBtn.appendChild(document.createTextNode('Clear'));
        calcBtn.parentNode.insertBefore(clearBtn, calcBtn.nextSibling);

    } else {

        showError('Unable to calculate. Please check all fields.');

    }

}

// Show error

function showError(error) {

    // Hide results

    document.querySelector('.results').style.display = 'none';

    // Hide loader

    document.querySelector('.loader').classList.remove('loader--visible');

    // Create div

    const errorDiv = document.createElement('div');

    // Get elements

    const calculator = document.querySelector('.calculator');
    const header = document.querySelector('.header');

    // Add class

    errorDiv.className = 'alert alert--danger';

    // Create text node and append to div

    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading

    calculator.insertBefore(errorDiv, header);

    // Clear error after a few seconds

    setTimeout(() => {

        document.querySelector('.alert').remove();

    }, 3000);

}