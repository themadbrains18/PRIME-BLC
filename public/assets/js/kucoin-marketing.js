// main tabs js start
let multiTabBtn = document.querySelectorAll(".multi__tab__btn");
let tabContent = document.querySelectorAll(".mainTabContent");
multiTabBtn.forEach((element, index) => {
    element.addEventListener("click", () => {
        for (let j of multiTabBtn) {
            j.classList.remove("show")
        }
        for (let k of tabContent) {
            k.classList.remove("show");
        }
        element.classList.add("show");
        tabContent[index].classList.add("show");

        // bottom active line code
        let activeBtn = document.querySelector(".multi__tab__btn.show");
        let activeLine = document.querySelector(".line-modifier");
        let widhtBtn = activeBtn.clientWidth;
        domRect = activeBtn.getBoundingClientRect();
        activeLine.setAttribute("style", (`width:${(widhtBtn)}px;left:${(domRect.x)}px;`));
    });
    // tab bottom line js start
    let activeBtn = document.querySelector(".multi__tab__btn.show");
    let activeLine = document.querySelector(".line-modifier");
    let widhtBtn = activeBtn.clientWidth;
    domRect = activeBtn.getBoundingClientRect();
    activeLine.setAttribute("style", (`width:${(widhtBtn)}px;left:${(domRect.x)}px;`));


    // tab bottom line js end
});
// main tabs js end



// inner tabs js start
let innerTabBtn = document.querySelectorAll(".innerTabButtons > .inner__tabs__btn");
let innerTabContent = document.querySelectorAll(".innerTabContent > .inner__tab__content");

innerTabBtn.forEach((element, index) => {
    element.addEventListener("click", () => {
        for (let j of innerTabBtn) {
            j.classList.remove("show")
        }
        for (let k of innerTabContent) {
            k.classList.remove("show");
        }
        element.classList.add("show");
        innerTabContent[index].classList.add("show");

        // tab bottom line js start
        let activeBtn2 = document.querySelector(".inner__tabs__btn.show");
        let activeLine2 = document.querySelector(".spot");

        
        let InnerTabsPerent = document.querySelector(".tabs__btns.innerTabButtons");
        InnerTabsPerentLeft = InnerTabsPerent.getBoundingClientRect();
        let scroledArea =  InnerTabsPerent.scrollLeft;
        
        
        domRect2 = activeBtn2.getBoundingClientRect();
        let widhtBtn2 = activeBtn2.getBoundingClientRect().width;
        activeLine2.setAttribute("style", (`width:${(widhtBtn2)}px;left:${(domRect2.x) - InnerTabsPerentLeft.x + scroledArea}px;`));
        // tab bottom line js end
    });
    let InnerTabsPerent = document.querySelector(".tabs__btns.innerTabButtons");
    InnerTabsPerentLeft = InnerTabsPerent.getBoundingClientRect();
    // tab bottom line js start
    let activeBtn2 = document.querySelector(".inner__tabs__btn.show");
    let activeLine2 = document.querySelector(".spot");
    let widhtBtn2 = activeBtn2.clientWidth;
    domRect2 = activeBtn2.getBoundingClientRect();
    activeLine2.setAttribute("style", (`width:${(widhtBtn2)}px;left:${(domRect2.x) - InnerTabsPerentLeft.x}px;`));
    // tab bottom line js end
});





// inner tabs js end




let TabsPerent = document.querySelectorAll(".inner__tab__content.tabs--perent");
for (let i of TabsPerent) {
    let coinBtn = i.querySelectorAll(".coin__btns__wrapper .coin__btn");
    let coinContent = i.querySelectorAll(".coins__tabs__content");
    coinBtn.forEach((element, index) => {
        element.addEventListener("click", () => {
            for (let j of coinBtn) {
                j.classList.remove("show")
            }
            for (let k of coinContent) {
                k.classList.remove("show");
            }
            element.classList.add("show");
            coinContent[index].classList.add("show");
        });
    });
}

// coin tabs js end


