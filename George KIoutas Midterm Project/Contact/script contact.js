// Select the contact form and its fields.
const contactForm = document.querySelector("#contactForm");
const contactName = document.querySelector("#contactName");
const contactEmail = document.querySelector("#contactEmail");
const contactSubject = document.querySelector("#contactSubject");
const contactMessage = document.querySelector("#contactMessage");

// This function runs after the form fields have been validated.


function submitContactForm(event) {

   


    // Put the submitted information inside the confirmation message.

    const confirmation =
        "Thank you, " + contactName.value + "!\n" +
        "Email: " + contactEmail.value + "\n" +
        "Subject: " + contactSubject.value + "\n" +
        "Message: " + contactMessage.value;

    // Show the confirmation at the top of the screen.


    alert(confirmation);

    // Clear the form after the message has been shown.
    contactForm.reset();
}

// Connect the form submission to the function above.
contactForm.addEventListener("submit", submitContactForm);
