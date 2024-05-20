// Elements
let themeToggle = document.getElementById(`theme-toggle`);
let html = document.documentElement;
let template = document.getElementById(`template`);
let countriesList = document.getElementById(`countries-list`)

if (localStorage.getItem(`theme`)) {
    html.dataset.theme = localStorage.getItem(`theme`);
    themeToggle.checked = html.dataset.theme == `dracula` ? true : false;
}

themeToggle.addEventListener(`input`, () => {
    html.setAttribute(`data-theme`,
        html.dataset.theme == `winter` ? `dracula` : `winter`
    );
    localStorage.setItem(`theme`, html.dataset.theme);
})

let updateUI = (countries) => {
    countries.forEach(country => {
        let {
            flags: { png },
            name: { common },
            population,
            capital,
            region,
        } = country;

        let clone = document.querySelector(`template`);
        let card = clone.content.cloneNode(true);

        let link = card.getElementById(`card-link`);
        let img = card.querySelector(`img`);
        let name = card.querySelector(`h2`)
        let populate = card.getElementById(`population`);
        let Region = card.getElementById(`region`);
        let Capital = card.getElementById(`capital`);

        img.src = png;
        img.setAttribute(`style`, `width: 264px; height: 160px`);
        name.textContent = common;
        populate.textContent = population.toLocaleString();
        Capital.textContent = capital;
        Region.textContent = region;
        link.href = `./card.html?name=${common}`;

        countriesList.append(card);
    });
}

fetch(`https://restcountries.com/v3.1/all`)
    .then((data) => {
        return data.json();
    })
    .then((countries) => {
        updateUI(countries);
    });