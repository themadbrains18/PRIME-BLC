"use stict";
window.addEventListener("load", () => {
    let tabsDropdown = document.querySelectorAll(".order__tabs__inner__Data.tabs__dropdown");

    for (let t of tabsDropdown) {
        let parsBtn = t.querySelector(".pairs__button");
        let parsBText = t.querySelector(".pairs__button span");
        let BtnOption = t.querySelectorAll(".tabs__dropdown .dropdown__option");


        parsBtn.addEventListener("click", () => {
            parsBtn.classList.toggle("active")

        })
        for (let i of BtnOption) {
            i.addEventListener("click", () => {
                parsBText.innerHTML = i.innerHTML;
                parsBtn.classList.remove("active");

            })
        }
    }


    let tabs = document.querySelectorAll(".order__button");
    for (let i in tabs) {
        if (tabs.length >= i) {
            tabs[i].setAttribute("value", i);
            tabs[i].addEventListener("click", () => {
                let activeTab = document.querySelector(".order__button.active");
                if (activeTab) {
                    activeTab.classList.remove("active");
                }
                tabs[i].classList.add("active");
                let tabSelected = tabs[i].getAttribute("value");
                let tabsImg = document.querySelectorAll(`.order__data`);

                let tabsImgActive = document.querySelector(`.order__data.active`);
                if (tabsImgActive) {
                    tabsImgActive.classList.remove("active");
                }
                tabsImg[tabSelected].classList.add("active");
            });
        }
    }
})
let NoData = document.querySelector(".no-data");
let DataContent = document.querySelector(".order__tabs__Data~.inner__data__order");
if (DataContent) {
    NoData.setAttribute("style", "display:none");
}
let PriceBox = document.querySelectorAll(".price__box");

for (let k of PriceBox) {
    k.addEventListener("click", () => {
        for (let d of PriceBox) {
            d.classList.remove("active");
        }
        k.classList.add("active");
    })
}

/* Popup Sound Js */
let SoundBtn = document.querySelector(".notification__icon.select__sound");
let SoundPopup = document.querySelector(".sound__reminder__popup");
let ClosePopup = document.querySelector(".close__popup__btn");
let ConfirmPopup = document.querySelector(".popup__Btn .confirm__btn");
let CancelPopup = document.querySelector(".popup__Btn .cancel__btn");
let SoungBgLayer = document.querySelector(".sound__bg__layer");
let SoundBody = document.querySelector("body");

[ConfirmPopup, CancelPopup, ClosePopup, SoundBtn, SoungBgLayer].forEach((element => {
    element.addEventListener("click", () => {
        if (element == SoundBtn) {
            SoundPopup.style.display = "block";
            SoungBgLayer.classList.add("active")
            SoundBody.setAttribute("style", ("overflow:hidden"));
        }
        else {
            SoundPopup.style.display = "none";
            SoungBgLayer.classList.remove("active");
            SoundBody.setAttribute("style", ("overflow:hidden"));
        }
    });
}));

/* Margin DropDown js */
let IsolateMarginBtn = document.querySelector(".isolate__margin__btn.tabs__dropdown");
let IsolateMarginBtnOption = document.querySelectorAll(".aside__price__box .dropdown__option");
let IsolatedBText = document.querySelector(".Isolated__margin__text");
IsolateMarginBtn.addEventListener("click", () => {
    IsolateMarginBtn.classList.toggle("active")
})


for (let n of IsolateMarginBtnOption) {
    n.addEventListener("click", () => {
        IsolatedBText.innerHTML = n.innerHTML
        IsolateMarginBtn.classList.remove("active");
    })
}


