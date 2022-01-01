/* Constantes */
const daily = document.getElementById('daily');
const weekly = document.getElementById('weekly');
const monthly = document.getElementById('monthly');
const cardBox = document.querySelectorAll('.card-box');
const hrs = document.querySelectorAll('.card__main-number');
const last = document.querySelectorAll('.card__main-last');

/* Solicitar datos JSON en función asíncrona */
async function requestData() {
  const response = await fetch('./data.json');
  const data = await response.json();

  /* daily listener */
  daily.addEventListener('click', (event) => {
    cardBox.forEach((element) => {
      /* Iterando a través de todas las card-boxs */
      for (let i = 0; i < data.length; i++) {
        hrs[i].textContent =
          data[i].timeframes.daily.current +
          (data[i].timeframes.daily.current > 1 ? 'hrs' : 'hr');
        last[i].textContent =
          'Yesterday - ' +
          data[i].timeframes.daily.previous +
          (data[i].timeframes.daily.previous > 1 ? 'hrs' : 'hr');
      }
    });
    changeActive(daily, weekly, monthly);
    event.preventDefault();
  });

  /* weekly listener */
  weekly.addEventListener('click', (event) => {
    cardBox.forEach((element) => {
      /* Iterando a través de todas las card-boxs */
      for (let i = 0; i < data.length; i++) {
        /* Iteración a través de todos los objetos de los datos JSON */
        hrs[i].textContent = data[i].timeframes.weekly.current + 'hrs';
        last[i].textContent =
          'Last Week - ' + data[i].timeframes.weekly.previous + 'hrs';
      }
    });
    changeActive(weekly, monthly, daily);
    event.preventDefault();
  });

  /* monthly listener */
  monthly.addEventListener('click', (event) => {
    cardBox.forEach((element) => {
      /* iterando a través de todas las card-boxs */
      for (let i = 0; i < data.length; i++) {
        /* Iteración a través de todos los objetos de los datos JSON */
        hrs[i].textContent = data[i].timeframes.monthly.current + 'hrs';
        last[i].textContent =
          'Last Month - ' + data[i].timeframes.monthly.previous + 'hrs';
      }
    });
    changeActive(monthly, weekly, daily);
    event.preventDefault();
  });
}

requestData(); /* Función de llamada para análisis de datos JSON */

/* Función que elimina la clase activa con texto de color blanco */
function changeActive(element, previousActive1, previousActive2) {
  previousActive1.classList.remove('active');
  previousActive2.classList.remove('active');
  element.classList.add('active');
}
