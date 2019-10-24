class Mapa {
    /** Construtor do Objeto do tipo mapa.
     * 
     * @param {Number} maxW Numero de linhas da martriz do mapa.
     * @param {Number} maxH Numero de colunas da matriz do mapa.
     * @param {Princiapl} principal Personagem principal do jogo.
     */
    constructor(maxW,maxH, principal) {
        if (maxW < 44 || maxH < 17 || maxW > 44 || maxH > 17) {
            throw new Error(`Valor maxW 44 add(${maxW}) | Valor maxH 17 add(${maxH}).`);
        }
        this.list = undefined;
        // this.pre = Precriado();
        this.casasVazias = -1;
        this.H = 30;
        this.W = 30;
        this.linha = maxW;
        this.coluna = maxH;
        this.Mapa = [];
        this.personagem = principal;
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
        // this.Mapa[10][2] = 0;
        // this.Mapa[10][1] = 0;
        // this.Mapa[7][2] = 0;
        // this.Mapa[7][1] = 0;

        // this.Mapa[10][this.linha-3] = 0;
        // this.Mapa[10][this.linha-2] = 0;
        // this.Mapa[7][this.linha-3] = 0;
        // this.Mapa[7][this.linha-2] = 0;
    }

    /** Função responsavel por imprimir o mapa.
     * 
     * @param {CanvasRenderingContext2D} context Contexto do canvas (2D).
     */
    drawMapa(context){
        context.strokeStyle = "#7c7c7c";
        if (this.personagem) {
            for (let coluna = 0; coluna < this.Mapa.length; coluna++) {
                for (let linha = 0; linha < this.Mapa[coluna].length; linha++) {
                    switch (this.Mapa[coluna][linha]) {
                        case 0:
                            context.fillStyle = "#000";
                            break;
                        case 1:
                            context.fillStyle = "#f7ca42";
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
}

function Precriado() {
    var TMapa = new Mapa(44,17);
    var Chest = new Mapa(44,17);
    var CorredorN = new Mapa(44,17);
    for (let index = 0; index < CorredorN.coluna; index++) {
        CorredorN.setMapa(index,CorredorN.linha-1);
        CorredorN.setMapa(index,CorredorN.linha-2);
        CorredorN.setMapa(index,CorredorN.linha-3);
        CorredorN.setMapa(index,CorredorN.linha-4);
        CorredorN.setMapa(index,CorredorN.linha-5);
        CorredorN.setMapa(index,CorredorN.linha-6);
        CorredorN.setMapa(index,CorredorN.linha-7);
        CorredorN.setMapa(index,CorredorN.linha-8);
        CorredorN.setMapa(index,CorredorN.linha-9);
        CorredorN.setMapa(index,CorredorN.linha-10);

        CorredorN.setMapa(index,10);
        CorredorN.setMapa(index,9);
        CorredorN.setMapa(index,8);
        CorredorN.setMapa(index,7);
        CorredorN.setMapa(index,6);
        CorredorN.setMapa(index,5);
        CorredorN.setMapa(index,4);
        CorredorN.setMapa(index,2);
        CorredorN.setMapa(index,3);
        CorredorN.setMapa(index,1);
    }
    var lista = {TMapa: TMapa, Chest: Chest, CorredorN: CorredorN};
    return lista;
}