// I read the saved trips. If there are no trips, I use an empty array.


const trips = JSON.parse(localStorage.getItem("fishTheBoxTrips") || "[]");

// These arrays store the information needed for the pie chart.


const tripNames = [];
const tripNumbers = [];
const namesForChecking = [];

let totalCompletedTrips = 0;

// I check every saved trip.



for (let i = 0; i < trips.length; i++) {

    if (trips[i].status === "completed") {
        totalCompletedTrips++;

        // Lowecase feature for if the name ex. Pylos is made pylos.


        const nameForChecking = trips[i].name.trim().toLowerCase();
        const namePosition = namesForChecking.indexOf(nameForChecking);

        // A new trip name creates a new pie-chart slice.


        if (namePosition === -1) {
            namesForChecking.push(nameForChecking);
            tripNames.push(trips[i].name.trim());
            tripNumbers.push(1);
        } else {
            // A repeated trip name increases its existing slice.


            tripNumbers[namePosition]++;
        }
    }
}

// I show the number of completed trips above the chart.


document.querySelector("#completedTripsTotal").textContent =
    "Total completed trips: " + totalCompletedTrips;

// I create the pie chart.
new Chart(document.querySelector("#completedTripsChart"), {
    type: "pie",
    data: {
        labels: tripNames,
        datasets: [
            {
                data: tripNumbers,
                backgroundColor: [
                    "#03045e",
                    "#0077b6",
                    "#00b4d8",
                    "#90e0ef",
                    "#caf0f8",
                    "#1466fd",
                    "#1814d8"
                ]
            }
        ]
    }
});
