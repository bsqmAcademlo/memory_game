const cards = document.querySelector(".cards");

const optionsChrono = document.querySelector(".optionsChrono");
const optionsConfig = document.querySelector(".optionsConfig");

const chronomether = document.querySelector("#chronomether");
const config = document.querySelector("#config");

chronomether.addEventListener("click", () => {
    optionsConfig.classList.remove("settingsView");
    optionsChrono.classList.toggle("settingsView");
});

config.addEventListener("click", () => {
    optionsChrono.classList.remove("settingsView");
    optionsConfig.classList.toggle("settingsView");
});

optionsChrono.addEventListener("click", (e) => {
    if (e.target.classList.contains("opt")) {
        const op = e.target.id.split("_")[1];

        localStorage.setItem("settingSeconds", op);

        window.location.reload();
    }
});

optionsConfig.addEventListener("click", (e) => {
    if (e.target.classList.contains("opt")) {
        const op = e.target.id;

        localStorage.setItem("settingConfig", op);

        window.location.reload();
    }
});

if (localStorage.getItem("settingConfig") === "config_8") {
    cards.style.gridTemplateColumns = "repeat(8, 1fr)";
    cards.style.gridTemplateRows = "repeat(8, 1fr)";
    cards.style.width = "400px";
    cards.style.height = "400px";
} else if (localStorage.getItem("settingConfig") === "config_6") {
    cards.style.gridTemplateColumns = "repeat(6, 1fr)";
    cards.style.gridTemplateRows = "repeat(6, 1fr)";
    cards.style.width = "300px";
    cards.style.height = "300px";
} else {
    cards.style.gridTemplateColumns = "repeat(4, 1fr)";
    cards.style.gridTemplateRows = "repeat(4, 1fr)";
    cards.style.width = "200px";
    cards.style.height = "200px";
}
