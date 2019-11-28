class Mapa {
    /** Construtor do Objeto do tipo mapa.
     * 
     * @param {Number} maxW Numero de linhas da martriz do mapa.
     * @param {Number} maxH Numero de colunas da matriz do mapa.
     */
    constructor(maxW,maxH,nome) {
        if (maxW != 44 || maxH != 17) {
            throw new Error(`Valor maxW tem que ser 44 adicionado(${maxW}) | Valor maxH tem que ser 17 adicionado(${maxH}).`);
        }
        this.list = undefined;
        this.casasVazias = undefined;
        this.H = 30;
        this.W = 30;
        this.linha = maxW;
        this.coluna = maxH;
        this.Mapa = [];
        this.personagem = principal;
        this.Portas = [];
        this.completa = false;
        this.nome = "undefined";
        if (nome!=undefined) {
            this.nome = nome;
        }
        for (let coluna = 0; coluna < maxH; coluna++) {
            this.Mapa[coluna] = [];
            for (let linha = 0; linha < maxW; linha++) {
                this.Mapa[coluna][linha] = 1;
                if (coluna == 0 || coluna == maxH-1) {
                    this.Mapa[coluna][linha] = 0;
                }
                if (linha == 0 || linha == maxW-1) {
                    this.Mapa[coluna][linha] = 0;
                }
            }
        }
    }

    /** Função responsavel por imprimir o mapa.
     * 
     * @param {CanvasRenderingContext2D} context Contexto do canvas (2D).
     */
    drawMapa(context, personagem){
        context.strokeStyle = "#7c7c7c";
        if (personagem) {
            for (let coluna = 0; coluna < this.Mapa.length; coluna++) {
                for (let linha = 0; linha < this.Mapa[coluna].length; linha++) {
                    switch (this.Mapa[coluna][linha]) {
                        case 0:
                            context.fillStyle = "#000";
                            break;
                        case 1:
                            context.fillStyle = "#f7ca42";
                            break;
                        case 2:
                            context.fillStyle = "#228B22";
                            break;

                        default:
                            context.fillStyle = "#FFF";
                            break;
                    }
                    context.fillRect(linha*this.W,coluna*this.H , this.W,this.H);
                    context.strokeRect(linha*this.W,coluna*this.H , this.W,this.H);
                }
            }
        }else
            throw new Error("Personagem principal não adicionado");
        
    }

    setMapa(coluna,linha){
        if (this.Mapa[coluna][linha] != undefined) {
            this.Mapa[coluna][linha] = 0;
        }else
            throw new Error(`Mapa na coluna ${coluna} e na linha ${linha} possui o valor ${this.Mapa[coluna][linha]}.`)
    }
    
    /** Função que gera uma porta.
     * 
     * @param {Number} coluna Define em qual coluna havera uma porta.
     * @param {Number} linha Define em qual inha havera uma porta.
     */
    setPortas(coluna,linha){
        if (this.Mapa[coluna][linha] != undefined) {
            let cont = this.Portas.length;
            let verificador = {cima: undefined, direita: undefined};
            if (coluna > 15) {
                verificador.cima = true;
            } else if(coluna < 2){
                verificador.cima = false;
            }
            if (linha > 41) {
                verificador.direita = true;
            }else if(linha < 2){
                verificador.direita = false;
            }
            this.Portas[cont] = {coluna: coluna, linha: linha, proxSala: verificador};
        }else
            throw new Error(`Mapa na coluna ${coluna} e na linha ${linha} possui o valor ${this.Mapa[coluna][linha]}.`);
    
    }

    SpawPrincipal(Principal, linha, coluna){
        // var can = document.querySelector("canvas");
        Principal.marcaX = -1;
        Principal.marcaY = -1;

        // Ta invertido ou n. n sei ?????
        Principal.posiL= linha; 
        Principal.posiC = coluna;

        Principal.x = coluna*this.W;
        Principal.y = linha*this.H;
    }

    set(coluna,linha, val){
        if (this.Mapa[coluna][linha] != undefined) {
            this.Mapa[coluna][linha] = val;
        }else
            throw new Error(`Mapa na coluna ${coluna} e na linha ${linha} possui o valor ${this.Mapa[coluna][linha]}.`)
    }

    itsClear(){
        if(this.personagem.inimigos == null || this.personagem.inimigos == undefined){
            this.completa = true;
            return true;
        }else{
            return false;
        }
    }

    celulasVazias(){
        var list = [];
        var cont = 0;
        for (let coluna = 0; coluna < this.Mapa.length; coluna++) {
            for (let linha = 0; linha < this.Mapa[coluna].length; linha++) {
                if (this.Mapa[coluna][linha]!=0) {
                    list[cont] = {i:linha, j:coluna};
                    cont++;
                }
            }
        }
        this.list = list;
        this.casasVazias = cont;
    }
}

