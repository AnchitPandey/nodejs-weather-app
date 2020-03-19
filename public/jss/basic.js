console.log('Client side javascript loaded');

urlToFetch = '/weather?address='

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const errorPara = document.querySelector('#errorPara');
const dataPara = document.querySelector('#dataPara');



errorPara.textContent = 'This para displays error'
dataPara.textContent = 'This para displays data'


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;
    console.log('testing!');
    dataPara.textContent = 'Loading ...'
    fetch(urlToFetch + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log('error that I got is', data.error);
                errorPara.textContent = data.error;
                dataPara.textContent = ''
            }
            else {

                const summ = data.summary;
                const temp = data.temperature;
                const finalData = summ + ' ' + temp;
                dataPara.textContent = finalData;
                errorPara.textContent = '';

            }
        })
    })
})

/*
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) =>
        console.log (data)   
        )
})
*/