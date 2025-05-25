const gorilaLifeEl = document.getElementById("gorila-life");
const gorilaHealthBar = document.getElementById("gorila-health");
const humanosCountEl = document.getElementById("humanos-count");
const battleLog = document.getElementById("battle-log");
const somAtaque = document.getElementById("som-ataque"); // Audio element for attack sound

const btnAtacar = document.getElementById("attack-btn");
const btnDefender = document.getElementById("defend-btn");
const btnCurar = document.getElementById("heal-btn");
const btnReset = document.getElementById("reset-btn");

let gorilaLife = 100; // Gorilla's current life percentage
let humanosRestantes = 100; // Number of remaining humans
let isDefending = false; // Flag to check if gorilla is defending

const humanosContainer = document.getElementById("humanos"); // Container for human images

function criarHumanos() {
  humanosContainer.innerHTML = ""; // Clear existing humans
  for (let i = 0; i < humanosRestantes; i++) {
    const img = document.createElement("img");
    img.src = "./assets/IconeLutador.png"; // Path to human icon
    img.alt = "Humano"; // Alt text for accessibility
    img.className = "humano"; // CSS class for styling
    humanosContainer.appendChild(img);
  }
}