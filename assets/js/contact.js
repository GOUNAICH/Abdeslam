/*===== EMAILJS INIT =====*/
emailjs.init("ZgCkcMefCZwDhknYv");

/*===== VALIDATION =====*/
function validateName() {
    const input = document.getElementById("name");
    const error = document.getElementById("nameError");
    const valid = input.value.trim().length >= 2;
    input.classList.toggle("invalid", !valid);
    input.classList.toggle("valid", valid);
    error.classList.toggle("show", !valid);
    return valid;
}

function validateEmail() {
    const input = document.getElementById("email");
    const error = document.getElementById("emailError");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = regex.test(input.value.trim());
    input.classList.toggle("invalid", !valid);
    input.classList.toggle("valid", valid);
    error.classList.toggle("show", !valid);
    return valid;
}

function validateMessage() {
    const input = document.getElementById("message");
    const error = document.getElementById("messageError");
    const valid = input.value.trim().length >= 10;
    input.classList.toggle("invalid", !valid);
    input.classList.toggle("valid", valid);
    error.classList.toggle("show", !valid);
    return valid;
}

// Live validation as user types
document.getElementById("name").addEventListener("input", validateName);
document.getElementById("email").addEventListener("input", validateEmail);
document.getElementById("message").addEventListener("input", validateMessage);

/*===== TOAST =====*/
function showToast(type, message) {
    const toast   = document.getElementById("toast");
    const toastMsg  = document.getElementById("toastMsg");
    const toastIcon = document.getElementById("toastIcon");
    const icons = { success: "✅", error: "❌", warning: "⚠️" };

    toast.className = `toast ${type}`;
    toastIcon.textContent = icons[type];
    toastMsg.textContent  = message;

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => { toast.className = "toast hidden"; toast.style.opacity = "1"; }, 500);
    }, 5000);
}

/*===== SEND EMAIL =====*/
function sendEmail() {
    const isNameValid    = validateName();
    const isEmailValid   = validateEmail();
    const isMessageValid = validateMessage();

    if (!isNameValid || !isEmailValid || !isMessageValid) {
        showToast("warning", "Please fix the errors above before sending.");
        return;
    }

    const btn = document.querySelector(".contact__button");
    btn.value    = "Sending...";
    btn.disabled = true;

    const templateParams = {
        name:    document.getElementById("name").value.trim(),
        email:   document.getElementById("email").value.trim(),
        message: document.getElementById("message").value.trim(),
    };

    emailjs.send("service_efsdw99", "template_8suzjt5", templateParams)
        .then(() => {
            showToast("success", "Message sent! I'll get back to you soon. 🎉");
            document.getElementById("contactForm").reset();
            document.querySelectorAll(".contact__input").forEach(el => {
                el.classList.remove("valid", "invalid");
            });
            btn.value    = "Send Message";
            btn.disabled = false;
        })
        .catch(() => {
            showToast("error", "Failed to send. Please try again or email me directly.");
            btn.value    = "Send Message";
            btn.disabled = false;
        });
}