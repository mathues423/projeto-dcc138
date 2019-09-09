function Principal(args = {}) {
    let can = document.querySelector("canvas");
    principal = {
        //Tamanho
        w: 30, 
        h: 30,

        //Movimento
        andar: [],
        vx: 0,
        vy: 0,
        vm: 100,

        //Caracteristicas
        nome:"???",
        hp: 100,
        hpMax: 100,
        mp: 20,
        mpMax:20,
        atkMin:1,
        atkMax:3,
        xp:0,
        lvl:1,
        morto: false,
        
        //Skils / controle
        mouse: setMouse(),
        abilidades : {q:undefined,w:undefined},
        mouseX:-1,
        mouseY: -1,

        //Controles do Sprite
        sprite: undefined,
        norte: false,
        leste: false,
        x: 10,
        y: can.height/2-30,

        //Controles de tempo
        hprec: 2,
        hps:4,
        hpsAux:4,
        mprec: 1,
        mps:3,
        mpsAux:3,

        //Controle de movimentação

        //Controle Usuario
        click: setClick(undefined,undefined),
    };

    Object.assign(this,principal,args);
}

Principal.prototype = new Principal();
Principal.prototype.constructor = Principal;


//Controle Do personagem
canvas.addEventListener("mousemove", function (e) {
    principal.mouse((e.clientX -10),(e.clientY -10),principal);
});

/** Função que seta as cordenadas do mouse para variaveis do Obj.
 * 
 * @param {Number} mouseX -> Posição do mouse em relação ao eixo X (Width) já excluindo a margin.
 * @param {Number} mouseY -> Posição do mouse em relação ao eixo Y (Height) já excluindo a margin.
 * @param {Principal} Obj -> Personagem principal.
 * @returns {Function}
 */
function setMouse(mouseX,mouseY,Obj) {
    return function (mouseX,mouseY,Obj) {
        Obj.mouseX = mouseX;
        Obj.mouseY = mouseY;
    }
}

canvas.addEventListener("mousedown", function (e) {
    principal.click(e,principal);
});

/** Função que captura o click do mouse.
 * 
 * @param {Event} e -> Evento do click.
 * @param {Principal} Obj -> Personagem principal.
 * @returns {Function}
 */
function setClick(e,Obj){
    return function (e,Obj){
        if(e.button == 0){
            let andarAux = {
                marcaX: e.clientX -10,
                marcaY: e.clientY -10,
            };
            Obj.andar[0]=andarAux;
        }
    }
}

/** Função que exibe o personagem dando prioridade para ele mesmo, depois sua movimentação e por fim sua barra de vida.
 * 
 * @param {CanvasRenderingContext2D} ctx -> contexto do canvas (2D).
 * @param {Number} dt -> tempo do quadro em ms.
 */
Principal.prototype.inf = function (ctx,dt) {
    var can = document.querySelector("canvas");
    this.desenhaPersonagem(ctx,dt);
    this.mover(dt,can);
    this.desenhaBarra(ctx,dt,can);
};

/** Função que exibe a barra de vida, controla o hps e mps e verifica se o personagem está vivo.
 * 
 * @param {CanvasRenderingContext2D} ctx -> contexto do canvas (2D).
 * @param {Number} dt -> tempo do quadro em ms.
 * @param {HTMLCanvasElement} can -> canvas.
 */
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
            this.morto = true;
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

/** Função que divide o "cima" por "baixo".
 * 
 * @param {Number} cima -> numero que é o dividendo.
 * @param {Number} baixo -> numero que é o divisor.
 * @returns {Number} cima / baixo
 */
Principal.prototype.porc = function (cima, baixo) {
    return cima / baixo;
};

/** Função que é responsável por desenhar o personagem.
 * 
 * @param {CanvasRenderingContext2D} ctx -> contexto do canvas (2D).
 * @param {Number} dt -> tempo do quadro em ms.
 */
Principal.prototype.desenhaPersonagem = function (ctx,dt){
    if (this.sprite == undefined) {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x,this.y,this.w,this.h);
    }
};

/** Função que é responsável por mover o personagem.
 * 
 * @param {Number} dt -> tempo do quadro em ms.
 * @param {HTMLCanvasElement} can -> canvas.
 * 
 */
Principal.prototype.mover = function(dt,can){
    if (this.andar[0]!=null) {
        this.vx = this.vm*Math.sign(this.andar[0].marcaX - (this.x+ Math.round(this.w/2)));
        this.vy = this.vm*Math.sign(this.andar[0].marcaY - (this.y+this.h));

        if ((this.x + this.vx * dt + Math.round(this.w/2)) == this.andar[0].marcaX) {
            this.vx = 0;
        }

        if ((this.y + this.vy * dt + this.h) == this.andar[0].marcaY) {
            this.vy = 0;
        }

        if ((this.x + this.vx * dt + Math.round(this.w/2)) < can.width && (this.x + this.vx * dt) >= 0) {
            this.x = this.x + this.vx * dt;
        }
        if ((this.y + this.vy * dt + this.h) < can.height-55 && (this.y + this.vy * dt) >= 0) {
            this.y = this.y + this.vy * dt;
        }

        if (this.x == this.andar[0].marcaX && this.y == this.andar[0].maracY) {
            this.andar[0] = null;
        }
    }

};