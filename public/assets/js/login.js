"use stict";
let formTabBtn = document.querySelectorAll(".form__tab__btn");
let SubmitBtn = document.querySelector(".submit__btn__wrapper");

for (let i of formTabBtn) {
    i.addEventListener("click", () => {
        if (i.classList.contains('qr__code')) {
            SubmitBtn.classList.add("active");
        } else {
            SubmitBtn.classList.remove("active");
        }
    });
}
