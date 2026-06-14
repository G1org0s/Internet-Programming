// Select the form, its fields, and the saved reviews table.
const reviewForm = document.querySelector("#reviewForm");
const reviewName = document.querySelector("#reviewName");
const reviewLocation = document.querySelector("#reviewLocation");
const fishCaught = document.querySelector("#fishCaught");
const reviewMessage = document.querySelector("#reviewMessage");
const recommendTrip = document.querySelector("#recommendTrip");
const reviewsTable = document.querySelector("#reviewsTable");
const noReviewsMessage = document.querySelector("#noReviewsMessage");
const clearReviews = document.querySelector("#clearReviews");

// Start with an empty reviews array.


let reviews = [];

// If reviews have already been saved, load them.



const savedReviews = localStorage.getItem("fishTheBoxReviews");

if (savedReviews !== null) {
    reviews = JSON.parse(savedReviews);
}

// Save the reviews in the browser.


function saveReviews() {
    localStorage.setItem("fishTheBoxReviews", JSON.stringify(reviews));
}

// Show the saved reviews on the right side of the page.



function showReviews() {
    reviewsTable.innerHTML = "";





    // Show a message if the list is empty.


    if (reviews.length === 0) {
        noReviewsMessage.hidden = false;
        return;
    }

    noReviewsMessage.hidden = true;

    // Add one table row for each review.



    for (let i = 0; i < reviews.length; i++) {
        const row = reviewsTable.insertRow();

        row.insertCell(0).textContent = reviews[i].name;
        row.insertCell(1).textContent = reviews[i].location;
        row.insertCell(2).textContent = reviews[i].fish;
        row.insertCell(3).textContent = reviews[i].message;
        row.insertCell(4).textContent = reviews[i].recommend;
    }
}

// Add a new review after the browser validates the form.


function submitReview(event) {
    event.preventDefault();

    // Keep the form values together as one review.

    const newReview = {
        name: reviewName.value,
        location: reviewLocation.value,
        fish: fishCaught.value,
        message: reviewMessage.value,
        recommend: recommendTrip.value
    };

    reviews.push(newReview);
    saveReviews();
    showReviews();
    reviewForm.reset();

    alert("Your review was saved.");
}

// Empty the reviews array, save it, and update the page.



function removeReviews() {
    reviews.length = 0;
    saveReviews();
    showReviews();
}

// Connect the form and Clear Reviews button to their functions.
reviewForm.addEventListener("submit", submitReview);
clearReviews.addEventListener("click", removeReviews);

// Show all saved reviews when the page opens.
showReviews();
