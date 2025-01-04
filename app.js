const BaseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const selects = document.querySelectorAll(".boxes select");
const Getchange = document.querySelector(".conbtn");
const fromCurrency = document.querySelector("#selectfrom");
const toCurrency = document.querySelector("#selectto");
const msg1 = document.querySelector(".result .one")
const msg2 = document.querySelector(".result .two")
const msg3 = document.querySelector(".result .three")
const swapbtn = document.querySelector(".swap")

window.addEventListener("load", ( )=> {
    updateExchangeRate();
});

for(let select of selects){

    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "From" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "To" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
};

const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

Getchange.addEventListener("click", ()=>{
   updateExchangeRate();
});


const updateExchangeRate = async () => {
    let amount = document.querySelector(".boxes input");
    // console.log(amount.value.toFixed(2));
    let amtVal = amount.value;
    // console.log(amtVal.toFixed(2));
    if(amtVal === "" || amtVal < 1 ){
        amtVal = 1;
        amount.value = "1";
    };
    const URL = `${BaseURL}/${fromCurrency.value.toLowerCase()}.min.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let from = fromCurrency.value.toLowerCase();
    let to = toCurrency.value.toLowerCase();
  let rate = data[from][to];
  let finalAmount = amtVal * rate;
    msg1.innerText = `${amtVal} ${fromCurrency.value} = `;
    msg2.innerText = `${finalAmount} ${toCurrency.value}`;
    msg3.innerText = `${amtVal} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;
};

swapbtn.addEventListener("click", () => {
    let change = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = change;
    updateFlag(fromCurrency);
    updateFlag(toCurrency);
    updateExchangeRate();
});