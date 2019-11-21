function Fase(params = {},col,linha) {
    // var can = document.querySelector("canvas");
    fase = {
        Principal: undefined,
        inimigos: [],
        limpa: false,
        flagPonto: false,
        flagCompleta: false,
        animation: 5,
        spaw: false,
        map: undefined,
        vetMap: undefined,
        vetDist: undefined,
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
        this.map.SpawPrincipal(this.Principal,8,1);
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
        this.spaw = false;
    }
};

/** Função que verifica se o jogador limpou e chegou no ponto para passar de fase.
 * 
 * @param {CanvasRenderingContext2D} ctx -> contexto do canvas (2D).
 * @param {Number} dt -> tempo do quadro em ms.
 */
Fase.prototype.verifica = function (ctx, dt) {
    if (!this.limpa && this.inimigos == null || this.inimigos == undefined) {
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

/** Função que é responsavel por criar a fese e so é chamada uma vez.
 * 
 * @param {Number} maxH -> Define o numero de #linhas.
 * @param {Number} maxW -> Define o numero de #colunas.
 * @throws Se a fase já foi criada.
 */
Fase.prototype.criaFase = function(maxH,maxW){
    if (!this.criada) {
        // this.criada = true;
        this.vetMap = [];
        this.linhaFase = maxH;
        this.colunaFase = maxW;
        for (let coluna = 0; coluna < maxW; coluna++) {
            this.vetMap[coluna] = [];
            for (let linha = 0; linha < maxH; linha++) {
                this.vetMap[coluna][linha] = undefined;
                // if (coluna == 0 && linha == 0) { // Deixar espaw aleatorio?
                //     this.vetMap[coluna][linha] = P.Spaw;   
                // }
            }
        }
        let coluna = Math.floor(Math.random()*(this.colunaFase-1))+1;
        let linha = Math.floor(Math.random()*(this.linhaFase-1))+1;
        this.vetMap[coluna][linha] = P.FimBranco;

        coluna = Math.floor(Math.random()*(this.colunaFase-1));
        this.vetMap[coluna][0] = P.Spaw;

        console.log(`Criada com colunas ${maxH} | linhas ${maxW}`);
        this.costrutivo();
    }else{
        throw new Error(`A fase já foi criada com os parametros (colunas ${maxH} | linhas ${maxW}) não é possivel sobrescrever-la.`);
    }
};

Fase.prototype.costrutivo = function (){
    let colSpaw,linSpaw;
    let colFim,linFim;
    for (let coluna = 0; coluna < this.colunaFase; coluna++) {
        for (let linha = 0; linha < this.linhaFase; linha++) {
            if (this.vetMap[coluna][linha] == P.Spaw) {
                colSpaw = coluna;
                linSpaw = linha;
                coluna = this.colunaFase;
                linha = this.linhaFase;
            }
        }
    }
    console.log(`Spaw : Coluna ${colSpaw} | Linha ${linSpaw}`);
    console.log(`VETOR DO MAPA ANTES DO TRATAMENTO DE GERAÇÂO:`);
    console.log(this.vetMap);
    this.vetDist = [];
    for ( coluna = 0; coluna < this.colunaFase; coluna++) {
        this.vetDist[coluna] = [];
        for ( linha = 0; linha < this.linhaFase; linha++) {
            this.vetDist[coluna][linha] = Infinity;
        }
    }
    this.distAux(colSpaw,linSpaw);
    for (coluna = 0; coluna < this.colunaFase; coluna++) {
        for (linha = 0; linha < this.linhaFase; linha++) {
            if (this.vetMap[coluna][linha] == P.FimBranco) {
                colFim = coluna;
                linFim = linha;
                coluna = this.colunaFase;
                linha = this.linhaFase;
            }
        }
    }
    console.log(`Fim : Coluna ${colFim} | Linha ${linFim}`);
    // console.log(this.vetDist);
    console.log(`VETOR DO MAPA DEPOIS DO TRATAMENTO DE GERAÇÂO:`);
    console.log(this.vetMap);
};

Fase.prototype.distAux = function (col,lin) {
    this.dist(col,lin,0, +1,+1);
    this.dist(col,lin,0, -1,+1);
    this.dist(col,lin,0, +1,-1);
    this.dist(col,lin,0, -1,-1);
};

Fase.prototype.dist = function (col,lin,anterior,numC,numL) {
    if (col < 0 || col >= this.colunaFase || lin < 0 || lin >= this.linhaFase) {
        return;
    }
    if (this.vetDist[col][lin] < anterior) {
        return;
    }
    this.vetDist[col][lin] = anterior; 
    this.dist(col+numC, lin, anterior+1, numC, numL);
    this.dist(col, lin+numL, anterior+1, numC, numL);
};