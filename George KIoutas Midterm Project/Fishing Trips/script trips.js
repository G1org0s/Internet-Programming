// I get the form and its input fields.

const tripForm = document.querySelector("#tripForm");
const tripName = document.querySelector("#tripName");
const tripLocation = document.querySelector("#tripLocation");
const tripDate = document.querySelector("#tripDate");
const tripDescription = document.querySelector("#tripDescription");

// I get the weather, table, and sorting elements.

const weatherResult = document.querySelector("#weatherResult");
const pendingTable = document.querySelector("#pendingTripsTable");
const completedTable = document.querySelector("#completedTripsTable");
const sortTrips = document.querySelector("#sortTrips");

// LOCAL STORAGE

// I read the saved trips. If there are no trips, I use an empty array.
const trips = JSON.parse(localStorage.getItem("fishTheBoxTrips") || "[]");

// This function saves the trips array in the browser.

function saveTrips() {
    localStorage.setItem("fishTheBoxTrips", JSON.stringify(trips));
}

// These are the five example completed trips in order for the pie chart to show completed examples when the website gets loaded.

const standardTrips = [
    {
        name: "Athens Barracuda Trip",
        location: "Athens",
        date: "2026-01-12",
        description: "A fishing trip near the coast of Athens.",
        status: "completed"
    },
    {
        name: "Pylos Amberjack Trip",
        location: "Pylos",
        date: "2026-02-08",
        description: "A completed sea fishing trip in Pylos.",
        status: "completed"
    },
    {
        name: "Laurio Match Fishing Day",
        location: "Laurio",
        date: "2026-03-15",
        description: "A relaxing fishing day at Laurio.",
        status: "completed"
    },
    {
        name: "Agia Marina Egi Trip",
        location: "Agia Marina",
        date: "2026-04-10",
        description: "A completed fishing trip at Agia Marina.",
        status: "completed"
    },
    {
        name: "Xylokastro Casting Trip",
        location: "Xylokastro",
        date: "2026-05-17",
        description: "A shore fishing trip in Xylokastro.",
        status: "completed"
    }
];

// I add the example trips only the first time the project is opened.

if (localStorage.getItem("standardTripsAdded") === null) {
    for (let i = 0; i < standardTrips.length; i++) {
        trips.push(standardTrips[i]);
    }

    saveTrips();
    localStorage.setItem("standardTripsAdded", "yes");
}


// TODAY'S WEATHER

// This function changes a weather code into simple text.



function getWeatherText(code) {
    if (code === 0) {
        return "Clear sky";
    } else if (code <= 3) {
        return "Partly cloudy";
    } else if (code >= 51 && code <= 67) {
        return "Rain";
    } else if (code >= 80 && code <= 82) {
        return "Rain showers";
    } else if (code >= 95) {
        return "Thunderstorm";
    } else {
        return "Other weather";
    }
}

// This function gets the current weather in Athens.
async function showWeather() {
    weatherResult.textContent = "Loading weather...";

    try {
        // These are the coordinates of Athens.
        const url =
            "https://api.open-meteo.com/v1/forecast" +
            "?latitude=37.9838" +
            "&longitude=23.7275" +
            "&current=temperature_2m,weather_code" +
            "&timezone=Europe%2FAthens";

        // I send the request and change the result into an object.


        
        const response = await fetch(url);
        const data = await response.json();

        // I get the current weather code and temperature.


        const code = data.current.weather_code;
        const temperature = data.current.temperature_2m;

        // I display today's weather.



        weatherResult.textContent =
            getWeatherText(code) + " (" + temperature + " C)";
    } catch {
        weatherResult.textContent = "Today's weather is not available.";
    }
}


// TRIP TABLES

// This function displays all trips.


function showTrips() {

    // I clear the tables before creating the rows again.


    pendingTable.innerHTML = "";
    completedTable.innerHTML = "";

    // I sort the trips using the selected menu option.


    trips.sort(function (firstTrip, secondTrip) {
        if (sortTrips.value === "latest") {
            if (firstTrip.date < secondTrip.date) {
                return 1;
            } else {
                return -1;
            }
        } else {
            if (firstTrip.date > secondTrip.date) {
                return 1;
            } else {
                return -1;
            }
        }
    });

    // I check every trip in the array.
    for (let i = 0; i < trips.length; i++) {
        let row;

        // I choose the correct table for the trip.
        if (trips[i].status === "completed") {
            row = completedTable.insertRow();
        } else {
            row = pendingTable.insertRow();
        }

        // I add the trip information to the row.


        row.insertCell(0).textContent = trips[i].name;
        row.insertCell(1).textContent = trips[i].location;
        row.insertCell(2).textContent = trips[i].date;

        // I create the cell that holds the buttons.


        const buttonCell = row.insertCell(3);

        // Only pending trips need a Complete button.


        if (trips[i].status === "pending") {
            // Add the Complete button inside the action cell.

            
            buttonCell.innerHTML =
                '<button type="button" class="btn btn-info btn-sm">Complete</button>';

            const completeButton = buttonCell.querySelector("button");

            completeButton.addEventListener("click", function () {
                completeTrip(i);
            });
        } else {
            // Only completed trips need a Delete button.
            buttonCell.innerHTML =
                '<button type="button" class="btn btn-danger btn-sm">Delete</button>';

            const deleteButton = buttonCell.querySelector("button");

            deleteButton.addEventListener("click", function () {
                deleteTrip(i);
            });
        }
    }
}

// This function changes a pending trip to completed.


function completeTrip(index) {
    trips[index].status = "completed";
    saveTrips();
    showTrips();
}

// This function deletes one trip.

function deleteTrip(index) {



    // splice removes one item from the selected array position.
    trips.splice(index, 1);
    saveTrips();
    showTrips();
}


// ADD A TRIP

// This function runs when the form is submitted.


function addTrip(event) {

    // I stop the form from refreshing the page.


    event.preventDefault();

    // I create an object using the input values.


    const newTrip = {
        name: tripName.value,
        location: tripLocation.value,
        date: tripDate.value,
        description: tripDescription.value,
        status: "pending"
    };

    // I add the trip, save it, and refresh the tables.


    trips.push(newTrip);
    saveTrips();
    showTrips();

    // I clear the form.
    tripForm.reset();
}


// PAGE START

// I stop the user from selecting previous dates.



const today = new Date().toISOString().split("T")[0];
tripDate.min = today;

// I load the weather and saved trips.



showWeather();
showTrips();

// I listen for form and sorting changes.

tripForm.addEventListener("submit", addTrip);
sortTrips.addEventListener("change", showTrips);