let OrderBtnTabs = document.querySelectorAll(".order__margin__button");
for (let c of OrderBtnTabs) {
    c.addEventListener("click", () => {

        let OrderBtnTabsActive = document.querySelector(".order__margin__button.active");
        if (OrderBtnTabsActive) {
            OrderBtnTabsActive.classList.remove("active");
        }
        c.classList.add("active");

        document.querySelector(`.aside__price__box [value=${c.value}]`).click();
        if (document.querySelector(`.assets__overview .account__balance.active`)) {
            document.querySelector(`.assets__overview .account__balance.active`).classList.remove("active");
        }
        document.querySelector(`.assets__overview .account__balance[value=${c.value}]`).classList.add("active");

    })
}

let AsideBtn = document.querySelectorAll(".aside__tabs");
let AsideBtnDrp = document.querySelectorAll(".aside__tabs .dropdown__content .dropdown__option");


for (let i of AsideBtnDrp) {
    i.addEventListener('click', () => {
        i.closest(".aside__tabs").setAttribute('value', i.value);

    })
}
for (let i of AsideBtn) {
    i.addEventListener("click", () => {
        for (let j of AsideBtn) {
            j.classList.remove("active");
        }
        i.classList.add("active");
        document.querySelector(`.order__margin__button[value=${i.value}]`).click();
        if (i.querySelector('.dropdown__content')) {
            i.closest(".aside__price__box").querySelector(".checkbox__icon").classList.add("active");
        }
        else {
            i.closest(".aside__price__box").querySelector(".checkbox__icon").classList.remove("active");
        }
    });
}


/* Aside Tabs */


let LimitTabs = document.querySelectorAll(".limit__tabs__button");
for (let i in LimitTabs) {
    if (LimitTabs.length >= i) {
        LimitTabs[i].setAttribute("value", i);
        LimitTabs[i].addEventListener("click", () => {

            let activeTab = document.querySelector(".limit__tabs__button.active");
            if (activeTab) {
                activeTab.classList.remove("active");
            }
            LimitTabs[i].classList.add("active");
            let tabSelected = LimitTabs[i].getAttribute("value");
            let tabsImg = document.querySelectorAll(`.price__wrapper`);
            let tabsImgActive = document.querySelector(`.price__wrapper.active`);
            if (tabsImgActive) {
                tabsImgActive.classList.remove("active");
            }
            tabsImg[tabSelected].classList.add("active");
        });
    }
}

/* Checkbox Popup  Js */

let InputBox = document.querySelector(".input__box");
let AutoBorrowPopup = document.querySelector(".sound__reminder__popup.auto__borrow");
let CloseBorrowPopup = document.querySelector(".sound__reminder__popup.auto__borrow .close__popup__btn");
let EnableBorrowPopup = document.querySelector(".sound__reminder__popup.auto__borrow .popup__Btn .confirm__btn");
let CancelBorrowPopup = document.querySelector(".sound__reminder__popup.auto__borrow .popup__Btn .cancel__btn");
let BorrowPopupBgLayer = document.querySelector(".sound__bg__layer");
let Body = document.querySelector("body");
[InputBox, AutoBorrowPopup, CloseBorrowPopup, EnableBorrowPopup, CancelBorrowPopup, BorrowPopupBgLayer].forEach((element => {
    element.addEventListener("click", () => {
        if (element == InputBox) {
            if (element.classList.contains("active")) {
                InputBox.classList.remove("active");
                AutoBorrowPopup.style.display = "none";
                BorrowPopupBgLayer.classList.remove("active")
                Body.setAttribute("style", ("overflow:scroll"));
            } else {
                AutoBorrowPopup.style.display = "block";
                BorrowPopupBgLayer.classList.add("active")
                Body.setAttribute("style", ("overflow:hidden"));
            }
        }
        else if (element == EnableBorrowPopup) {
            InputBox.classList.add("active");
        }
        else {
            AutoBorrowPopup.style.display = "none";
            BorrowPopupBgLayer.classList.remove("active")
            Body.setAttribute("style", ("overflow:scroll"));
        }
    });
}));


