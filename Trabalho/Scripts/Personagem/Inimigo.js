function Inimigo(params = {}) {
    var can = document.querySelector("canvas");
    var inimigo = {
        //Tamanho
        w: 30, 
        h: 30,

        //Movimento
        vx: 0,
        vy: 0,
        vm: 100,


        //Caracteristicas
        nome:"???",
        hp: 50,
        hpMax: 50,
        atkMin:1,
        atkMax:3,
        xp:0,
        lvl:1,
        morto: false,

        //Controles do Sprite
        sprite: undefined,
        norte: false,
        leste: false,
        x: can.width / 3 + Math.random() * (2 / 3 * can.width) - 40,
        y: can.height / 10 + Math.random() * (9 / 10 * can.height) - 40,

        //Controles de tempo
        hprec: 2,
        hps:4,
        hpsAux:4,

        //Controle de movimentação
        
    };

    Object.assign(this,inimigo.params);
}

Inimigo.prototype = new Inimigo();
Inimigo.prototype.constructor = Inimigo;