(function lg() {
    const cWM = getCookie('webmaster_id')
    const cClickId = getCookie('click_id')
    const cUtmSource = getCookie('utm_source')

    if(cWM && cClickId && cUtmSource){
        // Если куки загружены
        let lgUrl = `&utm_source=${cUtmSource}&webmaster_id=${cWM}&click_id=${cClickId}`

        let linkFirstTime = document.querySelector('#linkFirstTime')
        linkFirstTime.addEventListener('click',function (e) {
            e.preventDefault()
            window.location.replace(linkFirstTime.href += lgUrl);
        })

        let bottomCalcLink = document.querySelector('#bottomCalcLink')
        bottomCalcLink.addEventListener('click',function (e) {
            e.preventDefault()
            window.location.replace(bottomCalcLink.href += lgUrl);
        })
    }
})()

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
}
