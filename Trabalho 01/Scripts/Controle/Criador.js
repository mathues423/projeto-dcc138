var assest = new Assets();
assest.loadImage("Prin", "Imgs/sprites/Principal.png");
assest.loadImage("Green_Slime", "Imgs/sprites/GreenSlime.png");
assest.loadImage("Skil01", "Imgs/sword.jpg");

var principal = new Principal({sprite: assest.getImg("Prin").src, 
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