let AsideParsBtn = document.querySelector(".aside__inner__dropdown .pairs__button__aside");
let AsideparsBText = document.querySelector(".aside__inner__dropdown .pairs__button__aside span");
let BtnoptionAside = document.querySelectorAll(".aside__inner__dropdown .dropdown__option__aside");
let StopLimitactive = document.querySelector(".price__wrapper.active");
AsideParsBtn.addEventListener("click", () => {
    AsideParsBtn.classList.toggle("active")
})
for (let i of BtnoptionAside) {
    i.addEventListener("click", () => {
        AsideparsBText.innerHTML = i.innerHTML;
        AsideParsBtn.classList.remove("active");
    })
}



/* Remove Bg Layer Dropdown Js */

let DropDownBtnBg = document.querySelectorAll(".pairs__button");
let DropDownBtnoption = document.querySelector(".isolate__margin__btn.tabs__dropdown");

let dropDownBg = document.querySelector(".dropdown__bg__layer");
for (let i of DropDownBtnBg) {
    i.addEventListener("click", () => {
        dropDownBg.classList.add("active")
    })
    dropDownBg.addEventListener("click", () => {
        i.classList.remove("active");
        dropDownBg.classList.remove("active")
    })
}


let DropDownBtnoptionAsside = document.querySelector(".pairs__button__aside");

DropDownBtnoptionAsside.addEventListener("click", () => {
    dropDownBg.classList.add("active")
})

DropDownBtnoption.addEventListener("click", () => {
    dropDownBg.classList.add("active")
})
dropDownBg.addEventListener("click", () => {
    dropDownBg.classList.remove("active")
    DropDownBtnoption.classList.remove("active")
    DropDownBtnoptionAsside.classList.remove("active")

})

let optionButtonDropDown = document.querySelectorAll(".dropdown__option");

for (let i of optionButtonDropDown) {
    i.addEventListener("click", () => {
        dropDownBg.classList.remove("active")
        console.log("remove")
    })
}

let optionButtonDropDownAside = document.querySelectorAll(".dropdown__option__aside.limit__tabs__button");
for (let i of optionButtonDropDownAside) {
    i.addEventListener("click", () => {
        dropDownBg.classList.remove("active")
        console.log("remove")
    })
}

/* Assets View js */

let AssetsView = document.querySelector(".assets__view span");
let balanceView = document.querySelectorAll(".account__balance span");
let objArr = [];
AssetsView.addEventListener("click", () => {
    if (AssetsView.classList.contains("active")) {
        AssetsView.classList.remove("active");
        balanceView.forEach((elem, index) => {
            elem.innerHTML = objArr[index].text;
        });
        objArr = [];
    } else {
        AssetsView.classList.add("active");
        balanceView.forEach((elem, index) => {
            let saveLastValue = { "text": elem.innerHTML };
            objArr.push(saveLastValue);
            elem.innerHTML = "***";
        });
    }
});
/* Header Tour Btn  Js */
const closePopup = () => {
    let tourPopup = document.querySelector(".tour__popup.active");
    if (tourPopup) {
        tourPopup.classList.remove("active");
    }
}
function assetsView() {
    closePopup();
    document.querySelector("#assetsView").classList.add("active");
}
function BuyingSelling() {
    closePopup();
    document.querySelector("#BuyingSelling").classList.add("active");
}
function SpotMargin() {
    closePopup();
    document.querySelector("#SpotMargin").classList.add("active");
}

/* History Popup Js*/

let HistoryPopupBtn = document.querySelectorAll(".history__popup__btn");
let HistoryPopup = document.querySelectorAll(".history__popup");
for (let j of HistoryPopupBtn) {
    j.addEventListener("mouseover", () => {
        for (let i of HistoryPopup) {
            i.setAttribute("style", "visibility:visible;");
        }
    })
}
for (let j of HistoryPopupBtn) {
    j.addEventListener("mouseout", () => {
        for (let i of HistoryPopup) {
            i.setAttribute("style", "visibility:hidden;");
        }
    })
}