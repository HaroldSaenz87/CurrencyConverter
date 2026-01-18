const converterForm = document.getElementById("converter-form");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const result = document.getElementById("result");

window.addEventListener("load", fetchCurrency);

converterForm.addEventListener("submit", convertCurrency);

async function fetchCurrency(){
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    const data = await response.json();

    const currecyLists = Object.keys(data.rates);

    currecyLists.forEach(currency => {

        const option1 = document.createElement("option")
        option1.value= currency;
        option1.textContent = currency;
        fromCurrency.appendChild(option1);

        const option2 = document.createElement("option")
        option2.value= currency;
        option2.textContent = currency;
        toCurrency.appendChild(option2);
    })
}

async function convertCurrency(e){

    e.preventDefault();

    const amount = parseFloat(amountInput.value);
    const fromCurrencyVal = fromCurrency.value;
    const toCurrencyVal = toCurrency.value;

    if (amount < 0) {
        alert("Please enter a valid amount");
        return;        
    }

    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrencyVal}`);
    const data = await response.json();

    const rate = data.rates[toCurrencyVal];

    const convertedAmount = (amount * rate).toFixed(2);

    result.textContent = `${amount} ${fromCurrencyVal} = ${convertedAmount} ${toCurrencyVal}`;
}