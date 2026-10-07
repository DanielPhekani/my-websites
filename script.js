/* =========================================================
   D6TECH WEBSITE - JAVASCRIPT
   ========================================================= */


/* ================= CONTACT FORM ================= */

const contactForm = document.querySelector("#contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        // Prevent the page from refreshing
        event.preventDefault();

        console.log("Contact form submission detected");

        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const message = document.querySelector("#message").value.trim();

        const formMessage = document.querySelector("#formMessage");
        const submitButton = contactForm.querySelector("button[type='submit']");


        // Validate name
        if (name === "") {
            formMessage.textContent = "Please enter your name.";
            return;
        }


        // Validate email
        if (email === "") {
            formMessage.textContent = "Please enter your email.";
            return;
        }


        // Validate message
        if (message === "") {
            formMessage.textContent = "Please enter a message.";
            return;
        }

        // Show sending status
        submitButton.disabled = true;
        submitButton.textContent = "Sending..."; 

        // Send the form data to the backend
        fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })
        })
        .then(response => response.json())
        .then(data => {

            formMessage.textContent = data.message;

        // Clear the form
        contactForm.reset();

        // Restore the button
        submitButton.disabled = false;
        submitButton.textContent = "Send Message →";

            

        })
        .catch(error => {

            console.error("Error:", error);

            formMessage.textContent =
                "Sorry, something went wrong. Please try again.";

        });

    });

}


/* ================= DARK MODE ================= */

const themeToggle = document.querySelector("#themeToggle");

if (themeToggle) {

    themeToggle.addEventListener("click", function() {

        // Toggle dark mode
        document.body.classList.toggle("dark-mode");


        // Change button text
        if (document.body.classList.contains("dark-mode")) {

            themeToggle.textContent = "☀️ Light Mode";

        } else {

            themeToggle.textContent = "🌙 Dark Mode";

        }

    });

}