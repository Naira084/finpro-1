MicroModal.init({
    disableScroll: true,
    awaitCloseAnimation: true
});

let isSignUpMode = true;

const authTitle = document.getElementById("authTitle");
const authSubtitle = document.getElementById("authSubtitle");
const submitBtn = document.getElementById("submitBtn");
const switchText = document.getElementById("switchText");
const toggleLink = document.getElementById("toggleAuthMode");
const authForm = document.getElementById("authForm");
const statusMessage = document.getElementById("statusMessage");

function setAuthMode(signUp) {
    isSignUpMode = signUp;
    statusMessage.textContent = "";

    if (isSignUpMode) {
        authTitle.textContent = "Your next trip starts here.";
        authSubtitle.textContent = "Sign up and unlock exclusive deals, travel inspiration, and trips you'll be talking about for years.";
        submitBtn.textContent = "Sign Up with Email";
        switchText.textContent = "Already have an account?";
        toggleLink.textContent = "Sign in";
    } else {
        authTitle.textContent = "Welcome back, traveler.";
        authSubtitle.textContent = "Sign in to access your saved trips and exclusive deals.";
        submitBtn.textContent = "Sign In";
        switchText.textContent = "Don't have an account?";
        toggleLink.textContent = "Sign up";
    }
}

toggleLink.addEventListener("click", (e) => {
    e.preventDefault();
    setAuthMode(!isSignUpMode);
});

authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("emailInput").value.trim();
    const password = document.getElementById("passwordInput").value;
    const users = JSON.parse(localStorage.getItem("jelajahin_users")) || [];

    if (isSignUpMode) {
        if (users.some((u) => u.email === email)) {
            statusMessage.textContent = "Email sudah terdaftar. Silakan Sign In.";
            return;
        }
        users.push({ email, password });
        localStorage.setItem("jelajahin_users", JSON.stringify(users));
        statusMessage.textContent = "Akun berhasil dibuat! Silakan Sign In.";
        authForm.reset();
    } else {
        const validUser = users.find((u) => u.email === email && u.password === password);
        if (validUser) {
            localStorage.setItem("currentUser", email);
            authForm.reset();
            MicroModal.close("modal-auth");

            document.querySelector(".nav-button").innerHTML = `
                <span>Halo, ${email.split("@")[0]}</span>
                <a href="#" onclick="location.reload()">Keluar</a>
            `;
        } else {
            statusMessage.textContent = "Email atau password salah.";
        }
    }
});

function socialAuth(provider) {
    statusMessage.textContent = `Menghubungkan ke ${provider}...`;
}