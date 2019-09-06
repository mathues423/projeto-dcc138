function Principal(args = {}) {
    principal = {
        //Tamanho
        w: 30, 
        h: 30,

        //Dano recebido das propriedades %
        // fogo : 100,
        // agua : 100,
        // terra : 100,
        // luz : 100,
        // trevas : 100,
        // fisico : 100,

        //Caracteristicas
        nome:"???",
        hp: 100,
        mp: 20,
        atkMin:1,
        atkMax:3,
        xp:0,
        // for: 1,
        // dex: 1,
        // int: 1,
        // con: 1,

        //Skils / controle
        mouse: setMouse(),
        mouseX: 0,
        mouseY: 0,
        abilidades: {
            q: {descrição: "Ataque simplis.", dano: 0, cd: 0.5, cdAux:0.5,tipo: TipoClickUse(undefined),},
            w: {descrição: "Magia.", dano: 0, cd: 0, cdAux:0, tipo: TipoPontclick(undefined,undefined), raio: 25},
            // e: {descrição: "Magia.", dano: 0,cd: 0, cdAux:0, tipo: undefined,},
            // r: {descrição: "Magia.", dano: 0,cd: 0, cdAux:0, tipo: undefined,},
        },
    // evt.clientX - 10 + window.pageXOffset;
    // evt.clientY - 10 + window.pageYOffset;
        mouseX:-1,
        mouseY: -1,

        //Controles do Sprite
        sprite: "",
        ix: 0, //I = imagem
        iy: 0,
        cx: 0,//C = corte
        cy: 0,
        norte: false,
        leste: false,

        //Controles de tempo

        //Controle Usuario
        entrada: setEntrada(undefined,undefined),
        saida: setSaida(undefined,undefined),

        teclas: {
            cim: 0,
            bai: 0,
            dir: 0,
            esq: 0,
            q: 0,
            w: 0,
            // e: 0,
            // r: 0,
        },
    };

    Object.assign(this,principal,args);
}

Principal.prototype = new Principal();
Principal.prototype.constructor = Principal;


//Controle Do perçonagem
function setEntrada(keyCode,Obj) {
    return function (keyCode,Obj) {
        switch (keyCode) {
            case 38:
                Obj.teclas.cim = 1;
            break;
            case 40:
                Obj.teclas.bai = 1;
            break;
            case 37:
                Obj.teclas.esq = 1;
            break;
            case 39:
                Obj.teclas.dir = 1;
            break;
    
            //Abilidades
            //Abilidades
            // case 81: //Q
                
            // break;
            case 87: //W
                Obj.teclas.w = 1;
            break;
            // case 69: //E
                
            // break;
            // case 82: //R
                
            // break;
    
            default:
                break;
        }
    }
}

function setSaida(keyCode,Obj) {
    return function (keyCode,Obj) {
        console.log(keyCode);
        switch (keyCode) {
            case 38:
                Obj.teclas.cim = 0;
            break;
            case 40:
                Obj.teclas.bai = 0;
            break;
            case 37:
                Obj.teclas.esq = 0;
            break;
            case 39:
                Obj.teclas.dir = 0;
            break;
    
            //Abilidades
            // case value: //Q
                
            // break;
            // case 87: //W
            //     Obj.teclas.w = 0;
            // break;
            // case value: //E
                
            // break;
            // case value: //R
                
            // break;
    
            default:
                break;
        }
    }
}

function setMouse(mouseX,mouseY,Obj) {
    return function (mouseX,mouseY,Obj) {
        Obj.mouseX = mouseX;
        Obj.mouseY = mouseY;
        console.log("SetMouse X: "+ Obj.mouseX+" | Y: "+ Obj.mouseY);
    }
}

function TipoPontclick(Obj,ctx) {
    return function (Obj,ctx) {
        ctx.globalAlpha = 0.5;
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.arc(Obj.mouseX, Obj.mouseY, Obj.abilidades.w.raio, 0, Math.PI * 2, true);
        ctx.stroke();
        console.log("lugar X: "+ Obj.mouseX+" | Y: "+ Obj.mouseY);
        ctx.globalAlpha = 1;
    }
}

function TipoClickUse(Obj) {
    return function (Obj) {
    }
}