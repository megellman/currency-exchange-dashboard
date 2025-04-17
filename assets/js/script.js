let currencyForm = document.querySelector('#currency-form');
let apiKey = '584b93e1a2a3f8d7ca80cffe';
let currencyDisplay = document.querySelector('#currency-rate-display');
let saveBtn = document.querySelector('#save-btn');

currencyForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let val_1 = document.querySelector('#currency-val_1').value;
    let val_2El = document.querySelector('#currency-val_2');

    // take currency_1 and concocenate that with GET request 
    let currency_1 = document.getElementById('currency_1').value;
    getConversion(val_1, val_2El, currency_1);
})


async function getConversion(val_1, val_2El, currency_1) {
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency_1}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);

        // take the currency_2 and find the matching key and it's corresponding value in "conversion_rates", let conversionRate = this value
        let currency_2 = document.querySelector('#currency_2').value
        let conversionRate = json.conversion_rates[currency_2];

        // take currency-val_1 and multiply it by conversionRate--- let this = val_2El
        let val_2 = val_1 * conversionRate;

        // update currency-val_2 form element with val_2
        val_2El.textContent = val_2;

        // update currency display 
        currencyDisplay.textContent = `${val_1} ${currency_1} = ${val_2} ${currency_2}`

        // saveBtn display toggle ON
        saveBtn.setAttribute('style', 'display:inline-block');
    } catch (error) {
        console.error(error.message);
    }
}