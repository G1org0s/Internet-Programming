// FISHING QUOTE

const dailyQuote = document.querySelector("#DailyQuote");
const newQuoteBtn = document.querySelector("#newQuoteBtn");

// Get fishing quotes from a public API.
async function getFishingQuote() {
    dailyQuote.textContent = "Finding a fishing quote for you...";

    try {
        const apiUrl =
            "https://en.wikiquote.org/w/api.php" +
            "?action=query" +
            "&prop=extracts" +
            "&explaintext=1" +
            "&titles=Fishing" +
            "&format=json" +
            "&origin=*";

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error();
        }

        const data = await response.json();

        // The API stores the page inside an object with a number as its key.
        const pages = Object.values(data.query.pages);
        const fishingPageText = pages[0].extract;

        // Keep only the Quotes section of the page.
        const quoteSection = fishingPageText
            .split("== Quotes ==")[1]
            .split("== See also ==")[0];

        // Remove empty lines.
        const lines = quoteSection.split("\n").filter(function (line) {
            return line.trim() !== "";
        });

        // Every quote is followed by its author.
        // Keep only the quote lines at positions 0, 2, 4, 6 etc


        const fishingQuotes = lines.filter(function (line, index) {
            const simpleLine = line.toLowerCase();

            return (
                index % 2 === 0 &&
                line.length >= 40 &&
                line.length <= 180 &&
                !simpleLine.includes("thou") &&
                !simpleLine.includes("thee") &&
                !simpleLine.includes("hath") &&
                !simpleLine.includes("shall") &&
                !simpleLine.includes("mine angle") &&
                !simpleLine.includes("golden oars")
            );
        });

        if (fishingQuotes.length === 0) {
            throw new Error();
        }

        // Select one random quote.
        const randomNumber = Math.floor(
            Math.random() * fishingQuotes.length
        );

        dailyQuote.textContent = '"' + fishingQuotes[randomNumber] + '"';
    } catch {
        dailyQuote.textContent =
            "No fishing quote was found. Please try again.";
    }
}

// Get one quote when the page opens.
getFishingQuote();

// Get another quote when the button is clicked.
newQuoteBtn.addEventListener("click", getFishingQuote);


// LATEST TRIP ACTIVITY

const lastActivity = document.querySelector("#LastActivity");
const tripsStorageKey = "fishTheBoxTrips";

// Read the saved trips from the browser.


function getSavedTrips() {
    const savedTrips = localStorage.getItem(tripsStorageKey);

    if (savedTrips === null) {
        return [];
    }

    try {
        return JSON.parse(savedTrips);
    } catch {
        return [];
    }
}

// Display the saved trips on the Home page.


function showLatestActivity() {
    const trips = getSavedTrips();

    lastActivity.innerHTML = "";

    // Show a message when there are no trips.



    if (trips.length === 0) {
        const emptyItem = document.createElement("li");

        emptyItem.className = "list-group-item";
        emptyItem.textContent = "No recent activity";
        lastActivity.appendChild(emptyItem);

        return;
    }

    // Show the newest activity at the top.


    trips.sort(function (firstTrip, secondTrip) {
        const firstTime = firstTrip.completedAt || firstTrip.createdAt;
        const secondTime = secondTrip.completedAt || secondTrip.createdAt;

        return secondTime - firstTime;
    });

    // Create one activity item for every trip.


    trips.forEach(function (trip) {
        const activityItem = document.createElement("li");
        const tripInformation = document.createElement("div");
        const tripTitle = document.createElement("div");
        const tripDescription = document.createElement("div");
        const statusBadge = document.createElement("span");

        activityItem.className =
            "list-group-item d-flex justify-content-between align-items-center";

        tripTitle.className = "fw-bold";
        tripTitle.textContent =
            trip.name + " - " + trip.location + " (" + trip.date + ")";

        tripDescription.className = "small text-muted";
        tripDescription.textContent = trip.description;

        if (trip.status === "completed") {
            statusBadge.textContent = "Completed";
            statusBadge.className = "badge bg-info text-dark";
        } else {
            statusBadge.textContent = "Pending";
            statusBadge.className = "badge bg-warning text-dark";
        }

        tripInformation.appendChild(tripTitle);
        tripInformation.appendChild(tripDescription);
        activityItem.appendChild(tripInformation);
        activityItem.appendChild(statusBadge);
        lastActivity.appendChild(activityItem);
    });
}

// Refresh the activity whenever the Home page is shown.


window.addEventListener("pageshow", showLatestActivity);
