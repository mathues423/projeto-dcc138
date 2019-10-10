// Controla qual a exibição a ser exibida.
class Menu {
    constructor() {
        this.Ativo = true;
        this.draw = drawMenu();
        this.Frase = ["Aperte espaço"];
        this.canals = [];
        this.tempAni = 2;
        this.tempAniAux = 2;
        this.tempAniR = 40;
        this.tempAniRAux = 1;
        this.vezes = 1;
        this.tempB = 1;
        this.pisc = 1;
        this.song = new Audio("Extras/Son/Raio.ogg");
        this.song.load();
        this.fundo = new Image();
        this.boolImg = false;
        addEventListener("keydown", function (e) {
            if(e.keyCode === 32){
                M.Ativo = false;
            }
        });
        this.fundo.addEventListener("load", function (){M.boolImg = true});
        for (let i = 0; i < 2; i++) {
            this.canals[i] = {
                audio : new Audio(),
                fim : -1
            };
        }
        this.fundo.src = "Extras/Img/castleMenu.jpg";
    };
    t
    Play(){
        for(var i =0; i< 4; i++){
            var agora = new Date();
            if(this.canals[i].fim < agora.getTime()){
                this.canals[i].audio.src = this.song.src;
                this.canals[i].fim = agora.getTime()+this.song.duration*1000;
                this.canals[i].audio.play();
                break;
            }
        }
    };
    Anima(dt){
        context.fillStyle = "white";
        context.fillRect(0,0, canvas.width,canvas.height);
    };

};

const M = new Menu();

function Jogo(temp) {
    context.save();
    dt = (temp - anterior) / 1000;
    limpa();
    if (M.Ativo && M.song != undefined && M.boolImg) {// Aparece o menu.
        M.draw(dt);
    }else if(!M.Ativo){ // Roda o jogo.
        
    }
    // context.fillText(`Dt: < ${Math.round(dt*1000)} >`,20,20);
    anterior = temp;
    
    context.restore();
    requestAnimationFrame(Jogo);
}

requestAnimationFrame(Jogo);

function drawMenu(dt) {
    return function (dt) {
        context.drawImage(this.fundo,0,0 ,canvas.width,canvas.height+50);
        context.fillText(`Dt: < ${Math.round(dt*1000)} >`,20,20);
        context.font = "30px sans-serif";
        context.fillStyle = "white";
        context.fillText(this.Frase, canvas.width/2-4*30, canvas.height-80);
        this.tempAniRAux -= dt;
        if (this.tempAniRAux < 0) {
            this.tempAniAux -= dt;
            if (this.tempAniAux < 0) {
                this.tempAniAux = this.tempAni;
                this.Anima(dt);
                this.Play();
                this.vezes--;
            }
            if (this.vezes <= 0) {
                if (Math.random() < 0.20) {
                 this.vezes = this.pisc = 2;   
                }else{
                    this.vezes = this.pisc = 1;
                }
                this.tempAniRAux = this.tempAniR;
            }
        }
    }
}