function Fase(params = {}) {
    var can = document.querySelector("canvas");
    fase = {
        Principal: undefined,
        inimigos: [],
        limpa: false,
        flagPonto: false,
        flagCompleta: false,
        animation: 5,
        spaw: false,
        map: undefined,
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
    this.drawMap();
    if (!this.spaw) { // Spaw
        var can = document.querySelector("canvas");
        this.Principal.x = 50;
        this.Principal.y = can.height/2-30;
        this.Principal.marcaX = -1;
        this.Principal.marcaY = -1;
        this.Principal.posiL= 8;
        this.Principal.posiC = 1;
        this.Principal.inimigos = this.inimigos;
        this.spaw = true;
    }
    this.verifica(ctx, dt);
    for (let i = 0; this.limpa!=true && i < this.inimigos.length; i++) {
        this.inimigos[i].inf(ctx,dt,this.Principal,this.map);
        if(this.morto(i)){
            i--;
        }
    }
    this.Principal.inf(ctx, dt,this.map);
    if (this.flagPonto && this.limpa) {
        this.flagCompleta = true;
    }
};

/** Função que verifica se o jogador limpou e chegou no ponto para passar de fase.
 * 
 * @param {CanvasRenderingContext2D} ctx -> contexto do canvas (2D).
 * @param {Number} dt -> tempo do quadro em ms.
 */
Fase.prototype.verifica = function (ctx, dt) {
    if (!this.limpa && this.inimigos[0] == null || this.inimigos[0] == undefined) {
        this.limpa = true;
        for (let index = 0; index < this.map.Portas.length; index++) {
            this.map.Mapa[this.map.Portas[index].coluna][this.map.Portas[index].linha] = 2;
        }
    }
    if (this.limpa) {
        for (let index = 0; index < this.map.Portas.length; index++) {
            if (this.Principal.posiL == this.map.Portas[index].linha && this.Principal.posiC == this.map.Portas[index].coluna) {
                this.flagPonto = true;
            }
        }
    }
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
                var I0 = new Inimigo({nome: "Green Slime", sprite: assest.getImg("Green_Slime").src,});
                this.inimigos.push(I0);
                break;
        
            default:
                break;
        }
    }
};

/** Função que verifica se o inimigo esta morto e o remove da fase.
 * 
 * @param {Number} index -> posição do inimigo no vetor.
 * @returns True se tiver morto, false caso não.
 */
Fase.prototype.morto = function(index){
    if (this.inimigos[index]) {
        if (!this.inimigos[index].itsLife) {
            this.Principal.xp += this.inimigos[index].xp;
            this.inimigos.splice(index,1);
            this.Principal.index = -1;    
            return true;
        }
    }
    return false;
};

Fase.prototype.drawMap = function(){
    var context = document.querySelector("canvas").getContext("2d");
    if (this.map) {
        this.map.drawMapa(context, this.Principal);
    }else{
        throw new Error("Não adicionado map");
    }
};