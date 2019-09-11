var i=0;
/** Função que executa os passos do jogo.
 * 
 * @param {Number} t -> Passado como parametro pela função requestAnimationFrame .
 */
function frames(t) {
    dt = (t - anterior) / 1000;
    limpar();
    if (Game[i]!=null) {
        if (Game[i].flagCompleta) {
            i++;
        }else{
            Game[i].print(context,dt);
        }
    }else{
        alert("You Win.");
        cancelAnimationFrame(1);
    }
    // if (!F0.flagCompleta) {
    //     F0.print(context,dt);
    // }
    anterior = t;
    requestAnimationFrame(frames);
}
var dt, anterior = 0;

requestAnimationFrame(frames);