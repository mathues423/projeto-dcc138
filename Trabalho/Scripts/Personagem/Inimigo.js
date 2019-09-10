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
        hpMax: args.hpMax,
        hp: args.hpMax,
        atkMin:1,
        atkMax:3,
        xp:0,
        lvl:1,
        morto: false,
        agressivo: false,
        comportamento: undefined,

        //Controles do Sprite
        sprite: undefined,
        norte: false,
        leste: false,
        passo: 0,
        tempSprite : 0.15,
        tempSpriteAux : 0.15,

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
        var img = new Image();
        img.src = this.sprite;
        ctx.save();
        if (this.tempParadoAux > 0) {
            this.animacaoIdle(ctx,dt,img);
        }else if (this.tempAndandoAux > 0) {
            this.animacaoWalking(ctx,dt,img);
        }
        ctx.restore();
    }
    ctx.strokeRect(this.x,this.y, this.w,this.h);
};

/** Função que é responsável por fazer a animação do inimigo quando ele ficar parado.
 * 
 * @param {CanvasRenderingContext2D} ctx -> contexto do canvas (2D).
 * @param {Number} dt -> tempo do quadro em ms.
 * @param {Image} img -> tempo do quadro em ms.
 */
Inimigo.prototype.animacaoIdle = function(ctx,dt,img){
    this.tempSpriteAux -= dt;
    let nort = 235,west = 1;
    if (this.tempSpriteAux < 0) {
        this.tempSpriteAux = this.tempSprite;
        this.passo= (this.passo+1)%4;
    }

    var can = document.querySelector("canvas");
    if (this.leste) {
        ctx.scale(-1,1);
        west = -1;
    }else{
        ctx.scale(1,1);
    }
    
    if (this.norte) {
        // ctx.drawImage(img, 60 * this.passo + nort, 0, 60, 60, (this.x)*west, this.y-7, this.w*1.3, this.h*1.3);
        if (west == -1) {
            ctx.drawImage(img, 60 * this.passo+ nort, 0, 60, 60, (this.x)*west-4-this.w, this.y-7, this.w*1.3, this.h*1.3);
        } else {
            ctx.drawImage(img, 60 * this.passo+ nort, 0, 60, 60, (this.x)*west-4, this.y-7, this.w*1.3, this.h*1.3);
        }
    }else{
        // ctx.drawImage(img, 60 * this.passo, 0, 60, 60, (this.x)*west, this.y-7, this.w*1.3, this.h*1.3);
        if (west == -1) {
            ctx.drawImage(img, 60 * this.passo, 0, 60, 60, (this.x)*west-4-this.w, this.y-7, this.w*1.3, this.h*1.3);
        } else {
            ctx.drawImage(img, 60 * this.passo, 0, 60, 60, (this.x)*west-4, this.y-7, this.w*1.3, this.h*1.3);
        }
    }
    if (west == -1) {
        ctx.translate(-can.width,can.height);
    }
};

/** Função que é responsável por fazer a animação do inimigo quando ele andar.
 * 
 * @param {CanvasRenderingContext2D} ctx -> contexto do canvas (2D).
 * @param {Number} dt -> tempo do quadro em ms.
 * @param {Image} img -> imagem do inimigo.
 */
Inimigo.prototype.animacaoWalking = function(ctx,dt,img){
    this.tempSpriteAux -= dt;
    let nort = 60,west = 1;
    if (this.vy>0) { // Norte
        this.norte = false;
    } else if(this.vx == 0){
    }else{
        this.norte = true;
    }

    if (this.vx > 0) { // Leste
        this.leste = true;
    } else if(this.vy == 0){
    }else{
        this.leste = false;
    }

    if (this.tempSpriteAux < 0) {
        this.tempSpriteAux = this.tempSprite;
        this.passo = (this.passo+1)%8;
    }

    if (this.leste) {
        ctx.scale(-1,1);
        west = -1;
    }else{
        ctx.scale(1,1);
    }

    if (this.norte) {
        // ctx.drawImage(img, 52.5 * this.passo, 60 + nort, 52.5, 60, (this.x-4), this.y-7, this.w*1.3, this.h*1.3);
        if (west == -1) {
            ctx.drawImage(img, 52.5 * this.passo, 60 + nort, 52.5, 60, (this.x)*west-4-this.w, this.y-7, this.w*1.3, this.h*1.3);
        } else {
            ctx.drawImage(img, 52.5 * this.passo, 60 + nort, 52.5, 60, (this.x)*west-4, this.y-7, this.w*1.3, this.h*1.3);
        }
    }else{
        // ctx.drawImage(img, 55 * this.passo, 60, 55, 60, (this.x-4), this.y-7, this.w*1.3, this.h*1.3);
        if (west == -1) {
            ctx.drawImage(img, 55 * this.passo, 60, 55, 60, (this.x)*west-4-this.w, this.y-7, this.w*1.3, this.h*1.3);
        } else {
            ctx.drawImage(img, 55 * this.passo, 60, 55, 60, (this.x)*west-4, this.y-7, this.w*1.3, this.h*1.3);
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
        this.angulo = Math.random()*(360);
        return;
    } 
    if (this.tempAndandoAux > 0) { // Animação Walking
        this.tempAndandoAux -= dt;

        this.vx = this.vm * Math.sin(this.angulo * Math.PI/180);
        this.vy = this.vm * Math.cos(this.angulo * Math.PI/180);

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