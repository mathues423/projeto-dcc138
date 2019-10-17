var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
context.save();
canvas.width = 1320;
canvas.height = 570;

/** Função que é responsável por limpar a tela.
 * 
 */
function limpar() {
    context.clearRect(0,0, canvas.width,canvas.height);
}
