function changeWelcome() {
    document.querySelector("#home p").textContent =
        "Welcome! You have just used JavaScript to change the webpage.";
}

function toggleSkills() {
    const skills = document.querySelector("#skillList");

    if (skills.style.display === "none") {
        skills.style.display = "block";
    } else {
        skills.style.display = "none";
    }
}

const contactForm = document.querySelector("#contactForm");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();

    const formMessage = document.querySelector("#formMessage");

    if (name === "") {
        formMessage.textContent = "Please enter your name.";
        return;
    }

    if (email === "") {
        formMessage.textContent = "Please enter your email.";
        return;
    }

    if (message === "") {
        formMessage.textContent = "Please enter a message.";
        return;
    }

    formMessage.textContent = "Thank you! Your message is ready to be sent.";

    contactForm.reset();
});