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

// This array stores all trips.

let trips = [];


// LOCAL STORAGE

// I read the saved trips when the page opens.

const savedTrips = localStorage.getItem("fishTheBoxTrips");

// If saved trips exist, I change the text back into an array.

if (savedTrips !== null) {
    trips = JSON.parse(savedTrips);
}

// This function saves the trips array in the browser.

function saveTrips() {
    localStorage.setItem("fishTheBoxTrips", JSON.stringify(trips));
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


        // Completed trips go into the completed table.


        if (trips[i].status === "completed") {
            const row = completedTable.insertRow();

            row.insertCell(0).textContent = trips[i].name;
            row.insertCell(1).textContent = trips[i].location;
            row.insertCell(2).textContent = trips[i].date;

            // I create the Delete button.
            const buttonCell = row.insertCell(3);
            const deleteButton = document.createElement("button");

            deleteButton.textContent = "Delete";
            deleteButton.className = "btn btn-danger btn-sm";
            buttonCell.appendChild(deleteButton);

            // This event deletes the selected trip.

            deleteButton.addEventListener("click", function () {
                deleteTrip(i);
            });
        } else {


            
            // Pending trips go into the pending table.

            const row = pendingTable.insertRow();

            row.insertCell(0).textContent = trips[i].name;
            row.insertCell(1).textContent = trips[i].location;
            row.insertCell(2).textContent = trips[i].date;

            // I create the Complete and Delete buttons.



            const buttonCell = row.insertCell(3);
            const completeButton = document.createElement("button");
            const deleteButton = document.createElement("button");

            completeButton.textContent = "Complete";
            completeButton.className = "btn btn-info btn-sm";

            deleteButton.textContent = "Delete";
            deleteButton.className = "btn btn-danger btn-sm ms-2";

            buttonCell.appendChild(completeButton);
            buttonCell.appendChild(deleteButton);

            // These events complete or delete the selected trip.


            completeButton.addEventListener("click", function () {
                completeTrip(i);
            });

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
