const gorilaLifeEl = document.getElementById("gorila-life");
const gorilaHealthBar = document.getElementById("gorila-health");
const humanosCountEl = document.getElementById("humanos-count");
const battleLog = document.getElementById("battle-log");
const somAtaque = document.getElementById("som-ataque");

const btnAtacar = document.getElementById("attack-btn");
const btnDefender = document.getElementById("defend-btn");
const btnCurar = document.getElementById("heal-btn");
const btnReset = document.getElementById("reset-btn");

let gorilaLife = 100;
let humanosRestantes = 100;
let isDefending = false;

const humanosContainer = document.getElementById("humanos");

function criarHumanos() {
  humanosContainer.innerHTML = "";
  for (let i = 0; i < humanosRestantes; i++) {
    const img = document.createElement("img");
    img.src = "./assets/IconeLutador.png";
    img.alt = "Humano";
    img.className = "humano";
    humanosContainer.appendChild(img);
  }
}

function atualizarInterface() {
  gorilaLifeEl.textContent = gorilaLife;
  humanosCountEl.textContent = humanosRestantes;
  gorilaHealthBar.style.width = `${gorilaLife}%`;
}

function logar(msg) {
  const p = document.createElement("p");
  p.textContent = msg;
  battleLog.prepend(p);
}

function ataqueGorila() {
  if (humanosRestantes <= 0) return;

  somAtaque.play();
  const eliminados = Math.min(10, humanosRestantes);
  humanosRestantes -= eliminados;

  logar(`Gorila eliminou ${eliminados} humanos!`);
  criarHumanos();
  ataqueDosHumanos();
  checarFimDeJogo();
  atualizarInterface();
  salvarEstado();
}

function defesaGorila() {
  isDefending = true;
  logar("Gorila está se defendendo no próximo ataque!");
  ataqueDosHumanos();
  checarFimDeJogo();
  atualizarInterface();
  salvarEstado();
}

function curarGorila() {
  const cura = Math.floor(Math.random() * 10) + 5;
  gorilaLife = Math.min(100, gorilaLife + cura);
  logar(`Gorila se curou em ${cura}%`);
  ataqueDosHumanos();
  checarFimDeJogo();
  atualizarInterface();
  salvarEstado();
}

function ataqueDosHumanos() {
  if (humanosRestantes <= 0) return;

  let dano = Math.floor(Math.random() * 10) + 5;
  if (isDefending) {
    dano = Math.floor(dano / 2);
    isDefending = false;
  }

  gorilaLife -= dano;
  gorilaLife = Math.max(0, gorilaLife);
  logar(`Humanos causaram ${dano}% de dano no gorila!`);
}

function checarFimDeJogo() {
  if (gorilaLife <= 0) {
    logar("💀 O gorila foi derrotado pelos humanos!");
    desabilitarBotoes();
  } else if (humanosRestantes <= 0) {
    logar("🦍 O gorila venceu todos os 100 humanos!");
    desabilitarBotoes();
  }
}

function desabilitarBotoes() {
  btnAtacar.disabled = true;
  btnDefender.disabled = true;
  btnCurar.disabled = true;
}

function habilitarBotoes() {
  btnAtacar.disabled = false;
  btnDefender.disabled = false;
  btnCurar.disabled = false;
}

function reiniciarJogo() {
  gorilaLife = 100;
  humanosRestantes = 100;
  isDefending = false;
  battleLog.innerHTML = "";
  criarHumanos();
  atualizarInterface();
  habilitarBotoes();
  salvarEstado();
}

function salvarEstado() {
  localStorage.setItem("gorilaLife", gorilaLife);
  localStorage.setItem("humanosRestantes", humanosRestantes);
}

function carregarEstado() {
  const vida = localStorage.getItem("gorilaLife");
  const humanos = localStorage.getItem("humanosRestantes");

  if (vida !== null && humanos !== null) {
    gorilaLife = parseInt(vida);
    humanosRestantes = parseInt(humanos);
  }
}

btnAtacar.addEventListener("click", ataqueGorila);
btnDefender.addEventListener("click", defesaGorila);
btnCurar.addEventListener("click", curarGorila);
btnReset.addEventListener("click", reiniciarJogo);


document.addEventListener("keydown", (e) => {
  if (btnAtacar.disabled) return;

  if (e.key.toLowerCase() === "a") ataqueGorila();
  else if (e.key.toLowerCase() === "d") defesaGorila();
  else if (e.key.toLowerCase() === "c") curarGorila();
});


window.addEventListener("beforeunload", salvarEstado);


carregarEstado();
reiniciarJogo();