// scroll-x tabs on click js start  
let scrollArea = document.querySelector(".tabs__btns");
let prevBtn = document.querySelector(".prev__tabs");
let nextBtn = document.querySelector(".next__tabs");
nextBtn.addEventListener("click", () => {
    let scrolledp = scrollArea.scrollLeft +=20;

    if(scrolledp <= scrollArea.scrollHeight - scrollArea.scrollWidth){
        // tab bottom line js start
        activeBtn2 = document.querySelector(".inner__tabs__btn.show");
        activeLine2 = document.querySelector(".spot");

        InnerTabsPerent = document.querySelector(".tabs__btns.innerTabButtons");
        InnerTabsPerentLeft = InnerTabsPerent.getBoundingClientRect();
        
        domRect2 = activeBtn2.getBoundingClientRect();
        widhtBtn2 = activeBtn2.getBoundingClientRect().width;
        activeLine2.setAttribute("style", (`width:${(widhtBtn2)}px;left:${(domRect2.x) - InnerTabsPerentLeft.x + scrolledp}px;`));
        // tab bottom line js end
    }
});
prevBtn.addEventListener("click", () => {
        let scrolledm = scrollArea.scrollLeft -= 20;
        if(scrolledm > 0){
            // tab bottom line js start
            activeBtn2 = document.querySelector(".inner__tabs__btn.show");
            activeLine2 = document.querySelector(".spot");

            
            InnerTabsPerent = document.querySelector(".tabs__btns.innerTabButtons");
            InnerTabsPerentLeft = InnerTabsPerent.getBoundingClientRect();
            
            domRect2 = activeBtn2.getBoundingClientRect();
            widhtBtn2 = activeBtn2.getBoundingClientRect().width;
            activeLine2.setAttribute("style", (`width:${(widhtBtn2)}px;left:${(domRect2.x) - InnerTabsPerentLeft.x + scrolledm}px;`));
            // tab bottom line js end
        }
        
});
// scroll-x tabs on click js end



// filter content hide show js start
let filterContent = document.querySelector(".filter__content");
let filterBtn = document.querySelector(".filter__btn");
let closeBtn = document.querySelector(".close__btn");
let bgOverlay = document.querySelector("#overlay");
let body = document.querySelector("body");

filterBtn.addEventListener("click", () => {
    filterContent.classList.add("show");
    bgOverlay.classList.add("show");
    body.classList.add("hidden");
});
closeBtn.addEventListener("click", () => {
    filterContent.classList.remove("show");
    bgOverlay.classList.remove("show");
    body.classList.remove("hidden");
});

bgOverlay.addEventListener("click", () => {
    filterContent.classList.remove("show");
    bgOverlay.classList.remove("show");
    body.classList.remove("hidden");
});

// filter content hide show js end


let MainTabContentBtn = document.querySelectorAll(".main__multi__tab__content.mainTabContent.futures .inner__tabs__btn");
let MainTabContentContent = document.querySelectorAll(".main__multi__tab__content.mainTabContent.futures .inner__tab__content");

MainTabContentBtn.forEach((element, index) => {
    element.addEventListener("click", () => {
        for (let j of MainTabContentBtn) {
            j.classList.remove("show")
        }
        for (let k of MainTabContentContent) {
            k.classList.remove("show");
        }
        element.classList.add("show");
        MainTabContentContent[index].classList.add("show");

        // tab bottom line js start
        activeBtn2 = document.querySelector(".main__multi__tab__content.mainTabContent.futures .inner__tabs__btn.show");
        activeLine2 = document.querySelector(".future-line");

        widhtBtn2 = activeBtn2.clientWidth;
        domRect2 = activeBtn2.getBoundingClientRect();
        activeLine2.setAttribute("style", (`width:${(widhtBtn2)}px;left:${(domRect2.x)}px;`));
        // tab bottom line js end
    });

    // tab bottom line js start

    normalBtn = document.querySelectorAll(".multi__tab__btn");
    activeBtn = document.querySelector(".multi__tab__btn.show");

    activeBtn2 = document.querySelector(".main__multi__tab__content.mainTabContent.futures .inner__tabs__btn.show");
    activeLine2 = document.querySelector(".future-line");

    for (let i of normalBtn) {
        i.addEventListener("click", () => {
            if (i.classList.contains("show")) {
                btnWidth = activeBtn2.clientWidth;
                domRect2 = activeBtn2.getBoundingClientRect();
                activeLine2.setAttribute("style", (`width:${(btnWidth)}px;left:${(domRect2.x)}px;transition-duration:0s;`));
            }
        });
    }


});


//  click effect js start //
const buttons = document.querySelectorAll('.inner__tabs__btn');

buttons.forEach(btn => {
    btn.addEventListener('click', function (e) {

        let ripples = document.createElement('span')
        this.appendChild(ripples);

        window.setTimeout(() => {
            ripples.remove();
        }, 500);
    });
});
//  click effect js end //


// fixed pair coin bar //


let pairCoin = document.querySelectorAll(".pair__coins");
let allCoins = document.querySelectorAll(".all__types__coin");


window.addEventListener("scroll", (e) => {
    for (let i of pairCoin) {
        if (window.scrollY >= 300) {
            i.setAttribute("style", "position:fixed;top: 0;max-width:1200px;width: 100%;");
        }
        else {
            i.setAttribute("style", "position:static;");
        }
    }
});
