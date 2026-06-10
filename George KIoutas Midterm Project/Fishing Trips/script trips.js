// Get the elements that I need from the HTML page.
const tripForm = document.querySelector("#tripForm");
const tripName = document.querySelector("#tripName");
const tripLocation = document.querySelector("#tripLocation");
const tripDate = document.querySelector("#tripDate");
const tripDescription = document.querySelector("#tripDescription");
const weatherResult = document.querySelector("#weatherResult");
const pendingTable = document.querySelector("#pendingTripsTable");
const completedTable = document.querySelector("#completedTripsTable");

// I use this name to save and read the trips.
const storageName = "fishTheBoxTrips";

// This variable keeps the weather that is shown on the page.
let currentWeather = "";


// LOCAL STORAGE

// Read the saved trips.
function getTrips() {
    const savedTrips = localStorage.getItem(storageName);

    if (savedTrips === null) {
        return [];
    }

    try {
        return JSON.parse(savedTrips);
    } catch {
        return [];
    }
}

// Save the trips.
function saveTrips(trips) {
    localStorage.setItem(storageName, JSON.stringify(trips));
}


// WEATHER

// Change the weather code into simple text.
function getWeatherText(code) {
    if (code === 0) {
        return "Clear sky";
    } else if (code <= 3) {
        return "Partly cloudy";
    } else if (code === 45 || code === 48) {
        return "Fog";
    } else if (code >= 51 && code <= 67) {
        return "Rain";
    } else if (code >= 71 && code <= 77) {
        return "Snow";
    } else if (code >= 80 && code <= 82) {
        return "Rain showers";
    } else if (code >= 95) {
        return "Thunderstorm";
    } else {
        return "Mixed weather";
    }
}

// Get the Athens weather for the selected date.
async function showWeather() {
    if (tripDate.value === "") {
        return;
    }

    weatherResult.textContent = "Loading weather...";
    currentWeather = "";

    try {
        // These are the coordinates of Athens.
        const url =
            "https://api.open-meteo.com/v1/forecast" +
            "?latitude=37.9838" +
            "&longitude=23.7275" +
            "&daily=weather_code,temperature_2m_max,temperature_2m_min" +
            "&timezone=Europe%2FAthens" +
            "&start_date=" +
            tripDate.value +
            "&end_date=" +
            tripDate.value;

        const response = await fetch(url);
        const data = await response.json();

        const code = data.daily.weather_code[0];
        const minimum = data.daily.temperature_2m_min[0];
        const maximum = data.daily.temperature_2m_max[0];

        currentWeather =
            getWeatherText(code) +
            " (" +
            minimum +
            "°C to " +
            maximum +
            "°C)";

        weatherResult.textContent = currentWeather;
    } catch {
        currentWeather = "Weather is not available for this date.";
        weatherResult.textContent = currentWeather;
    }
}


// TABLES

// Add a trip to the pending table.
function addPendingTrip(trip) {
    const row = pendingTable.insertRow();

    row.insertCell(0).textContent = trip.name;
    row.insertCell(1).textContent = trip.location;
    row.insertCell(2).textContent = trip.date;

    const buttonCell = row.insertCell(3);
    const completeButton = document.createElement("button");

    completeButton.textContent = "Complete";
    completeButton.className = "btn btn-info btn-sm";
    buttonCell.appendChild(completeButton);

    completeButton.addEventListener("click", function () {
        completeTrip(trip.id);
    });
}

// Add a trip to the completed table.
function addCompletedTrip(trip) {
    const row = completedTable.insertRow();

    row.insertCell(0).textContent = trip.name;
    row.insertCell(1).textContent = trip.location;
    row.insertCell(2).textContent = trip.date;
}

// Show all saved trips.
function showTrips() {
    const trips = getTrips();

    pendingTable.innerHTML = "";
    completedTable.innerHTML = "";

    // Show the most recently updated trips first.
    trips.sort(function (firstTrip, secondTrip) {
        const firstTime = firstTrip.completedAt || firstTrip.createdAt;
        const secondTime = secondTrip.completedAt || secondTrip.createdAt;

        return secondTime - firstTime;
    });

    trips.forEach(function (trip) {
        if (trip.status === "completed") {
            addCompletedTrip(trip);
        } else {
            addPendingTrip(trip);
        }
    });
}

// Change one trip from pending to completed.
function completeTrip(tripId) {
    const trips = getTrips();

    trips.forEach(function (trip) {
        if (trip.id === tripId) {
            trip.status = "completed";
            trip.completedAt = Date.now();
        }
    });

    saveTrips(trips);
    showTrips();
}

// Save a new trip.
function addTrip(event) {
    event.preventDefault();

    if (currentWeather === "") {
        alert("Please wait for the weather to load.");
        return;
    }

    const trips = getTrips();

    const newTrip = {
        id: Date.now(),
        name: tripName.value,
        location: tripLocation.value,
        date: tripDate.value,
        description: tripDescription.value,
        weather: currentWeather,
        status: "pending",
        createdAt: Date.now()
    };

    trips.push(newTrip);
    saveTrips(trips);
    showTrips();

    tripForm.reset();
    setDate();
    showWeather();
}


// DATE

// Change a date into the format used by the date input.
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return year + "-" + month + "-" + day;
}

// Select today when the calendar is empty.
function setDate() {
    const today = new Date();

    if (tripDate.value === "") {
        tripDate.value = formatDate(today);
    }
}


// PAGE START

setDate();
showWeather();
showTrips();

// Get new weather automatically when the date changes.
tripDate.addEventListener("change", showWeather);

// Save the trip when the form is submitted.
tripForm.addEventListener("submit", addTrip);
