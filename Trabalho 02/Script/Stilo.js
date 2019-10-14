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
var Hashing_Map = {};
const MAX_W_M = MAX_H_M = 10;
const MAX_W_L = MAX_H_L = 1;
const GRAV = 9;

function addHashing_Map(Key_ID,parans){
    Hashing_Map[Key_ID] = parans;
};

function getHashing_Map(Key_ID) {
    if (!Hashing_Map[Key_ID]) {
        throw new Error(`ERRO: Chave de mapa inválida: ${ID_MAP}!`);
    }
    return Hashing_Map[Key_ID];
};