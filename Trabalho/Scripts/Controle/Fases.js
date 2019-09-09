function Fase(params = {}) {
    var can = document.querySelector("canvas");
    fase = {
        Principal: undefined,
        inimigos: [],
        limpa: false,
        ponto: { x: can.width - 40, y: can.height / 2 - 25, w: 25, h: 25, cor: "green" },
        flagPonto: false,
        animation: 5,
    };

    Object.assign(this, fase, params);
}

Fase.prototype = new Fase();
Fase.prototype.constructor = Fase;
/** Função que comanda como os objetos serão executados dando a prioridade para o inimigo.
 * 
 * @param {CanvasRenderingContext2D} ctx -> contexto do canvas (2D).
 * @param {Number} dt -> tempo do quadro em ms.
 */
Fase.prototype.print = function (ctx, dt) {
    if (this.verifica(ctx, dt)) {
        this.Principal.inf(ctx, dt);
    } else {
        this.flagPonto = true;
    }
};

/** Função que verifica se o jogador limpou e chegou no ponto para passar de fase.
 * 
 * @param {CanvasRenderingContext2D} ctx -> contexto do canvas (2D).
 * @param {Number} dt -> tempo do quadro em ms.
 * @returns {Boolean} -> True se tiver passado de fase, False caso não.
 */
Fase.prototype.verifica = function (ctx, dt) {
    if (this.inimigos[0] == null) {
        this.draw(ctx, dt);
        let flagX = false, flagY = false;
        if ((this.Principal.x + Math.round(this.Principal.w / 2)) > this.ponto.x && (this.Principal.x + Math.round(this.Principal.w / 2)) < this.ponto.x + this.ponto.w) {
            flagX = true;
        }
        if ((this.Principal.x + Math.round(this.Principal.w / 2)) > this.ponto.x && (this.Principal.x + Math.round(this.Principal.w / 2)) < this.ponto.x + this.ponto.w) {
            flagY = true;
        }

        if (flagX && flagY) {
            return false;
        }
        return true;
    }
    return true;
};

/** Função que desenha o ponto onde o jogador deve chegar.
 * 
 * @param {CanvasRenderingContext2D} ctx -> contexto do canvas (2D).
 * @param {Number} dt -> tempo do quadro em ms.
 */
Fase.prototype.draw = function (ctx, dt) {
    this.animation = this.animation - dt;
    if (this.animation < 0) {
        this.animation = 5;
    }
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.ponto.x, this.ponto.y, this.ponto.w, this.ponto.h);

    ctx.fillStyle = this.ponto.cor;
    ctx.fillRect(
    this.ponto.x + (this.ponto.w / 2 - this.ponto.w / 10 * this.animation), 
    this.ponto.y + (this.ponto.h / 2 - this.ponto.h / 10 * this.animation),

    this.ponto.w * this.animation / 5, this.ponto.h * this.animation / 5);
};

/** Função que verifica se o jogador limpou e chegou no ponto para passar de fase
 * 
 * @param {Number} id -> Id dos mostros a serem inceridos.
 * 0 -> Green Slime; 
 * 
 * @param {Number} quantidade -> tempo do quadro em ms.
 */
Fase.prototype.insere = function(id,quantidade){
    for (let i = 0; i < quantidade; i++) {
        switch (id) {
            case 0:
                let A = new Inimigo();
                this.inimigos.push(A);
                break;
        
            default:
                break;
        }
    }
};