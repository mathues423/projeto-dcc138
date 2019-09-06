var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

canvas.width = 1340;
canvas.height = 550;

function limpar() {
    context.clearRect(0,0, canvas.width,canvas.height);
}
