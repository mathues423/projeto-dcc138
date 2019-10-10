// Constantes e configurações do canvas.

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

context.fillStyle = "black";
context.font = "15px sans-serif";

function limpa() {
    context.clearRect(0,0,canvas.width,canvas.height);
}

var dt = anterior = 0;

// Marron -> Preto -> Vermelho
const cores = ["#b87","#000","#800"];

//Hashing dos mapas B(16).
