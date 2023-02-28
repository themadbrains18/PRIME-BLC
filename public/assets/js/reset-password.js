"use stict";
/* Form Tabs Tabs */
let tabs = document.querySelectorAll(".form__tab__btn");
for (let i in tabs) {
    if (tabs.length >= i) {
        tabs[i].setAttribute("value", i);
        tabs[i].addEventListener("click", () => {
            let activeTab = document.querySelector(".form__tab__btn.active");
            if (activeTab) {
                activeTab.classList.remove("active");
            }
            tabs[i].classList.add("active");
            let tabSelected = tabs[i].getAttribute("value");
            let tabsImg = document.querySelectorAll(`.form__tabs`);
            let tabsImgActive = document.querySelector(`.form__tabs.active`);
            if (tabsImgActive) {
                tabsImgActive.classList.remove("active");
            }
            tabsImg[tabSelected].classList.add("active");
        });
    }
}
/* Input Password */
let ShowPassword = document.querySelectorAll(".show__password");
let PasswordInput = document.querySelectorAll(".password__input");
for (let i of ShowPassword) {
    i.addEventListener("click", () => {
        i.classList.toggle("active")
        for (let j of PasswordInput) {
            j.type = "password";
            if (i.classList.contains("active")) {
                j.type = "text";
            }
        }

    })
}

/* DropDown  Countary Code Js */
let CountaryCOdeBtn = document.querySelectorAll(".form__tabs__wrapper .dropdown");
let CountaryCOde = document.querySelectorAll(".form__tabs__wrapper .number__dropdown");
let CountaryCOdeInnerText = document.querySelector(".form__tabs__wrapper .dropdown .dropdown__btn span");
for (let i of CountaryCOdeBtn) {
    i.addEventListener("click", () => {
        for (let j of CountaryCOde) {
            j.classList.toggle("active")
        }
    })
}
/* Countary Dropdown Inner Item */
let Countary = document.querySelectorAll(".form__tabs__wrapper .countery");
for (let i of Countary) {
    i.addEventListener("click", () => {
        for (let j of Countary) {
            j.classList.remove("active")
        }
        i.classList.add("active")
        let CountaryNumberactiveInner = i.querySelector(".form__tabs__wrapper .countery.active .number");
        CountaryCOdeInnerText.innerHTML = CountaryNumberactiveInner.innerHTML;

    })
}
