class Mapa {
    /** Construtor do Objeto do tipo mapa.
     * 
     * @param {Number} maxH Numero de colunas da matriz do mapa.
     * @param {Number} maxW Numero de linhas da martriz do mapa.
     */
    constructor(maxH,maxW) {
        this.H = 30;
        this.W = 30;
        this.Mapa = [];
        for (var linha = 0; linha < maxW; linha++) {
            this.Mapa[linha] = [];
            for (var coluna = 0; coluna < maxH; coluna++) {
                this.Mapa[linha][coluna] = 1;
                if (coluna == 0 || coluna == maxH-1) {
                    this.Mapa[linha][coluna] = 0;
                }
                if (linha == 0 || linha == maxW-1) {
                    this.Mapa[linha][coluna] = 0;
                }
            }
        }
        this.Mapa[9][9] = 0;
    }

    /** Função responsavel por imprimir o mapa.
     * 
     * @param {CanvasRenderingContext2D} context Contexto do canvas (2D).
     */
    drawMapa(context){
        // context.save();
        context.strokeStyle = "#7c7c7c";
        if (this.char) {
            for (let i = 0, contI = 0; i < this.Mapa.length; i++, contI++) {
                for (let j = 0, contJ = 0; j < this.Mapa[i].length; j++, contJ++) {
                    switch (this.Mapa[i][j]) {
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
                    if (contI*this.W+this.W > 1350 || contJ*this.H+this.H > 570) {
                        break;
                    }
                    context.fillRect(contI*this.W,contJ*this.H , this.W,this.H);
                    context.strokeRect(contI*this.W,contJ*this.H , this.W,this.H);
                }
            }
        }else{
            for (let i = 0; i < this.Mapa.length; i++) {
                for (let j = 0; j < this.Mapa[i].length; j++) {
                    switch (this.Mapa[i][j]) {
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
                    context.fillRect(i*this.W,j*this.H , this.W,this.H);
                    context.strokeRect(i*this.W,j*this.H , this.W,this.H);
                }
            }
        }
        // context.restore();
    }
}