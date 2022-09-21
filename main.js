import { randomCard, showModal } from "./src/js/index.js";
let winGame = false;

const cards = document.querySelector(".cards");
const timeLoad = document.querySelector(".time_load");
const RegresiveSeconds = document.querySelector(".RegresiveSeconds");

let percent = 0;
let seconds = 60;
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

let arrayIndex = [];

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
