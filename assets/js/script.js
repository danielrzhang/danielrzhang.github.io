const navMenu = document.getElementById("nav-menu")
const navToggle = document.getElementById("nav-toggle")
const navClose = document.getElementById("nav-close")

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu")
  })
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu")
  })
}

const navLink = document.querySelectorAll(".nav-link")

function linkAction() {
  const navMenu = document.getElementById("nav-menu")
  navMenu.classList.remove("show-menu")
}

navLink.forEach(n => n.addEventListener("click", linkAction))

const sections = document.querySelectorAll("section[id]")

function scrollActive() {
  const scrollY = window.scrollY

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 250
    const sectionId = current.getAttribute("id")

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".nav-menu a[href*=" + sectionId + "]").classList.add("active-link")
    } else {
      document.querySelector(".nav-menu a[href*=" + sectionId + "]").classList.remove("active-link")
    }
  })
}
window.addEventListener("scroll", scrollActive)

function scrollHeader() {
  const nav = document.getElementById("header")
  if (this.scrollY >= 80) {
    nav.classList.add("scroll-header");
  } else {
    nav.classList.remove("scroll-header")
  }
}
window.addEventListener("scroll", scrollHeader)

function scrollUp() {
  const scrollUp = document.getElementById("scroll-up")

  if (this.scrollY >= 560) {
    scrollUp.classList.add("show-scroll")
  } else {
    scrollUp.classList.remove("show-scroll")
  }
}
window.addEventListener("scroll", scrollUp)

const themeButton = document.getElementById("theme-button")
const darkTheme = "dark-theme"
const iconTheme = "uil-sun"

const selectedTheme = localStorage.getItem("selected-theme")
const selectedIcon = localStorage.getItem("selected-icon")

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? "dark" : "light"
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun"

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme)
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](iconTheme)
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)
  
  localStorage.setItem("selected-theme", getCurrentTheme())
  localStorage.setItem("selected-icon", getCurrentIcon())
})

const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const msg = document.getElementById("message");

function sendEmail() {
  const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br> Subject: ${subject.value}<br> Message: ${msg.value}`;

  Email.send({
    SecureToken : "b4f1dbca-93a9-4777-8423-eee53839a7ab",
    To : 'danielrzhang@gmail.com',
    From : "danielrzhang@gmail.com",
    Subject : subject.value,
    Body : bodyMessage
  }).then(
    message => {
      if (message == "OK") {
        Swal.fire({
          background: "var(--body-color)",
          color: "var(--text-color)",
          confirmButtonColor: "var(--first-color)",
          iconColor: "var(--correct-color)",
          title: "Success!",
          text: "Your email has been sent.",
          icon: "success"
        });
      }
    }
  );
}

function checkInputs() {
  const items = document.querySelectorAll(".contact-input");

  for (const item of items) {
    if (item.value == "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }

    if (items[1].value != "") {
      checkEmail();
    }

    items[1].addEventListener("keyup", () => {
      checkEmail();
    })

    item.addEventListener("keyup", () => {
      if (item.value != "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      } else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    })
  }
}

function checkEmail() {
  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
  const errorTextEmail = document.querySelector(".error-txt.email");


  if (!email.value.match(emailRegex)) {
    email.classList.add("error");
    email.parentElement.classList.add("error");

    if (email.value != "") {
      errorTextEmail.innerText = "Enter a valid email address";
    } else {
      errorTextEmail.innerText = "Email address cannot be blank";
    }
  } else {
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();

  if (!fullName.classList.contains("error") && !email.classList.contains("error") && !subject.classList.contains("error") && !msg.classList.contains("error")) {
    sendEmail();
    form.reset();
    return false;
  }
})