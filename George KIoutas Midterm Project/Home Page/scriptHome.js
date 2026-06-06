const darkModeToggle = document.getElementById("darkModeToggle");
const dailyQuote = document.getElementById("DailyQuote");
const newQuoteBtn = document.getElementById("newQuoteBtn");

if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeToggle.textContent = "Light Mode";
}

darkModeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
        darkModeToggle.textContent = "Light Mode";
    } else {
        localStorage.setItem("darkMode", "disabled");
        darkModeToggle.textContent = "Dark Mode";
    }
});

async function getRandomQuote() {
    
    try {
        dailyQuote.textContent = "Finding a quote for you...";

        const response = await fetch("https://api.adviceslip.com/advice");

        const data = await response.json();

        dailyQuote.textContent = `"${data.slip.advice}"`;
    } 
    
    catch {
        dailyQuote.textContent = "Opps... No quote found. Please try again later.";
    }
}

getRandomQuote();

newQuoteBtn.addEventListener("click", getRandomQuote);