/* ========= tab switching ========= */
const tabLinks = document.querySelectorAll(".tab-links");
const tabContents = document.querySelectorAll(".tab-contents");

tabLinks.forEach(link => {
    link.addEventListener("click", () => {
        const tabName = link.getAttribute("data-tab");

        tabLinks.forEach(l => l.classList.remove("active-link"));
        tabContents.forEach(c => c.classList.remove("active-tab"));

        link.classList.add("active-link");
        document.getElementById(tabName).classList.add("active-tab");
    });
});

/* ========= mobile menu ========= */
const sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
    document.getElementById("sidemenu").classList.add("show");
}

function closemenu() {
    sidemenu.style.right = "-200px";
    document.getElementById("sidemenu").classList.remove("show");
}

/* ========= contact form ========= */
const form = document.getElementById("contact-form");
const msg = document.getElementById("msg");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const submitButton = form.querySelector("button");

    submitButton.innerText = "Sending...";
    submitButton.disabled = true;

    fetch("https://formsubmit.co/ajax/britneylu100@gmail.com", {
        method: "POST",
        body: formData
    })
        .then(res => res.json())
        .then(() => {
            msg.innerHTML = "Message sent successfully!";
            setTimeout(() => msg.innerHTML = "", 5000);
            form.reset();
            submitButton.innerText = "Send Message";
            submitButton.disabled = false;
        })
        .catch(() => {
            msg.innerHTML = "Message failed to send. Try again.";
            submitButton.innerText = "Send Message";
            submitButton.disabled = false;
        });
});