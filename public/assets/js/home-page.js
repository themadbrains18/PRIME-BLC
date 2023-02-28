"use stict";

/* Header Sticky Js Code */
let header = document.querySelector("header");
let oldValue = 0;
window.addEventListener("scroll", () => {
    if (window.scrollY > oldValue) {
        oldValue = window.scrollY;
        header.classList.remove("active")
    }
    else {
        oldValue = window.scrollY;
        header.classList.add("active")
    }
});

let AppIcon = document.querySelectorAll(".download__app__icon");
for (let i of AppIcon) {
    let mouseenter = function () {
        i.classList.toggle("active")
    }
    i.addEventListener("mouseout", () => {
        mouseenter();
    })

    i.addEventListener("mouseover", () => {
        mouseenter();
    })
}

/* Tabs Js Code */
let tabsBtn = document.querySelectorAll(".update__trending__coin__tabs .tab__btn");
let tabsContent = document.querySelectorAll(".update__trending__coin__tabs .tabs__content");
let BtnPerent = document.querySelector(".update__trending__coin__tabs .tabs__button");
let BtnWidth = BtnPerent.clientWidth;
tabsBtn.forEach((element, index) => {
    element.addEventListener("click", () => {
        for (let i of tabsBtn) {
            i.classList.remove("active")
        }
        for (let i of tabsContent) {
            i.classList.remove("active")
        }
        element.classList.add("active");
        tabsContent[index].classList.add("active");
        /* Tabs Bottom Line Js Code */
        let tabsBtnactive = document.querySelector(".update__trending__coin__tabs .tab__btn.active");
        let TabsBottomLine = document.querySelector(".tabs__bottom__line");
        let widhBtn = tabsBtnactive.clientWidth;
        domRect = tabsBtnactive.getBoundingClientRect();
        TabsBottomLine.setAttribute("style", (`width:${(widhBtn)}px;left:${(domRect.x)}px;`))
    })

    /* Active Bottom line active Js Code */
    let tabsBtnactive = document.querySelector(".update__trending__coin__tabs .tab__btn.active");
    let TabsBottomLine = document.querySelector(".tabs__bottom__line");
    let widhBtn = tabsBtnactive.clientWidth;
    domRect = tabsBtnactive.getBoundingClientRect();
    TabsBottomLine.setAttribute("style", (`width:${(widhBtn)}px;left:${(domRect.x)}px;`))
})

/* Animate Banner Text With Js */
let HeroTxt = document.querySelector(".hero__sec .sec__heading");
setTimeout(function () {
    HeroTxt.classList.add("active")
}, 3750);

document.querySelector(".hero__sec .sec__heading").animate([
    { width: '0', overflow: `hidden`, },
    { width: '150%', overflow: `visible`, }
], {
    // timing options
    duration: 8000,
});


var swiperMedia = new Swiper(".media__slider", {
    slidesPerView: 3,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
/* Slider JS Code */
var swiper = new Swiper(".trending__coin__slider", {
    slidesPerView: 4,
    spaceBetween: 20,
    slidesPerGroup: 4,
    loop: true,
    loopFillGroupWithBlank: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


