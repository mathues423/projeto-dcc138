// Controla os conjuntos de mapas e suas posiçoes juntamente com os movimentos dos inimigos.
function Level() {
    this.mapa = [];
    if (!Hashing_Map["Completo"] || !Hashing_Map["Vazio"]) {
        var MAP0 = new Mapa();
        var MAP1 = new Mapa();
        addHashing_Map("Completo",MAP0);
        for (let col = 0; col < MAX_H_M; col++) {
            for (let lin = 0; lin < MAX_W_M; lin++) {
                MAP1.setCels(col,lin, 1);
            }
        }
        addHashing_Map("Vazio",MAP1);
    }
    for (let h = 0; h < MAX_H_L; h++) {
        this.mapa[h] = [];
        for (let w = 0; w < MAX_W_L; w++) {
            this.setId(h,w, "Vazio");
        }
    }
};

/** Função responsavel por setar a matriz do mapa com ID de celulas de mapas já criadas.
 * 
 * @param {Number} col : Indica a coluna da matriz.
 * @param {Number} lin : Indica a linha da matriz.
 * @param {String} ID_MAP : Indica o ID(String) da celula a ser adicionada na matirz.
 */
Level.prototype.setId = function(col,lin, ID_MAP){
    if (col > -1 && lin > -1) {
        if (!Hashing_Map[ID_MAP]) {
            throw new Error(`ERRO: Id inválido: ${ID_MAP}!`);
        }
        this.mapa[col][lin] = ID_MAP;
    }else{
        throw new Error(`ERRO: col(${col}), lin(${lin}) ou ID_MAP(${ID_MAP}) invalido.`)
    }
};