function Precriado() {
    //Ligar os mapas
    var MapaBranco = new Mapa(44,17,"MapaB");
    var FimBranco = new Mapa(44,17,"FimBr");
    var SpawBranco = new Mapa(44,17,"SpBra");
    var Chest = new Mapa(44,17,"Chest");
    
    // ############ MAPAS COM UMA ABERTURA ############
    var FimE = new Mapa(44,17,"FimEs");
    FimE.setMapa(10,1);
    FimE.setMapa(7,1);
    FimE.setPortas(9,1);
    FimE.setPortas(8,1);

    var FimD = new Mapa(44,17,"FimDi");
    FimD.setMapa(10,FimD.linha-2);
    FimD.setMapa(7,FimD.linha-2);
    FimD.setPortas(9,FimD.linha-2);
    FimD.setPortas(8,FimD.linha-2);

    var FimC = new Mapa(44,17,"FimCi");
    FimC.setMapa(1,20);
    FimC.setMapa(1,23);
    FimC.setPortas(1,21);
    FimC.setPortas(1,22);

    var FimB = new Mapa(44,17,"FimBa");
    FimB.setMapa(FimB.coluna-2,20);
    FimB.setMapa(FimB.coluna-2,23);
    FimB.setPortas(FimB.coluna-2,21);
    FimB.setPortas(FimB.coluna-2,22);
    //############ $$ ############
    // ############ MAPAS COM DUAS ABERTURAS ############
    var CorredorNS = new Mapa(44,17,"CorNS");
    for (let index = 0; index < CorredorNS.coluna; index++) {
        if (index > 6 && index < 9) {
            CorredorNS.setMapa(index,CorredorNS.linha-2);
            CorredorNS.setMapa(index,CorredorNS.linha-3);
            CorredorNS.setMapa(index,2);
            CorredorNS.setMapa(index,1);
        }
    }
    CorredorNS.setMapa(6,CorredorNS.linha-2);
    CorredorNS.setMapa(9,CorredorNS.linha-2);
    CorredorNS.setMapa(6,1);
    CorredorNS.setMapa(9,1);

    CorredorNS.setMapa(1,23);// NORTE
    CorredorNS.setMapa(1,20);
    CorredorNS.setPortas(1,22);
    CorredorNS.setPortas(1,21);
    CorredorNS.setMapa(CorredorNS.coluna-2,23);// SUL
    CorredorNS.setMapa(CorredorNS.coluna-2,20);
    CorredorNS.setPortas(CorredorNS.coluna-2,22);
    CorredorNS.setPortas(CorredorNS.coluna-2,21);
    
    var CorredorNO = new Mapa(44,17,"CorNO");
    CorredorNO.setMapa(1,23);// NORTE
    CorredorNO.setMapa(1,20);
    CorredorNO.setPortas(1,22);
    CorredorNO.setPortas(1,21);
    CorredorNO.setMapa(10,1);//ESQUERDA
    CorredorNO.setMapa(7,1);
    CorredorNO.setPortas(9,1);
    CorredorNO.setPortas(8,1);

    var CorredorNL = new Mapa(44,17,"CorNL");
    CorredorNL.setMapa(1,23);// NORTE
    CorredorNL.setMapa(1,20);
    CorredorNL.setPortas(1,22);
    CorredorNL.setPortas(1,21);
    CorredorNL.setMapa(10,CorredorNL.linha-2);//DIREITA
    CorredorNL.setMapa(7,CorredorNL.linha-2);
    CorredorNL.setPortas(9,CorredorNL.linha-2);
    CorredorNL.setPortas(8,CorredorNL.linha-2);

    var CorredorOL = new Mapa(44,17,"CorOL");
    CorredorOL.setMapa(10,CorredorOL.linha-2);//DIREITA
    CorredorOL.setMapa(7,CorredorOL.linha-2);
    CorredorOL.setPortas(9,CorredorOL.linha-2);
    CorredorOL.setPortas(8,CorredorOL.linha-2);
    CorredorOL.setMapa(10,1);//ESQUERDA
    CorredorOL.setMapa(7,1);
    CorredorOL.setPortas(9,1);
    CorredorOL.setPortas(8,1);
    
    var CorredorSL = new Mapa(44,17,"CorSL");
    CorredorSL.setMapa(CorredorSL.coluna-2,23);// SUL
    CorredorSL.setMapa(CorredorSL.coluna-2,20);
    CorredorSL.setPortas(CorredorSL.coluna-2,22);
    CorredorSL.setPortas(CorredorSL.coluna-2,21);
    CorredorSL.setMapa(10,CorredorSL.linha-2);//DIREITA
    CorredorSL.setMapa(7,CorredorSL.linha-2);
    CorredorSL.setPortas(9,CorredorSL.linha-2);
    CorredorSL.setPortas(8,CorredorSL.linha-2);

    var CorredorSO = new Mapa(44,17,"CorSO");
    CorredorSO.setMapa(CorredorSO.coluna-2,23);// SUL
    CorredorSO.setMapa(CorredorSO.coluna-2,20);
    CorredorSO.setPortas(CorredorSO.coluna-2,22);
    CorredorSO.setPortas(CorredorSO.coluna-2,21);
    CorredorSO.setMapa(10,1);//ESQUERDA
    CorredorSO.setMapa(7,1);
    CorredorSO.setPortas(9,1);
    CorredorSO.setPortas(8,1);
    //############ $$ ############
    // ############ MAPAS COM TRES ABERTURAS ############
    
    //############ $$ ############
    var lista = {MapaBranco: MapaBranco, FimBranco: FimBranco, Chest: Chest, SpawBranco: SpawBranco,
    FimE: FimE,FimD: FimD,FimC: FimC,FimB: FimB,// 1 abertura
    CorredorNS: CorredorNS,CorredorNO: CorredorNO, CorredorNL: CorredorNL, CorredorOL: CorredorOL, CorredorSL: CorredorSL, CorredorSO: CorredorSO,// 2 aberturas
    
};
    return lista;
}