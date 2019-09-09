/** Função que executa os passos do jogo.
 * 
 * @param {Number} t -> Passado como parametro pela função requestAnimationFrame .
 */
function frames(t) {
    dt = (t - anterior) / 1000;
    limpar();
    if (!F0.limpa && !F0.flagPonto) {
        F0.print(context,dt);
    }
    anterior = t;
    requestAnimationFrame(frames);
}
var dt, anterior = 0;

requestAnimationFrame(frames);