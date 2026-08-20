// ============================
// TYPING EFFECT
// ============================

const words = [
    "Student",
    "Web Enthusiast",
    "Developer",
    "Freelancer",
    "Future Entrepreneur"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typingElement = document.getElementById("typing");

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(0, charIndex++);

        if (charIndex > currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1200);

            return;
        }

    } else {

        typingElement.textContent =
            currentWord.substring(0, charIndex--);

        if (charIndex < 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }

        }

    }

    setTimeout(
        typeEffect,
        deleting ? 50 : 100
    );

}

typeEffect();


// ============================
// AUTO YEAR
// ============================

document.getElementById("year").textContent =
    new Date().getFullYear();


// ============================
// DARK / LIGHT MODE
// ============================

const themeBtn =
    document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if (
        document.body.classList.contains("light-mode")
    ) {

        themeBtn.textContent = "☀️";

    } else {

        themeBtn.textContent = "🌙";

    }

});


// ============================
// SCROLL ANIMATION
// ============================

const sections =
    document.querySelectorAll(".section");

const observer =
    new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                    "translateY(0)";

            }

        });

    });

sections.forEach(section => {

    section.style.opacity = "0";

    section.style.transform =
        "translateY(50px)";

    section.style.transition =
        "all .7s ease";

    observer.observe(section);

});


// ============================
// NAVBAR EFFECT
// ============================

window.addEventListener("scroll", () => {

    const nav =
        document.querySelector("nav");

    if (window.scrollY > 50) {

        nav.style.background =
            "rgba(4,11,20,.95)";

    } else {

        nav.style.background =
            "rgba(7,17,31,.7)";

    }

});
