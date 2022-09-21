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
