(function() {

  const btPlus = document.querySelector('.bottomCalc.plus');
  const btMinus = document.querySelector('.bottomCalc.minus');
  const total = document.querySelector('#bottomCalcValue');
  const date = document.querySelector('#bottomCalcDate');
  const calcLink = document.querySelector('#bottomCalcLink');
  calcLink.href = 'https://finza.ru/main/anketa/?initialDays=7&initialSum=5000';
  let minDate = new Date();
  minDate.setDate(minDate.getDate() + 7);
  let maxDate = new Date();
  maxDate.setDate(minDate.getDate() + 30);



  let calendar = flatpickr('#bottomCalcDateBlock', {
    defaultDate: minDate,
    enableTime: false,
    dateFormat: 'd.m.Y',
    minDate: minDate,
    maxDate: maxDate,
    'locale': 'ru',
    disableMobile: "true",
    onChange: function(selectedDates, dateStr, instance) {
      date.innerHTML = dateStr;
      let selectedDate = flatpickr.parseDate(dateStr, 'd.m.Y');
      date.dataset.date = Math.round(Math.abs((selectedDate - new Date()) / (24 * 60 * 60 * 1000)));
      update();
    },
  });

  // date.innerHTML = calendar.formatDate(calendar.now, 'd.m.Y');

  date.dataset.date = 12;

  btPlus.addEventListener('click', () => sum());
  btMinus.addEventListener('click', () => minus());

  function sum() {
    let current = parseInt(total.dataset.value);
    let next = current + 500;
    updateAfterCalc(next, current);
  }

  function minus() {
    let current = parseInt(total.dataset.value);
    let next = current - 500;
    updateAfterCalc(next, current);
  }

  function updateAfterCalc(next, current) {
    total.dataset.value = (next <= 5000 && next >= 1000) ? next : current;
    update();
  }

  function update() {
    let sum = total.dataset.value;
    let days = date.dataset.date;
    total.innerHTML = sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    calcLink.href = 'https://finza.ru/main/anketa/?initialDays=' + days + '&initialSum=' + sum;
  }

  setTimeout(function() {[...document.querySelectorAll('.noUi-handle.noUi-handle-lower')].forEach(function(item) {
    console.log('load');
    date.innerHTML = document.querySelector('.calc__value_name_date').innerHTML;
    item.addEventListener('click', function() {
      date.innerHTML = document.querySelector('.calc__value_name_date').innerHTML;
      update() ;
    });
  }); }, 2000);

})();