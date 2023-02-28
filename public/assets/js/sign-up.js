"use stict";
let OptionalBtn = document.querySelector(".optional__input");
let TermsConditionTick = document.querySelector(".tick__terms");


OptionalBtn.addEventListener("click", () => {
    OptionalBtn.classList.toggle("active");

});
let TermsCondition = document.querySelector(".terms__condition .icon");

TermsCondition.addEventListener("click", () => {
    TermsCondition.classList.toggle("active")
    TermsConditionTick.classList.toggle("active")
})