let themeToggle = document.getElementById(`theme-toggle`);
let html = document.documentElement;

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

let url = new URLSearchParams(window.location.search);

let query = url.get(`name`);

fetch(`https://restcountries.com/v3.1/name/${query}`)
    .then((data) => {
        return data.json()
    }).then((country) => {
        console.log(country[0]);
    });
