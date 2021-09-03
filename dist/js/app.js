// Animated elements
const mainContainer = document.querySelector('#container');

const billBar = document.querySelector("#bill-price");

const tips = document.querySelector("#tips");
const customTip = document.querySelector('#custom-tip');

const peopleSection = document.querySelector('.people');
const peopleText = peopleSection.firstElementChild.children[1];
const peopleBar = peopleSection.children[1];


const resetButton = document.querySelector("#reset");

// Checks for valid number input
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

let tipVal = 0.0;

let customFlag = false;
// This allows selection of tip
[...tips.children].forEach((tip) => {
    tip.addEventListener("click", () => {
        [...tips.children].forEach((t) => {
            t.classList.remove("toggle-tips-click");
        });

        if (!tip.id) {
            const customText = customTip.firstElementChild;
            // If default tip
            tip.classList.add("toggle-tips-click");
            tipVal = parseFloat(tip.innerText.slice(0, -1));
            customFlag = false;
            customText.innerText = "Custom";
        } else {
            // If custom tip
            const customText = customTip.firstElementChild;
            customFlag = !customFlag;
            customText.classList.toggle('toggle-custom');

            if (customFlag) {
                customText.innerText = "0";
            } else {
                customText.innerText = "Custom";
            }
        }
    });
});


// This fires off a orange bar warning when number of people === 0
peopleBar.addEventListener('mouseover', () => {
    const peopleNumber = peopleBar.children[1].innerText;
    if (peopleNumber === "0") {
        peopleText.classList.remove("toggle-zero");
        peopleBar.classList.add("toggle-zero-bar");
    } else {
        peopleText.classList.add("toggle-zero");
        peopleBar.classList.remove("toggle-zero-bar");
    }
});

// This resets values when reset button is pressed
resetButton.addEventListener("click", () => {
    billBar.innerText = "0.00";

    customFlag = false;
    customTip.firstElementChild.innerText = "Custom";
    customTip.firstElementChild.classList.remove('toggle-custom');

    peopleBar.children[1].innerText = "0";

    [...tips.children].forEach((t) => {
            t.classList.remove("toggle-tips-click");
        });
});

// This calculates the tip amount, and total
mainContainer.addEventListener("mouseover", () => {
    const totalAmt = document.querySelector("#total-amt");
    const totalTip = document.querySelector("#total-tip");
    const peopleNumber = parseInt(peopleBar.children[1].innerText);
    const billPrice = parseFloat(billBar.innerText);

    if (customFlag) {
        const customText = customTip.firstElementChild;
        tipVal = parseFloat(customText.innerText);
    }
    
    let tips = (billPrice * (tipVal / 100)) / peopleNumber;
    tips = Math.round(tips * 100) / 100;
    

    let amt = (billPrice / peopleNumber) + tips;
    amt = Math.round(amt * 100) / 100;
    if ((isNaN(amt) && isNaN(tips)) || (amt === Infinity && tips === Infinity)) {
        totalTip.innerText = "$0.00";
        totalAmt.innerText = "$0.00";
    } else {
        totalTip.innerText = `$${tips.toFixed(2)}`;
        totalAmt.innerText = `$${amt.toFixed(2)}`;
    }
});