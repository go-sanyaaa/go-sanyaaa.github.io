(function () {
    const slides = document.querySelectorAll(".slider__item");
    const prevBtn = document.querySelector(".slider__controller--left");
    const nextBtn = document.querySelector(".slider__controller--right");
    const counter = document.querySelector(".slider__info-counter");

    let slides_arr = Array.prototype.slice.call(slides),
        current = 1,
        count = slides.length

    on_depth();
    prevBtn.addEventListener('click',()=>prev())
    nextBtn.addEventListener('click',()=>next())


    function on_depth() {
        slides_arr.slice(0,4)
            .map((el,i)=>{
                el.classList.toggle(`slider__item--visible`);
                el.classList.toggle(`slider__item--lvl-${i}`);
                if(i > 0) {
                    el.classList.toggle(`slider__item--in-depth`);
                }
            })
        counter.innerHTML = `<b>${current}</b> / ${count}`
    }

    function off_depth() {
        slides_arr.slice(0,4)
            .map((el,i)=>{
                el.classList.toggle(`slider__item--visible`);
                el.classList.toggle(`slider__item--lvl-${i}`);
                if(i == 0){
                    el.classList.toggle('slider__item--hiding')
                    setTimeout(function () {
                        el.classList.toggle('slider__item--hiding')
                    },400)
                }
                else if(i > 0) {
                    el.classList.toggle(`slider__item--in-depth`);
                }
            })
        counter.innerHTML = `<b>${current}</b> / ${count}`
    }

    function prev() {
        off_depth()
        slides_arr.unshift(slides_arr.pop())
        --current <= 0 ? current=count : '';
        on_depth()
    }

    function next() {
        off_depth()
        slides_arr.push(slides_arr.shift())
        ++current > count ? current=1 : '';
        on_depth()
    }
})();