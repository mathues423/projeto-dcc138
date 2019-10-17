var i=0;
/** Função que executa os passos do jogo.
 * 
 * @param {Number} t -> Passado como parametro pela função requestAnimationFrame .
 */
function frames(t) {
    dt = (t - anterior) / 1000;
    limpar();
    if (Game[i]!=null) {
        if (Game[i].Principal.morto) {
            alert("You Lose.");
            cancelAnimationFrame(1);
            GameOver();
            return;
        }
        if (Game[i].flagCompleta) {
            i++;
            if (Game[i] != null) {
                Game[i].Principal = principal;
            }
        }else if (assest.progresso){
            Game[i].print(context,dt);
        }
    }else{
        alert("You Win.");
        cancelAnimationFrame(1);
        return;
    }
    // context.fillText(dt, 100,100);
    anterior = t;
    requestAnimationFrame(frames);
}
var dt, anterior = 0;

requestAnimationFrame(frames);

function GameOver() {
    //Desenha Game Over
}