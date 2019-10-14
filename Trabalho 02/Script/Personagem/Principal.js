// Funções para o perçonagem principal.

function Principal(params) {
    ex = {
        x: 10,
        y: 10,
        vx: 0,
        vy:0,
        ay:0,
        ax:0,

    };

    Object.assign(this, ex,params);
}

Principal.prototype.Passo = function(){};
Principal.prototype.Colisao = function(){};
Principal.prototype.Draw = function(){};
Principal.prototype.Mover = function(){};