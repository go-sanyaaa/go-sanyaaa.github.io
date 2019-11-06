(function readCookie() {
    let url_string = window.location.href
    const url = new URL(url_string)
    let wm = url.searchParams.get('webmaster_id')
    let clickId = url.searchParams.get('click_id')
    let utmSource = url.searchParams.get('utm_source')

    if(wm && clickId){
        // Обновляем куки
        deleteCookie('webmaster_id')
        deleteCookie('utm_source')
        deleteCookie('click_id')
        setCookie('webmaster_id', wm,{expires:3600*24*30})
        setCookie('utm_source', utmSource,{expires:3600*24*30})
        setCookie('click_id', clickId,{expires:3600*24*30})
    }
})();

(function cookieConsent() {
  let cookieConsent = getCookie('cookie_consent');

  if(!cookieConsent){
    setCookie('cookie_consent', '0',{expires:3600*24*30});
    cookieConsent = getCookie('cookie_consent');
  }

  let banner = document.createElement('div');
  banner.className = "cookie-banner";
  banner.id = 'cookie-banner'
  banner.innerHTML = `
    <p class="cookie-banner__text">Мы <a href="/cookie.html">используем cookie</a> для персонализации сервисов и удобства пользователей. Мы серьезно относимся к защите персональных данных — ознакомьтесь с <a href="/cookie.html">условиями и принципами их обработки</a>.
    Вы можете запретить сохранение cookie в настройках своего браузера.</p>
    <span class="cookie-banner__close">
      <svg class="close-button__3wV_D" xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 14 14" height="9px" width="9px">
        <g fill="none" fill-rule="nonzero" stroke="#979797"><path d="M0 0l14 14M14 0L0 14"></path></g>
      </svg>
    </span>
    <button class="cookie-banner__btn">Все понятно</button>
  `;

  document.body.prepend(banner)

  const btn = banner.querySelector('button');
  const closeBtn = banner.querySelector('.cookie-banner__close');

  [btn, closeBtn].forEach(element => {
    element.addEventListener('click', handleClick)
  });

  function handleClick() {
    setCookie('cookie_consent', '1');
    banner.classList.toggle('cookie-banner--hide')
  }

  if(cookieConsent === '1' || !cookieConsent){
    banner.classList.toggle('cookie-banner--hide')
  }
})();

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ))
  return matches ? decodeURIComponent(matches[1]) : undefined
}

function setCookie(name, value, props = {expires:3600*24*30}) {
    props = props || {}
    var exp = props.expires
    if (typeof exp == "number" && exp) {
        var d = new Date()
        d.setTime(d.getTime() + exp*1000)
        exp = props.expires = d
    }
    if(exp && exp.toUTCString) { props.expires = exp.toUTCString() }
    value = encodeURIComponent(value)
    var updatedCookie = name + "=" + value
    for(var propName in props){
        updatedCookie += "; " + propName
        var propValue = props[propName]
        if(propValue !== true){ updatedCookie += "=" + propValue }
    }
    document.cookie = updatedCookie
}

function deleteCookie(name) {
    setCookie(name, null, { expires: -1 })
}


const footerLists = document.querySelectorAll('#footer .footer__list')

footerLists.forEach(function (list) {
    const menuActivator = list.querySelector('.footer-list__title')

    menuActivator.addEventListener('click',function (e) {
        if(window.innerWidth > 920){
            return false
        }

        const isActive = !list.classList.contains('footer-list__wrapper--expand')

        if(isActive){
            list.classList.add('footer-list__wrapper--expand')
        }else{
            list.classList.remove('footer-list__wrapper--expand')
        }
    })
})

function toggleFooterList() {

}
