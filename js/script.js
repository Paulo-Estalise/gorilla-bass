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

function atualizarInterface()
{
    gorilaLifeEl.textContent = gorilaLife;
    humanosCountEl.textContent = humanosRestantes;
    gorilaHealthBar.style.width = '${gorilaLife}%';
}

function logar(msg){
  const p = document.createElement("p");
  p.textContent = msg;
  battleLog.prepend(p);
}
function ataqueGorila() {
  if (humanosRestantes <= 0) return;
  somAtaque.play();
  const eliminados = Math.min(10,humanosRestantes);
  humanosRestantes -= eliminados;
  
  logar('Gorila eliminou ${eliminados} humanos!');
  criarHumanos(); 
  ataqueDosHumanos(); 
  checarFimDeJogo(); 
  atualizarInterface(); 
}
function defesaGorila(); {
  isDefending = true;
  logar("Gorila está se defendendo no próximo ataque!");
  ataqueDosHumanos();
  checarFimDeJogo(); 
  atualizarInterface(); 
}
function curarGorila() {
  const cura = Math.floor(Math.random() * 10) + 5;
  gorilaLife = Math.min(100, gorilaLife + cura); 
  logar(`Gorila se curou em ${cura}%`); 
  ataqueDosHumanos(); 
  checarFimDeJogo(); 
  atualizarInterface();   
}  
function ataqueDosHumanos(){
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
}