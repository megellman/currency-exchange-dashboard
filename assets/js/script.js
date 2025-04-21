let currencyForm = document.querySelector('#currency-form');
let apiKey = '584b93e1a2a3f8d7ca80cffe';
let currencyDisplay = document.querySelector('#currency-rate-display');
let saveBtn = document.querySelector('#save-btn');
let dashboardBody = document.querySelector('#dashboard-body');
let table = document.querySelector('#exchange-rate-dashboard');
let switchBtn = document.querySelector('#switch-btn');

let isTableHidden = true;

currencyForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let val_1 = document.querySelector('#currency-val_1').value;
    let currency_2El = document.querySelector('#currency-val_2');

    // take currency_1 and concocenate that with GET request 
    let currency_1 = document.getElementById('currency_1').value;
    getConversion(val_1, currency_2El, currency_1);
})


async function getConversion(val_1, currency_2El, currency_1) {
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency_1}`;
    try {
        const response = await fetch(url);
        console.log('fetch called')
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);

        // take the currency_2 and find the matching key and it's corresponding value in "conversion_rates", let conversionRate = this value
        let currency_2 = document.querySelector('#currency_2').value;
        let conversionRate = json.conversion_rates[currency_2];

        // take currency-val_1 and multiply it by conversionRate--- let this = currency_2El
        let val_2 = (val_1 * conversionRate).toFixed(2); // rounding nearest 2 decimal

        // update currency-val_2 form element with val_2
        currency_2El.textContent = val_2;

        // update currency display 
        currencyDisplay.textContent = `Current Rate: 1 ${currency_1} = ${conversionRate} ${currency_2}`

        // saveBtn display toggle ON
        saveBtn.setAttribute('style', 'display:inline');
    } catch (error) {
        console.error(error.message);
    }
}
saveBtn.addEventListener('click', () => {
    console.log("saveData was triggered")
    let currency_1 = document.getElementById('currency_1').value;
    let currency_2 = document.getElementById('currency_2').value;

    let currencyData = {
        currency1: currency_1,
        currency2: currency_2
    }

    if (!(localStorage.getItem('dashboardData'))) {
        console.log('no localStorage yet')
        let dashboardData = [];
        dashboardData.push(currencyData);
        localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    } else {
        dashboardData = JSON.parse(localStorage.getItem('dashboardData'));
        console.log(dashboardData.length);
        // only have a max of 5 saved currencies
        if(dashboardData.length >= 5) dashboardData.shift();
        dashboardData.push(currencyData);
        localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    }

    if (isTableHidden) {
        table.setAttribute('style', 'visibility:visible');
        isTableHidden = false;
    } else {
        // clear the table to ensure we're not putting duplicate data in
        while (dashboardBody.firstChild) {
            dashboardBody.removeChild(dashboardBody.firstChild);
        }
    }
    loadTableData();
})

// click on saved currency comparisons to load them on the form
dashboardBody.addEventListener('click', function (e) {
    e.stopPropagation();
    
    // stops delete button from triggering this function
    if(e.target.textContent === 'Delete') return; 

    let currency_1 = e.target.parentNode.children[0].textContent;
    let currency_2 = e.target.parentNode.children[1].textContent;

    document.getElementById('currency_1').value = currency_1;
    $('#currency_1').trigger('change');
    document.getElementById('currency_2').value = currency_2;
    $('#currency_2').trigger('change');

    document.querySelector('#currency-val_1').setAttribute('placeholder', 0);
    document.querySelector('#currency-val_2').textContent = 0;
    document.querySelector('#currency-rate-display').textContent = 'Current Rate: ';
})

function deleteRow(e) {
    console.log('deleteRow function called')
    e.target.parentNode.parentNode.remove();
    let dashboardData = JSON.parse(localStorage.getItem('dashboardData'));
    let currentRow = {
        currency1: e.target.parentNode.parentNode.children[0].textContent,
        currency2: e.target.parentNode.parentNode.children[1].textContent
    };
    let index = dashboardData.findIndex(item =>
        item.currency1 === currentRow.currency1 &&
        item.currency2 === currentRow.currency2
    );

    if (index !== -1) {
        dashboardData.splice(index, 1);
        localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    }
    localStorage.setItem('dashboardData', JSON.stringify(dashboardData));

}

function loadTableData() {
    if (!(localStorage.getItem('dashboardData'))) {
        console.log('no table data');
    } else {
        table.setAttribute('style', 'visibility:visible');
        isTableHidden = false;
        dashboardData = JSON.parse(localStorage.getItem('dashboardData'));
        dashboardData.forEach((x) => {
            let tableRow = document.createElement('tr');

            let currency_1_dashboard = document.createElement('td');
            let currency_2_dashboard = document.createElement('td');
            let deleteCol = document.createElement('td');
            let deleteBtn = document.createElement('button');

            currency_1_dashboard.textContent = x['currency1'];
            currency_2_dashboard.textContent = x['currency2'];
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', deleteRow);
            deleteBtn.setAttribute('class', 'btn btn-light border border-secondary-subtle border-2');

            deleteCol.append(deleteBtn);
            tableRow.append(currency_1_dashboard);
            tableRow.append(currency_2_dashboard);
            tableRow.append(deleteCol);
            dashboardBody.append(tableRow);
        })
    }
}

// switch currency select values on btn click
switchBtn.addEventListener('click', function(e){
    e.preventDefault();
    let currency_1 = document.getElementById('currency_1').value;
    let currency_2 = document.getElementById('currency_2').value;

    document.getElementById('currency_1').value = currency_2;
    document.getElementById('currency_2').value = currency_1;

    // if form was already filled out, this ensures val 2 is blank and form can be immediately resubmitted with swapped info
    document.querySelector('#currency-val_2').textContent = 0;
})

loadTableData();

// currency dropdown search
$(document).ready(function() {
    $('#currency_1').select2({
      placeholder: "Select a currency",
      allowClear: true
    });

    $('#currency_2').select2({
      placeholder: "Select a currency",
      allowClear: true
    });
  });