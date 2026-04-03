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

/* ========= typing effect ========= */
const typingTarget = document.querySelector(".header-text h1 span");
const words = ["Britney", "a Developer", "a Designer", "a Creator"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const current = words[wordIndex];
    if (isDeleting) {
        typingTarget.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTarget.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === current.length) {
        setTimeout(() => isDeleting = true, 1800);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    const speed = isDeleting ? 60 : 110;
    setTimeout(type, speed);
}

type();

/* ========= cursor glow trail ========= */
const trail = document.createElement("div");
trail.className = "cursor-trail";
document.body.appendChild(trail);

document.addEventListener("mousemove", e => {
    trail.style.left = e.clientX + "px";
    trail.style.top = e.clientY + "px";
    trail.style.opacity = "1";
    clearTimeout(trail._hide);
    trail._hide = setTimeout(() => trail.style.opacity = "0", 120);
});

/* ========= scroll reveal ========= */
const revealEls = document.querySelectorAll(
    "#about .row, .whatido-list > div, .work, #contact .row"
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach((el, i) => {
    el.classList.add("reveal-on-scroll");
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
    observer.observe(el);
});

/* ========= nav active link on scroll ========= */
const sections = document.querySelectorAll("section, #header");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 160) {
            current = sec.getAttribute("id");
        }
    });
    navLinks.forEach(link => {
        link.parentElement.classList.remove("active-nav");
        if (link.getAttribute("href") === `#${current}`) {
            link.parentElement.classList.add("active-nav");
        }
    });
});

/* ========= contact form ========= */
const form = document.getElementById("contact-form");
const msg = document.getElementById("msg");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const submitButton = form.querySelector("button");
    submitButton.innerText = "Sending...";
    submitButton.disabled = true;

    formData.append("access_key", "84c35d86-1208-43de-8041-fad6424fbdce");

    fetch("https://api.web3forms.com/submit", {
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

/* ========= resume modal ========= */
function openResume() {
    document.getElementById("resume-modal").classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeResume() {
    document.getElementById("resume-modal").classList.remove("active");
    document.body.style.overflow = "";
}

document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeResume();
});