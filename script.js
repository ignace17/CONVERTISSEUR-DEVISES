const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const convertBtn = document.getElementById('convertBtn');
const resultBox = document.getElementById('exchangeRate');

// Liste des devises principales
const currencies = ['USD', 'EUR', 'XOF', 'GBP', 'CAD', 'JPY', 'CNY'];

// Remplissage des listes
currencies.forEach(currency => {
    let option1 = document.createElement('option');
    option1.value = currency;
    option1.text = currency;
    fromCurrency.add(option1);

    let option2 = document.createElement('option');
    option2.value = currency;
    option2.text = currency;
    toCurrency.add(option2);
});

fromCurrency.value = 'EUR';
toCurrency.value = 'XOF';

convertBtn.addEventListener('click', () => {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const val = amount.value;
    const apiKey = 'a53b2983653897db48d1a23f'; 

    resultBox.innerText = "Chargement...";

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${val}`)
        .then(response => response.json())
        .then(data => {
            if(data.result === "success") {
                const res = data.conversion_result;
                resultBox.innerText = `${val} ${from} = ${res.toLocaleString()} ${to}`;
            } else {
                resultBox.innerText = "Erreur de clé API";
            }
        })
        .catch(() => {
            resultBox.innerText = "Erreur réseau";
        });
});