window.onload = () => {
	// fetchCurrency();
	setupEventHandlers();
}

const setupEventHandlers = () => {
	const searchButton = document.querySelector('#search-button');
	searchButton.addEventListener('click', handleCurrencyValue);
}

const handleCurrencyValue = () => {
	const currencyInput = document.querySelector('#currency-input');
	fetchCurrency(currencyInput.value);
	currencyInput.value = '';
}

const renderBaseCurrency = (base) => {
	const titleBase = document.querySelector('#base')
	titleBase.innerText = `Valores referentes a 1 ${base}`
}

const fetchCurrency = (currency) => {
	fetch(`https://api.exchangerate.host/latest?base=${currency}`)
		.then((response) => (response.json()))
		.then((response) => {
			renderBaseCurrency(response.base)
			renderRates(response.rates)
		});
}

const renderRates = (ratesObject) => {
	const ratesList = document.querySelector('#currency-list');
	clearList(ratesList);
	for (const currency in ratesObject) {
		const rateItem = document.createElement('li');
		const rate = ratesObject[currency];
		rateItem.innerHTML = `<b>${currency}:</b> ${rate.toFixed(2)}`;
		ratesList.appendChild(rateItem);
	}
}

const clearList = (list) => {
	list.innerHTML = '';
}

