// I get the contact form from the HTML page.
const contactForm = document.querySelector("#contactForm");

// I get every form field so I can read its value.


const contactName = document.querySelector("#contactName");
const contactEmail = document.querySelector("#contactEmail");
const contactSubject = document.querySelector("#contactSubject");
const contactMessage = document.querySelector("#contactMessage");









// This function runs when the contact form is submitted.

function submitContactForm(event) {

    
    // I create the confirmation message using the input values.


    const confirmation =
        "Thank you, " + contactName.value + "!\n" +
        "Email: " + contactEmail.value + "\n" +
        "Subject: " + contactSubject.value + "\n" +
        "Message: " + contactMessage.value;

    // I show the captured details in a pop-up.


    alert(confirmation);

    // I clear the form after the message is confirmed.


    contactForm.reset();
}




