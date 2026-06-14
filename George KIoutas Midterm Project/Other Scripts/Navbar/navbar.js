const navbar = document.querySelector("#navbar");

navbar.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark p-0">
        <button class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mainNavbar"
                aria-controls="mainNavbar"
                aria-expanded="false"
                aria-label="Open navigation menu">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="mainNavbar">
            <div class="d-grid d-lg-flex gap-2 gap-lg-3 mt-3 mt-lg-0">
                <a href="../Home Page/index.html" class="btn btn-light">Home</a>
                <a href="../Fishing Trips/trips.html" class="btn btn-light">Trips</a>
                <a href="../Analytics/analytics.html" class="btn btn-light">Analytics</a>
                <a href="../Reviews/reviews.html" class="btn btn-light">Reviews</a>
                <a href="../About/about.html" class="btn btn-light">About</a>
                <a href="../Contact/contact.html" class="btn btn-light">Contact</a>

                <button id="darkModeToggle" class="btn btn-dark" type="button">
                    Dark Mode
                </button>
            </div>
        </div>
    </nav>
`;
