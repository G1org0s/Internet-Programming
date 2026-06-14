const navbar = document.querySelector("#navbar");

navbar.innerHTML = `
    <nav class="d-flex gap-3 flex-wrap">
        <a href="../Home Page/index.html" class="btn btn-light">Home</a>
        <a href="../Fishing Trips/trips.html" class="btn btn-light">Trips</a>
        <a href="../Analytics/analytics.html" class="btn btn-light">Analytics</a>
        <a href="../Reviews/reviews.html" class="btn btn-light">Reviews</a>
        <a href="../About/about.html" class="btn btn-light">About</a>
        <a href="../Contact/contact.html" class="btn btn-light">Contact</a>

        <button id="darkModeToggle"
                class="btn btn-dark"
                type="button">
            Dark Mode
        </button>
    </nav>
`;
