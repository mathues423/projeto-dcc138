function Inimigo(args = {}) {
    var can = document.querySelector("canvas");
    var aux = 6*Math.random()+6;
    if (args.hpMax == undefined) {
        args.hpMax = 50;
    }
    var inimigo = {
        //Tamanho
        w: 30, 
        h: 30,

        //Movimento
        vx: 0,
        vy: 0,
        vm: 60,
        angulo: undefined,

        //Caracteristicas
        nome:"???",
        
        hpMax: b,
        hp: b,
        atkMin:1,
        atkMax:3,
        xp:0,
        lvl:1,
        morto: false,
        agressivo: false,
        conportamento: undefined,

        //Controles do Sprite
        sprite: undefined,
        norte: false,
        leste: false,
        
        //#Erro melhorar
        x: can.width / 3 + Math.random() * (2 / 3 * can.width - 40),
        y: can.height / 10 + Math.random() * (9 / 10 * can.height - 85),

        //Controles de tempo
        hprec: 2,
        hps:4,
        hpsAux:4,
        tempAndando: aux,
        tempAndandoAux: aux,
        tempParado: aux+3,
        tempParadoAux: aux+3,

        //Controle de movimentação
        
    };

    Object.assign(this,inimigo,args);
}

Inimigo.prototype = new Inimigo();
Inimigo.prototype.constructor = Inimigo;

/** Função que exibe o inimigo dando prioridade para ele mesmo, depois sua movimentação e por fim sua barra de vida.
 * 
 * @param {CanvasRenderingContext2D} ctx -> contexto do canvas (2D).
 * @param {Number} dt -> tempo do quadro em ms.
 */
Inimigo.prototype.inf = function(ctx,dt){
    var can = document.querySelector("canvas");
    this.desenhaPersonagem(ctx,dt);
    this.mover(dt,can);
};

/** Função que é responsável por desenhar o inimigo.
 * 
 * @param {CanvasRenderingContext2D} ctx -> contexto do canvas (2D).
 * @param {Number} dt -> tempo do quadro em ms.
 */
Inimigo.prototype.desenhaPersonagem = function (ctx,dt){
    if (this.sprite == undefined) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x,this.y,this.w,this.h);
    }else{
        if (this.tempAndandoAux > 0) {
            this.animacaoWalking(ctx,dt);
        }else if (this.tempParadoAux > 0) {
            this.animacaoIdle(ctx,dt);
        }
    }
};

/** Função que é responsável por mover o inimigo.
 * 
 * @param {Number} dt -> temdo do quadro em ms.
 * @param {HTMLCanvasElement} can -> canvas.
 */
Inimigo.prototype.mover = function (dt,can){
    if (this.tempParadoAux > 0) { // Animação Idle
        this.tempParadoAux -= dt;
        let ang = Math.random()*Math.PI*2;

        if( Math.sin(ang) >= 0){ //Nort
            this.norte = true;
        }else{
            this.norte = false;
        }

        if (Math.cos(ang) >= 0){// Leste
            this.leste = true;
        }else{
            this.leste = false;
        }
        this.angulo = ang;
        return;
    } 
    if (this.tempAndandoAux > 0) { // Animação Walking
        this.tempAndandoAux -= dt;

        this.vx = this.vm * Math.sin(this.angulo);
        this.vy = this.vm * Math.cos(this.angulo);

        if ((this.x + this.vx * dt + this.w) < can.width && (this.x + this.vx * dt) >= 0) {
            this.x = this.x + this.vx * dt;
        }
        if ((this.y + this.vy * dt + this.h) < can.height-55 && (this.y + this.vy * dt) >= 0) {
            this.y = this.y + this.vy * dt;
        }
        return;
    }

    this.tempAndandoAux = this.tempAndando;
    this.tempParadoAux = this.tempParado;
};

/** Função que é responsável por fazer a animação do inimigo quando ele andar.
 * 
 * @param {CanvasRenderingContext2D} ctx -> contexto do canvas (2D).
 * @param {Number} dt -> tempo do quadro em ms.
 */
Principal.prototype.animacaoWalking = function(ctx,dt){

};

/** Função que é responsável por fazer a animação do inimigo quando ele ficar parado.
 * 
 * @param {CanvasRenderingContext2D} ctx -> contexto do canvas (2D).
 * @param {Number} dt -> tempo do quadro em ms.
 */
Principal.prototype.animacaoIdle = function(ctx,dt){

};