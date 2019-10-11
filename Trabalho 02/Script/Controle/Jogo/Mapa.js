// Controle do spaw dos inimigos uma parte do cenario
function Mapa(param) {
    ex = {
        tipo : 0,
        cels : []
    }
    for (let h = 0; h < MAX_H_M; h++) {
        ex.cels[h] = [];
        for (let w = 0; w < MAX_W_M; w++) {
            ex.cels[h][w] = 0;
        }
    }   
    Object.assign(this,ex,param); 
};

/** Função responsavel por alterar o Tipo da celula, indicando o tipo decoração a ser colocada na celula do mapa.
 * 
 * @param {Number} tipo : Indica o tipo de decoração.
 */
Mapa.prototype.setTipo = function(tipo){
    this.tipo = tipo;
};

/** Função responsavel por alterar o ID das celulas.
 * 
 * @param {Number} col : Indica a coluna da matriz.
 * @param {Number} lin : Indica a linha da matriz.
 * @param {Number} ID_CEL : Indica o tipo de preenchimento entre vazio (1), ocupado (1).
 */
Mapa.prototype.setCels = function (col,lin, ID_CEL){
    this.cels[col][lin] = ID_CEL;
};