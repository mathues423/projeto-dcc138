function Fase(params = {},col,lin, Objetivos) {
    // var can = document.querySelector("canvas");
    fase = {
        Principal: undefined,
        inimigos: [],
        limpa: false,
        flagPonto: false,
        flagCompleta: false,
        animation: 5,
        spaw: false,
        vetMap: undefined,
        vetDist: undefined,
        colunaFase: col,
        linhaFase: lin,
        Objetivos: Objetivos,
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
    if (!this.criada) {
        this.criaFase(this.Objetivos);
    }
    this.drawMap();
    if (!this.spaw) { // Spaw
        this.vetMap[this.yAtual][this.xAtual].SpawPrincipal(this.Principal,8,1);
        this.Principal.inimigos = this.inimigos;
        this.spaw = true;
    }
    this.verifica(ctx, dt);
    
    this.vetMap[this.yAtual][this.xAtual].drawMapa(context, this.Principal);
    for (let i = 0; this.vetMap[this.yAtual][this.xAtual].completa!=true && i < this.vetMap[this.yAtual][this.xAtual].inimigos.length; i++) {
        this.vetMap[this.yAtual][this.xAtual].inimigos[i].inf(ctx,dt,this.Principal,this.vetMap[this.yAtual][this.xAtual]);
        if(this.morto(i)){
            i--;
        }
    }
    this.Principal.inf(ctx, dt,this.vetMap[this.yAtual][this.xAtual]);
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
    if (!this.vetMap[this.yAtual][this.xAtual].completa && (this.vetMap[this.yAtual][this.xAtual].inimigos == null || this.vetMap[this.yAtual][this.xAtual].inimigos == undefined || this.vetMap[this.yAtual][this.xAtual].inimigos == [])) {
        this.vetMap[this.yAtual][this.xAtual].completa = true;
        for (let index = 0; index < this.vetMap[this.yAtual][this.xAtual].Portas.length; index++) {
            this.vetMap[this.yAtual][this.xAtual].Mapa[this.vetMap[this.yAtual][this.xAtual].Portas[index].coluna][this.vetMap[this.yAtual][this.xAtual].Portas[index].linha] = 2;
        }
    }
    if (this.vetMap[this.yAtual][this.xAtual].completa) {
        for (let index = 0; index < this.vetMap[this.yAtual][this.xAtual].Portas.length; index++) {
            if (this.Principal.posiL == this.vetMap[this.yAtual][this.xAtual].Portas[index].linha && this.Principal.posiC == this.vetMap[this.yAtual][this.xAtual].Portas[index].coluna) {
                this.Principal.spaw = false;
                console.log(`Porta : ${this.vetMap[this.yAtual][this.xAtual].Portas[index]} |#| `);
                if(this.vetMap[this.yAtual][this.xAtual].Portas[index].proxSala.direita != undefined){
                    this.vetMap[this.yAtual][this.xAtual].SpawPrincipal(this.Principal, this.vetMap[this.yAtual][this.xAtual].Portas[index].coluna, 2);
                    this.xAtual++;
                    return;
                }
                if(this.vetMap[this.yAtual][this.xAtual].Portas[index].proxSala.esquerda != undefined){
                    this.vetMap[this.yAtual][this.xAtual].SpawPrincipal(this.Principal,this.vetMap[this.yAtual][this.xAtual].Portas[index].coluna, this.vetMap[this.yAtual][this.xAtual].linha-3);
                    this.xAtual--;
                    return;
                }
                if(this.vetMap[this.yAtual][this.xAtual].Portas[index].proxSala.cima != undefined ){
                    this.vetMap[this.yAtual][this.xAtual].SpawPrincipal(this.Principal,2, this.vetMap[this.yAtual][this.xAtual].Portas[index].linha);
                    this.yAtual++;
                    return;
                }
                if(this.vetMap[this.yAtual][this.xAtual].Portas[index].proxSala.baixo != undefined){
                    this.vetMap[this.yAtual][this.xAtual].SpawPrincipal(this.Principal,this.vetMap[this.yAtual][this.xAtual].coluna-3, this.vetMap[this.yAtual][this.xAtual].Portas[index].linha);
                    this.yAtual--;
                    return;
                }
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
 * ? -> Defaut;
 */
Fase.prototype.insere = function(id){
    switch (id) {
    case 0:
        var I0 = new Inimigo({nome: "Green Slime", sprite: assest.getImg("Green_Slime").src,});
        this.inimigos.push(I0);
        break;
        
    default:
        throw new Erro(`O ID(${id}) passado não está presente no vetor de inimigos.`);
        break;
    }
};

/** Função que verifica se o jogador limpou e chegou no ponto para passar de fase
 * 
 * @param {Number} id -> Id dos mostros a serem inceridos.
 * 0 -> Green Slime; 
 * ? -> Defaut;
 */
Fase.prototype.busca = function(id){
    switch (id) {
    case 0:
        var I0 = new Inimigo({nome: "Green Slime", sprite: assest.getImg("Green_Slime").src,});
        return I0;
        
    default:
        throw new Erro(`O ID(${id}) passado não está presente no vetor de inimigos.`);
    }
};

/** Função que verifica se o inimigo esta morto e o remove da fase.
 * 
 * @param {Number} index -> posição do inimigo no vetor.
 * @returns True se tiver morto, false caso não.
 */
Fase.prototype.morto = function(index){
    if (this.vetMap[this.yAtual][this.xAtual].inimigos[index]) {
        if (!this.vetMap[this.yAtual][this.xAtual].inimigos[index].itsLife) {
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
    if (this.vetMap) {
        this.vetMap[this.yAtual][this.xAtual].drawMapa(context, this.Principal);
    }else{
        throw new Error("Não adicionado map");
    }
};

/** Função que é responsavel por criar a fese e so é chamada uma vez.
 * 
 * @param {Mapa} Mapas -> Quais objetivos gostaria de adicionar na fase.
 * @throws Se a fase já foi criada.
 */
Fase.prototype.criaFase = function(Mapas){
    if (!this.criada) {
        this.criada = true;
        this.vetMap = [];
        // this.linhaFase = maxH;
        // this.colunaFase = maxW;
        for (let coluna = 0; coluna < this.colunaFase; coluna++) {
            this.vetMap[coluna] = [];
            for (let linha = 0; linha < this.linhaFase; linha++) {
                this.vetMap[coluna][linha] = undefined;
            }
        }
        let coluna = Math.floor(Math.random()*(this.colunaFase-1))+1;
        let linha = Math.floor(Math.random()*(this.linhaFase-this.linhaFase/2))+Math.floor(this.linhaFase/2);
        this.vetMap[coluna][linha] = P.FimBranco;
        this.xF = linha;
        this.yF = coluna;
        coluna = Math.floor(Math.random()*(this.colunaFase-1));
        this.vetMap[coluna][0] = P.SpawBranco;
        this.xAtual = this.xI = 0;
        this.yAtual = this.yI = coluna;
        for (let i = 0; (Mapas != undefined && Mapas != null) &&  i < Mapas.length;) {  // Caso queira adicionar mais objetivos na Fase
            coluna = Math.floor(Math.random()*(this.colunaFase-1))+1;
            linha = Math.floor(Math.random()*(this.linhaFase-1))+1;
            if(this.vetMap[coluna][linha] == undefined){
                this.vetMap[coluna][linha] = Mapas[i];
                i++;
            }
        }

        console.log(`Criada com colunas ${this.colunaFase} | linhas ${this.linhaFase}`);
        this.restricao(Mapas);
    }else{
        throw new Error(`\r\nA fase já foi criada com os parametros (colunas ${this.colunaFase} | linhas ${this.linhaFase}) não é possivel sobrescrever-la.`);
    }
};

/** Função que é responsavel por achar a menor distancia entre dois pontos e fazer uma matriz com essas distancias.
 * 
 * @param {Number} inicio O ponto inicial.
 * @param {Number} fim O ponto que será ligado ate o ponto inicio.
 */
Fase.prototype.distanciaEntrePontos = function (inicio, fim){
    let colSpaw  = linSpaw = -1;
    let colFim = linFim = -1;
    for (let coluna = 0; coluna < this.colunaFase; coluna++) {
        for (let linha = 0; linha < this.linhaFase; linha++) {
            if (this.vetMap[coluna][linha] == inicio) {
                colSpaw = coluna;
                linSpaw = linha;
                coluna = this.colunaFase;
                linha = this.linhaFase;
            }
        }
    }
    this.vetDist = [];
    for ( coluna = 0; coluna < this.colunaFase; coluna++) {
        this.vetDist[coluna] = [];
        for ( linha = 0; linha < this.linhaFase; linha++) {
            this.vetDist[coluna][linha] = Infinity;
        }
    }

    if (colSpaw == -1 && linSpaw == -1) {
        throw new Erro(`O parametro passado ${inicio} não está no mapa.`);
    }
    this.distAux(colSpaw,linSpaw);

    for (coluna = 0; coluna < this.colunaFase; coluna++) {
        for (linha = 0; linha < this.linhaFase; linha++) {
            if (this.vetMap[coluna][linha] == fim) {
                colFim = coluna;
                linFim = linha;
                coluna = this.colunaFase;
                linha = this.linhaFase;
            }
        }
    }
    
    if (colFim == -1 && linFim == -1) {
        throw new Erro(`O parametro passado ${fim} não está no mapa.`);
    }
    console.log(`Inicio : Coluna ${colSpaw} | Linha ${linSpaw}`);
    console.log(`Fim : Coluna ${colFim} | Linha ${linFim}`);
    // console.log(this.vetDist);
    
    let sair = marcX = marcY = false; // Melhorar
    while (!(marcX && marcY)) {
        if (colFim != colSpaw) {
            if (colFim > colSpaw) {
                colFim--;
            }else{
                colFim++;
            }
            if (this.vetMap[colFim][linFim] != P.SpawBranco) {
                this.vetMap[colFim][linFim] = P.MapaBranco;
            }
        }else{
            marcX = true;
        }
        if (linFim != linSpaw) {
            if (linFim > linSpaw) {
                linFim--;
            }else{
                linFim++;
            }
            if (this.vetMap[colFim][linFim] != P.SpawBranco) {
                this.vetMap[colFim][linFim] = P.MapaBranco;
            }
        }else{
            marcY = true;
        }
    }
};

/** Controla o preenchimento da matriz.
 * 
 */
Fase.prototype.distAux = function (col,lin) {
    this.dist(col,lin,0, +1,+1);
    this.dist(col,lin,0, +1,-1);
    this.dist(col,lin,0, -1,+1);
    this.dist(col,lin,0, -1,-1);
};

/** Preenche a matriz.
 * 
 */
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

/** Exibe o mapa em vetor com o nome.
 * 
 */
Fase.prototype.PrintMap = function(){
    let a = `\r\n\r\n`;
    a = `(Coluna,Linha) \r\n`
    for (let coluna = 0; coluna < this.colunaFase; coluna++) {
        for (let linha = 0; linha < this.linhaFase; linha++) {
            if (this.vetMap[coluna][linha]) {
                a += `[${this.vetMap[coluna][linha].nome}(${coluna},${linha})]`;
            }else{
                a += `[Undef(${coluna},${linha})]`;
            }
        }
        a += `\r\n`;
    }
    console.log(a);
};

/** Função que verifica se o mapa tem como concluir. Ex: Possue Fim, se tiver "porta trancada" se tem a sala que possue a chave.
 * 
 */
Fase.prototype.restricao = function (Mapas){
    console.log(`VETOR DO MAPA ANTES DO TRATAMENTO DE GERAÇÂO:`);
    this.PrintMap();
    
    /// RESTRIÇÔES QUE IMPEDEM A CRIAÇÂO DA FASE (Ex: Sem inicio e fim, sala trancada sem sala com a chave).
    this.distanciaEntrePontos(P.SpawBranco, P.FimBranco);
    // for (let index = 0; index < Mapas.length; index++) {
    //     if (Mapas[index] == P.Chest) {
    //         this.distanciaEntrePontos(Mapas[index], P.SpawBranco);
    //     }
    // }


    this.converter();
    console.log(`VETOR DO MAPA DEPOIS DO TRATAMENTO DE GERAÇÂO:`);
    this.PrintMap();
};

/** Função que verifica e troca os mapas para eles terem passagem adiciona posições aleatórias e as liga para maior variação de caminhos.
 * 
 */
Fase.prototype.converter = function(){
    let cima, baixo, esquerda, direita;
    for (let col = 0; col < this.colunaFase; col++) {
        for (let lin = 0; lin < this.linhaFase; lin++) {
            cima = baixo = esquerda = direita = false;
            if (this.vetMap[col][lin]) {
                if (col+1 != this.colunaFase && this.vetMap[col+1][lin]){ // baixo
                    baixo = true;
                    // console.log(this.vetMap[col+1][lin].nome + " | Col: " + (col+1) + " | Lin: " + lin + " Anterior: " + " | Col: " + col + " | Lin: " + lin)
                }
                if (lin+1 != this.colunaFase && this.vetMap[col][lin+1]){ // direita
                    direita = true;
                    // console.log(this.vetMap[col][lin+1].nome  + " | Col: " + col + " | Lin: " + (lin+1) + " Anterior: " + " | Col: " + col + " | Lin: " + lin)
                }
                if (col-1 >= 0 && this.vetMap[col-1][lin]){ // cima
                    cima = true;
                    // console.log(this.vetMap[col-1][lin].nome   + " | Col: " + (col-1) + " | Lin: " + lin + " Anterior: " + " | Col: " + col + " | Lin: " + lin)
                }
                if (lin-1 >= 0 && this.colunaFase && this.vetMap[col][lin-1]){ // esquerda
                    esquerda = true;
                    // console.log(this.vetMap[col][lin-1].nome   + " | Col: " + col + " | Lin: " + (lin-1) + " Anterior: " + " | Col: " + col + " | Lin: " + lin)
                }
                if(!baixo && !direita && !cima && esquerda){ // ########## CELULAS COM APENAS UMA ABERTURA
                    this.vetMap[col][lin] = P.FimE;
                }else if(!baixo && !direita && cima && !esquerda){
                    this.vetMap[col][lin] = P.FimC;
                }else if(!baixo && direita && !cima && !esquerda){
                    this.vetMap[col][lin] = P.FimD;
                }else if(baixo && !direita && !cima && !esquerda){ 
                    this.vetMap[col][lin] = P.FimB;
                }else if(!baixo && !direita && cima && esquerda){ // ####### CELULAS COM DUAS ABERTURA
                    this.vetMap[col][lin] = P.CorredorNO;
                }else if(!baixo && direita && !cima && esquerda){
                    this.vetMap[col][lin] = P.CorredorOL;
                }else if(baixo && !direita && !cima && esquerda){
                    this.vetMap[col][lin] = P.CorredorSO;
                }else if(!baixo && direita && cima && !esquerda){
                    this.vetMap[col][lin] = P.CorredorNL;
                }else if(baixo && !direita && cima && !esquerda){
                    this.vetMap[col][lin] = P.CorredorNS;
                }else if(baixo && direita && !cima && !esquerda){
                    this.vetMap[col][lin] = P.CorredorSL;
                }else if(!baixo && direita && cima && esquerda){  // ####### CELULAS COM TRES ABERTURA
                    
                }else if(baixo && !direita && cima && esquerda){

                }else if(baixo && direita && !cima && esquerda){

                }else if(baixo && direita && cima && !esquerda){ 
                    
                }else if(baixo && direita && cima && esquerda){  // ####### CELULAS COM QUATRO ABERTURA

                } // #######
                this.vetMap[col][lin].SpawInimigos(this.inimigos,this);
            }
        }
    }
};