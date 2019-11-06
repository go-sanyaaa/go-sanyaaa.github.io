(function() {
  const modal = () =>  document.querySelector('.modal-form');
  const authForm = () => document.querySelector('.auth-form');
  const recoveryForm = () => document.querySelector('.recovery-form');
  const formCloseBts = () => document.querySelectorAll('.modal-form__close');
  const status = () => document.querySelector('.modal-form__status');
  const resetButton = () => document.querySelector('.modal-form__reset-link');

  const forms = {
    recovery: {
      form: document.querySelector('.recovery-form'),
      status: document.querySelector('.recovery-form .modal-form__status'),
      error: document.querySelector('.recovery-form .modal-form__error'),
    },
    auth: {
      form: document.querySelector('.auth-form'),
      status: document.querySelector('.auth-form .modal-form__status'),
      error: document.querySelector('.auth-form .modal-form__error'),
    },
    recoveryConfirm: {
      form: document.querySelector('.recovery-confirm-form'),
      status: document.querySelector('.recovery-confirm-form .modal-form__status'),
      error: document.querySelector('.recovery-confirm-form .modal-form__error'),
    },
    success: {
      form: document.querySelector('.success-form'),
    },
  }

  const api = {
    post: function (url,body) {
        let headers = new Headers()
        headers.append('Content-Type', 'application/json;charset=utf-8')
        return fetch(url, {
          method: 'POST',
          headers,
          body,
        }).then(
            response => response.json()
                .then(body => ({status: response.status, body: body})))
    }
  }

  const state = {
    modal: {
      toggle: function () {
        modal().classList.toggle('modal-form--active');
        this.state = !this.state;
      },
      state: false
    },
  };

  function hide(element){
    element.style.display = 'none'
  }

  function show(element){
    element.style.display = 'flex'
  }


  modal().addEventListener('click', (event) => {
    if (event.target === modal()) state.modal.toggle();
  });


  formCloseBts().forEach((closeBtn)=>{
    closeBtn.addEventListener('click', (event) => {
      show(forms.auth.form)
      hide(forms.recovery.form)
      hide(forms.recoveryConfirm.form)
      hide(forms.success.form)
      state.modal.toggle()
    });
  })

  document.getElementById('loginbutton').addEventListener('click', () => state.modal.toggle());

  const data = (form) => {
    let _data = [];
    new FormData(form).forEach((e, i) => (_data.push(e)));
    return _data;
  };

  authForm().addEventListener('submit', (e) => {
    e.preventDefault();
    hide(forms.auth.status);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    fetch(authForm().action, {
      method: 'post',
      headers,
      body: JSON.stringify(data(authForm())),
    })
        .then(
            response => response.json()
              .then(body => ({status: response.status, body: body})))
        .then(obj => {
          if (obj.status === 200) {
            if (obj.body.status) {
              window.location.href = 'https://finza.ru/main/client/overview.shtml';
            } else {
              show(forms.auth.status);
            }
          } else {
            show(forms.auth.status);
          }
        })
  });

  resetButton().addEventListener('click',() => {
    hide(forms.auth.form)
    show(forms.recovery.form)
  });

  forms.recovery.form.addEventListener('submit',(event) => {
    event.preventDefault();
    hide(forms.recovery.status)
    api.post(forms.recovery.form.action, data(recoveryForm())[0])
        .then(resp => {
          if(resp.body.status){
            hide(forms.recovery.form)
            show(forms.recoveryConfirm.form)
          }
          forms.recovery.error.innerHTML = resp.body.error
          show(forms.recovery.status)
        })
  });

  forms.recoveryConfirm.form.addEventListener('submit', (event) => {
    event.preventDefault()
    hide(forms.recoveryConfirm.status)
    let code = forms.recoveryConfirm.form.querySelector('input[name="code"]').value
    let newPassword1 = forms.recoveryConfirm.form.querySelector('input[name="newPassword1"]').value
    let newPassword2 = forms.recoveryConfirm.form.querySelector('input[name="newPassword2"]').value
    if(newPassword1 !== newPassword2){
      forms.recoveryConfirm.error.innerHTML = 'Пароли не совпадают'
      show(forms.recoveryConfirm.status)
      return false
    }
    const body = {
      code, newPassword1, newPassword2
    }
    api.post(forms.recoveryConfirm.form.action, JSON.stringify(body))
        .then(resp => {
          if(resp.body.status){
            hide(forms.recoveryConfirm.form)
            show(forms.success.form)
          }
          forms.recoveryConfirm.error.innerHTML = resp.body.error
          show(forms.recoveryConfirm.status)
        })
  })

  forms.success.form.addEventListener('submit',function (event) {
    event.preventDefault()
    hide(forms.success.form)
    show(forms.auth.form)
  })

})();