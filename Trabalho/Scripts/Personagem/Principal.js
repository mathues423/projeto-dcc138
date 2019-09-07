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
        hpMax:100,
        mp: 20,
        mpMax:20,
        atkMin:1,
        atkMax:3,
        xp:0,
        lvl:1,
        // for: 1,
        // dex: 1,
        // int: 1,
        // con: 1,
        morto: false,

        //Skils / controle
        mouse: setMouse(),
        abilidades: {
            q: {descrição: "Ataque simplis.", dano: 0, cd: 0.5, cdAux:0.5,tipo: TipoClickUse(undefined),},
            w: {descrição: "Magia.", dano: 0, cd: 0, cdAux:0, tipo: TipoPontclick(undefined,undefined), raio: 25},
            // e: {descrição: "Magia.", dano: 0,cd: 0, cdAux:0, tipo: undefined,},
            // r: {descrição: "Magia.", dano: 0,cd: 0, cdAux:0, tipo: undefined,},
        },
        mouseX:-1,
        mouseY: -1,

        //Controles do Sprite
        sprite: undefined,
        ix: 0, //I = imagem
        iy: 0,
        cx: 0,//C = corte
        cy: 0,
        norte: false,
        leste: false,

        //Controles de tempo
        hprec: 2,
        hps:4,
        hpsAux:4,
        mprec: 1,
        mps:3,
        mpsAux:3,

        //Controle Usuario
        entrada: setEntrada(undefined,undefined),
        saida: setSaida(undefined,undefined),
        click: setClick(undefined),
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
        andar: [],
    };

    Object.assign(this,principal,args);
}

Principal.prototype = new Principal();
Principal.prototype.constructor = Principal;


//Controle Do perçonagem
canvas.addEventListener("mousemove", function (e) {
    principal.mouse((e.clientX -10),(e.clientY -10),principal);
});

function setClick(params,Obj) {
    return function (params,Obj) {
        if(params.shiftKey)
            Obj.teclas.w = 0;
        
        // if(params.button == 0)
            //AKT
    }
}

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
            case 81: //Q
                Obj.teclas.q = 1;
            break;
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
            case 81: //Q
                Obj.teclas.q = 0;
            break;
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
        ctx.globalAlpha = 0.8;
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.beginPath();
        context.moveTo(Obj.mouseX, Obj.mouseY-Obj.abilidades.w.raio);
        ctx.lineTo(Obj.mouseX,Obj.mouseY-Obj.abilidades.w.raio);
        ctx.lineTo(Obj.mouseX,Obj.mouseY+(Obj.abilidades.w.raio));
        ctx.lineTo(Obj.mouseX-Obj.abilidades.w.raio,Obj.mouseY+Math.PI);
        ctx.lineTo(Obj.mouseX+Obj.abilidades.w.raio,Obj.mouseY+Math.PI);
        ctx.lineTo(Obj.mouseX,Obj.mouseY-(Obj.abilidades.w.raio));

        ctx.stroke();
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

document.addEventListener("keydown", function (key) {
    principal.entrada(key.keyCode,principal);
});
document.addEventListener("keyup", function (key) {
    principal.saida(key.keyCode,principal);
});
document.addEventListener("mousedown", function (e) {
    principal.click(e,principal);
});

//Informação

Principal.prototype.inf = function (ctx,dt) {
    var can = document.querySelector("canvas");
    this.desenhaBarra(ctx,dt,can);
};

Principal.prototype.desenhaBarra = function(ctx,dt,can){
    this.mpsAux -= dt;
    this.hpsAux -= dt;

    if (!this.morto) {
        if (this.hpsAux < 0 && this.hp!=this.hpMax) {
            if (this.hp + this.hprec < this.hpMax) {
                this.hp += this.hprec;
            }
            if (this.hp + this.hprec >= this.hpMax) {
                this.hp = this.hpMax;
                
            }
            this.hpsAux = this.hps; 
        }

        if (this.mpsAux < 0 && this.mp!=this.mpMax) {
            if (this.mp + this.mprec < this.mpMax) {
                this.mp += this.mprec;
            }
            if (this.mp + this.mprec >= this.mpMax) {
                this.mp = this.mpMax;
                
            }
            this.mpsAux = this.mps; 
        }

        if (this.hp <= 0) {
            this.morto;
        }
        
    }else{//Morto

    }
    var tammax = 300;
    var can = document.querySelector("canvas");
    ctx.fillStyle = "#5a5a5a";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.strokeRect(0,can.height-55, can.width,can.height);
    ctx.fillRect(0,can.height-55, can.width,can.height);


    ctx.fillStyle = 'hsl('+ 120*this.porc(this.hp, this.hpMax) +',100%,50%)';
    ctx.fillRect(0, can.height-40, tammax * this.porc(this.hp, this.hpMax), 20);

    
    ctx.fillStyle = 'rgb('+(255-200*this.porc(this.mp,this.mpMax))+','+(255-200*this.porc(this.mp,this.mpMax))+','+255*this.porc(this.mp,this.mpMax)+')';
    ctx.fillRect(0, can.height-20, tammax * this.porc(this.mp, this.mpMax)/2, 16);

    ctx.strokeRect(0, can.height-20, tammax/2, 16); // MP
    ctx.strokeRect(0, can.height-40, tammax, 20); // HP

    ctx.fillStyle = "white";
    ctx.font = "12px sans-serif";
    ctx.fillText("Hp: "+this.hp+ " / " + this.hpMax+"    |     Nome:"+this.nome, tammax+2, can.height-16*2+16/2, tammax);
    ctx.fillText("Mp: "+this.mp+ " / " + this.mpMax+"    |     Lvl:"+this.lvl, tammax/2+2, can.height-16/2, tammax);

    ctx.lineWidth = 1;
};

Principal.prototype.porc = function (hpAtual, hpTotal) {
    return hpAtual / hpTotal;
};