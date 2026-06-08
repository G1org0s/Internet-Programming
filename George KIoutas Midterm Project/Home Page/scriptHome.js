
// QUOTE OF THE DAY


const dailyQuote = document.querySelector("#DailyQuote");
const newQuoteBtn = document.querySelector("#newQuoteBtn");

async function getRandomQuote() {

    try {

        dailyQuote.textContent =
            "Finding a quote for you...";

        const response =
            await fetch("https://api.adviceslip.com/advice");

        const data =
            await response.json();

        dailyQuote.textContent =
            `"${data.slip.advice}"`;

    }

    catch {

        dailyQuote.textContent =
            "Oops... No quote found. Please try again later.";

    }
}

if (dailyQuote && newQuoteBtn) {

    getRandomQuote();

    newQuoteBtn.addEventListener(
        "click",
        getRandomQuote
    );

}