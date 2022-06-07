
let country = document.querySelector('.country');
let input = document.querySelector('input');
let form = document.querySelector('form');

function getCountry(url) {
    fetch(`https://restcountries.com/v2/name/${url}`)
    .then((res) => res.json())
    .then((data) => {
        country.classList.remove('error');
        let {name, languages, region, population, flag, currencies, capital} = data[0];

        country.innerHTML = `
        <img src="${flag}" alt="flag">
        <div class="country-info">
            <p>Страна : <b>${name}</b></p>
            <p>Столица : <b>${capital}</b></p>
            <p>Регион : <b>${region}</b></p>
            <p>Население : <b>${(population / 1000000).toFixed(1)} M человек</b></p>
            <p>Валюта : <b>${currencies[0].name}</b></p>
            <p>Родной Язык :<b> ${languages[0].name}</b></p>
        </div>
        `
        input.value = '';

    })
    .catch(()=> {
        if (input.value == '') {
            country.innerHTML = '<h3>Поле не должно быть пустым !</h3>';
        }else {
            country.innerHTML = '<h3>Пожалуйста, введите страну правильно !</h3>';
        }
        setTimeout(() => {
            country.innerHTML = '';
        }, 3000);
        country.classList.add('error');
        input.value = '';
    });
}



form.addEventListener('submit',function(e) {
    e.preventDefault();
    getCountry(input.value);
});