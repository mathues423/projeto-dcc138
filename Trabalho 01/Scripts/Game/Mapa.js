class Mapa {
    /** Construtor do Objeto do tipo mapa.
     * 
     * @param {Number} maxW Numero de linhas da martriz do mapa.
     * @param {Number} maxH Numero de colunas da matriz do mapa.
     */
    constructor(maxW,maxH) {
        this.H = 30;
        this.W = 30;
        this.linha = maxW;
        this.coluna = maxH;
        this.Mapa = [];
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
        this.Mapa[10][2] = 0;
        this.Mapa[10][1] = 0;
        this.Mapa[7][2] = 0;
        this.Mapa[7][1] = 0;

        this.Mapa[10][this.linha-3] = 0;
        this.Mapa[10][this.linha-2] = 0;
        this.Mapa[7][this.linha-3] = 0;
        this.Mapa[7][this.linha-2] = 0;
    }

    /** Função responsavel por imprimir o mapa.
     * 
     * @param {CanvasRenderingContext2D} context Contexto do canvas (2D).
     */
    drawMapa(context){
        context.strokeStyle = "#7c7c7c";
        if (this.char) {
            for (let i = 0, contI = 0; i < this.Mapa.length; i++, contI++) {
                for (let j = 0, contJ = 0; j < this.Mapa[i].length; j++, contJ++) {
                    switch (this.Mapa[j][i]) {
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
                    context.fillRect(contJ*this.W,contI*this.H , this.W,this.H);
                    context.strokeRect(contJ*this.W,contI*this.H , this.W,this.H);
                }
            }
        }else{
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
        }
    }
}