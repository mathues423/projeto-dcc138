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

    var Chest = new Mapa(44,17,"Chest");
    var Spaw = new Mapa(44,17,"Spaww");
    Spaw.setMapa(10,Spaw.linha-2);
    Spaw.setMapa(7,Spaw.linha-2);
    
    Spaw.setPortas(9,Spaw.linha-2);
    Spaw.setPortas(8,Spaw.linha-2);

    
    var FimE = new Mapa(44,17,"FimEs");
    FimE.setMapa(10,1);
    FimE.setMapa(7,1);
    
    FimE.setPortas(9,1);
    FimE.setPortas(8,1);

    var CorredorNS = new Mapa(44,17,"CorNS");
    for (let index = 0; index < CorredorNS.coluna; index++) {
        // CorredorNS.setMapa(index,CorredorNS.linha-3);
        // CorredorNS.setMapa(index,CorredorNS.linha-4);
        // CorredorNS.setMapa(index,CorredorNS.linha-5);
        // CorredorNS.setMapa(index,CorredorNS.linha-6);
        // CorredorNS.setMapa(index,CorredorNS.linha-7);
        
        // CorredorNS.setMapa(index,10);
        // CorredorNS.setMapa(index,6);
        // CorredorNS.setMapa(index,5);
        // CorredorNS.setMapa(index,4);
        // CorredorNS.setMapa(index,3);
        if (index > 6 && index < 9) {
            // CorredorNS.setMapa(index,9);
            // CorredorNS.setMapa(index,8);
            // CorredorNS.setMapa(index,7);
            // CorredorNS.setMapa(index,15);
            // CorredorNS.setMapa(index,16);
            // CorredorNS.setMapa(index,17);
            // CorredorNS.setMapa(index,CorredorNS.linha-8);
            // CorredorNS.setMapa(index,CorredorNS.linha-9);
            // CorredorNS.setMapa(index,CorredorNS.linha-10);
            // CorredorNS.setMapa(index,CorredorNS.linha-18);
            // CorredorNS.setMapa(index,CorredorNS.linha-17);
            // CorredorNS.setMapa(index,CorredorNS.linha-16);

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

    CorredorNS.setMapa(1,23);
    CorredorNS.setMapa(1,20);
    CorredorNS.setMapa(CorredorNS.coluna-2,23);
    CorredorNS.setMapa(CorredorNS.coluna-2,20);

    CorredorNS.setPortas(CorredorNS.coluna-2,22);
    CorredorNS.setPortas(CorredorNS.coluna-2,21);
    CorredorNS.setPortas(1,22);
    CorredorNS.setPortas(1,21);

    var CoredorOL = new Mapa(44,17,"CorOL");
    
    CoredorOL.setMapa(10,CoredorOL.linha-2);
    CoredorOL.setMapa(7,CoredorOL.linha-2);
    
    CoredorOL.setPortas(9,CoredorOL.linha-2);
    CoredorOL.setPortas(8,CoredorOL.linha-2);
    
    CoredorOL.setMapa(10,1);
    CoredorOL.setMapa(7,1);
    
    CoredorOL.setPortas(9,1);
    CoredorOL.setPortas(8,1);
    var lista = {MapaBranco: MapaBranco, Chest: Chest, CorredorNS: CorredorNS,
        Spaw: Spaw, FimE: FimE, CoredorOL: CoredorOL, FimBranco: FimBranco};
    return lista;
}