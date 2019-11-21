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
        // console.log(`Spaw(coluna ${0} | linha ${0});Fim(coluna ${coluna} | linha ${linha});`);
        this.costrutivo();
    }else{
        throw new Error(`A fase já foi criada com os parametros (colunas ${maxH} | linhas ${maxW}) não é possivel sobrescrever-la.`);
    }
};

Fase.prototype.costrutivo = function (){
    console.log(`VETOR DO MAPA ANTES DO TRATAMENTO DE GERAÇÂO:`);
    console.log(this.vetMap);
    var vetDist = [];
    for (let coluna = 0; coluna < this.colunaFase; coluna++) {
        vetDist[coluna] = [];
        for (let linha = 0; linha < this.linhaFase; linha++) {
            vetDist[coluna][linha] = 0;
        }
    }
    this.distAux(vetDist);
    console.log(vetDist);
    console.log(`VETOR DO MAPA DEPOIS DO TRATAMENTO DE GERAÇÂO:`);
};

Fase.prototype.distAux = function (vetor) {
    let col,lin;
    for (var coluna = 0; coluna < this.colunaFase; coluna++) {
        for (var linha = 0; linha < this.linhaFase; linha++) {
            if (this.vetMap[coluna][linha] == P.Spaw) {
                col = coluna;
                lin = linha;
            }
        }
    }
    console.log(`Coluna ${col} | Linha ${lin}`);
    this.dist(vetor, col,lin, 0);
};

Fase.prototype.dist = function (vetor,coluna,linha,anterior) {
    if (coluna < this.colunaFase && linha < this.linhaFase) {
        if (this.vetMap[coluna][linha] == P.Spaw) {
            vetor[coluna][linha] = 0;
        }else{
            if (vetor[coluna][linha] < anterior) {
                vetor[coluna][linha] = anterior;
            }
        }
        this.dist(vetor,coluna+1,linha,anterior+1);
        this.dist(vetor,coluna,linha+1,anterior+1);
    }else{
        return;
    }
};