var principal = new Principal({sprite: "Imgs/sprites/Principal.png", 
abilidades: {
    q: combT,
    w: undefined,
    e: undefined,
    r: undefined,}, 
});
var Game = [];
var F0 = new Fase({Principal: principal});
F0.insere(0,4);

var F1 = new Fase({Principal: principal});
F1.insere(0,10);

Game.push(F0);
Game.push(F1);