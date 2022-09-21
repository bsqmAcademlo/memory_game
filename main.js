import { dataCards, showModal } from "./src/js/index.js";
import "./src/js/settings.js";
let winGame = false;

const cards = document.querySelector(".cards");
{
    const timeLoad = document.querySelector(".time_load");
    const RegresiveSeconds = document.querySelector(".RegresiveSeconds");

    let percent = 0;
    let seconds = Number(localStorage.getItem("settingSeconds")) || 60;
    const time = (1000 * seconds) / 100;

    RegresiveSeconds.textContent = seconds;

    const RegresiveInterval = setInterval(() => {
        RegresiveSeconds.textContent = seconds - 1;

        seconds--;

        if (winGame) {
            clearInterval(RegresiveInterval);
        }

        if (seconds === 0) {
            clearInterval(RegresiveInterval);
        }
    }, 1000);

    const GameOverForTime = setInterval(() => {
        percent++;
        timeLoad.style.transform = `translateX(-${percent}%)`;

        if (winGame) {
            clearInterval(GameOverForTime);
        }

        if (percent === 100) {
            clearInterval(GameOverForTime);
            showModal("Se te acabo el tiempo, Vuelve a iniciar", true);
        }
    }, time);
}

let arrayIndex = [];

let randomCard =
    dataCards[localStorage.getItem("settingConfig")] || dataCards["config_4"];

randomCard = randomCard.sort(() => Math.random() - 0.5);

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

function printCards() {
    let html = "";

    randomCard.forEach(({ icon, classIcon }, index) => {
        html += `
            <div class="card ${classIcon}" id="${index}">
                ${
                    classIcon === "down"
                        ? "<i class='icon bx bxs-lock bx-tada-hover'></i>"
                        : `<i class="${icon}"></i>`
                }
            </div>
        `;
    });

    cards.innerHTML = html;
}

function handleClick(e) {
    if (arrayIndex.length >= 2) return;

    const index = +e.target.parentElement.id;

    randomCard[index].classIcon = "up";
    printCards();

    arrayIndex.push(index);

    if (arrayIndex.length === 2) {
        setTimeout(() => {
            verifyIcon();

            if (randomCard.every((card) => card.classIcon === "select")) {
                winGame = true;
                showModal("Que bien, ganaste, quieres empezar de nuevo?");
            }
        }, 1000);
    }
}

function verifyIcon() {
    if (randomCard[arrayIndex[0]].icon === randomCard[arrayIndex[1]].icon) {
        randomCard[arrayIndex[0]].classIcon = "select";
        randomCard[arrayIndex[1]].classIcon = "select";

        arrayIndex.length = 0;

        printCards();

        return;
    }

    randomCard[arrayIndex[0]].classIcon = "down";
    randomCard[arrayIndex[1]].classIcon = "down";
    arrayIndex.length = 0;

    printCards();
}

cards.addEventListener("click", (e) => {
    if (e.target.classList.contains("icon")) {
        handleClick(e);
    }
});

printCards();
