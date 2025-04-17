let currencyForm = document.querySelector('#currency-form');
let apiKey = '584b93e1a2a3f8d7ca80cffe';
let currencyDisplay = document.querySelector('#currency-rate-display');
let saveBtn = document.querySelector('#save-btn');
let dashboardBody = document.querySelector('#dashboard-body');
let table = document.querySelector('#exchange-rate-dashboard');

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
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);

        // take the currency_2 and find the matching key and it's corresponding value in "conversion_rates", let conversionRate = this value
        let currency_2 = document.querySelector('#currency_2').value;
        let conversionRate = json.conversion_rates[currency_2];

        // take currency-val_1 and multiply it by conversionRate--- let this = currency_2El
        let val_2 = val_1 * conversionRate;

        // update currency-val_2 form element with val_2
        currency_2El.textContent = val_2;

        // update currency display 
        currencyDisplay.textContent = `1 ${currency_1} = ${val_2 * conversionRate} ${currency_2}`

        // saveBtn display toggle ON
        saveBtn.setAttribute('style', 'visibility:visible');
    } catch (error) {
        console.error(error.message);
    }
}
saveBtn.addEventListener('click', () => saveData())

dashboardBody.addEventListener('click', function (e) {
    e.stopPropagation();
    let currency_1 = e.target.parentNode.children[0].textContent;
    let currency_2 = e.target.parentNode.children[1].textContent;


    document.getElementById('currency_1').value = currency_1;
    document.getElementById('currency_2').value = currency_2;
})

function saveData() {
    console.log("saveData was triggered")
    let currency_1 = document.getElementById('currency_1').value;
    let currency_2 = document.querySelector('#currency_2').value;

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
        dashboardData.push(currencyData);
        localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    }

    if(isTableHidden){
        table.setAttribute('style', 'visibility:visible');
        isTableHidden = false;
    }

    let tableRow = document.createElement('tr');


    let currency_1_dashboard = document.createElement('td');
    let currency_2_dashboard = document.createElement('td');
    let deleteBtn = document.createElement('button');

    currency_1_dashboard.textContent = currency_1;
    currency_2_dashboard.textContent = currency_2;
    deleteBtn.textContent = 'Delete';
    deleteBtn.setAttribute('onclick', ' return this.parentNode.remove()');

    tableRow.append(currency_1_dashboard);
    tableRow.append(currency_2_dashboard);
    tableRow.append(deleteBtn);
    dashboardBody.append(tableRow);
}

