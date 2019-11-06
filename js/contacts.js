(function() {
  Inputmask("+7(999)-999-99-99").mask(document.querySelector('.form__phone'));
  const form = () => document.querySelector('.feedback__form');
  let modal = () => document.querySelector('.modal__status');
  let modalCloseBt = () => document.querySelector('.modal__status__close');
  let modalTitle = () => document.querySelector('.modal__status__headline');
  let modalMessage = () => document.querySelector('.modal__status__message');
  const data = (form) => {
    let _data = [];
    new FormData(form).forEach((e, i) => (_data[i] = e));
    return _data;
  };

  modalCloseBt().addEventListener('click', () => {
    modal().classList.add('active');
  })

  form().addEventListener('submit', (e) => {
    e.preventDefault();
    const dataForm = data(form());
    let body = {
      'clbvid': '5cf8f318ca11533273cf6b88',
      'feedback': {
        'client_id': 12708,
        'company': '',
        'custom_fields': {},
        'email': dataForm['email'],
        'form_name': 'feedbackForm',
        'message': dataForm['comments'],
        'name': dataForm['name'],
        'number': null,
        'page': '/contacts.html',
        'phone': dataForm['phone'],
        'session_id': 428547775,
      },
      'gaclid': null,
      'version': '1534328280',
      'ymclid': null,
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // console.log(JSON.stringify(data(form())));
    fetch(form().action, {
      method: 'post',
      headers,
      body: JSON.stringify(body),
    }).then(() => {
      modalTitle().innerHTML = 'Успешно!'
      modalMessage().innerHTML = 'Ваше заявка отправлена'
      modal().classList.remove('active');
      // if(response.status === 200) {
      //   return response.json();
      // }
    })
    // .catch(alert('CORS'));
  });
})();