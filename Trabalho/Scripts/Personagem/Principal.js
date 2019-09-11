function Principal(args = {}) {
    let can = document.querySelector("canvas");
    principal = {
        //Tamanho
        w: 30, 
        h: 30,

        //Movimento
        marcaX: -1,
        marcaY: -1,
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
        parado: true,
        passo: 0,
        tempSprite : 0.15,
        tempSpriteAux : 0.15,
        
        //Controles de tempo
        hprec: 2,
        hps:4,
        hpsAux:4,
        mprec: 1,
        mps:3,
        mpsAux:3,

        //Controle Usuario
        click: setClick(undefined,undefined),

        //Controle de combate
        inimigos: [],
        index: -1,
        rangeFisico: 30,
        atkps: 1/1,
        atkpsAux: 1/1,
        // marcaX: -1,
        // marcaY: -1,

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
            Obj.marcaX = e.clientX -10;
            Obj.marcaY = e.clientY -10;
            Obj.verifica(e.clientX -10,e.clientY -10);
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

/** Função que é responsável por desenhar o personagem.
 * 
 * @param {CanvasRenderingContext2D} ctx -> contexto do canvas (2D).
 * @param {Number} dt -> tempo do quadro em ms.
 */
Principal.prototype.desenhaPersonagem = function (ctx,dt){
    if (this.sprite == undefined) {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x,this.y,this.w,this.h);
    }else{
        var img = new Image();
        img.src = this.sprite;
        ctx.save();
        if (this.vy>0) { // Norte
            this.norte = false;
        } else if(this.vx == 0){
        }else{
            this.norte = true;
        }

        if (this.vx > 0) { // Leste
            this.leste = true;
        } else if(this.vy == 0){
        }else{
            this.leste = false;
        }
        if (this.parado) {
            this.animacaoIdle(ctx,dt,img);
        }else{
            this.animacaoWalking(ctx,dt,img);
        }
        ctx.restore();
    }
};

/** Função que é responsável por fazer a animação do perçonagem principal quando ele ficar parado.
 * 
 * @param {CanvasRenderingContext2D} ctx -> contexto do canvas (2D).
 * @param {Number} dt -> tempo do quadro em ms.
 * @param {Image} img -> imagem do perçonagem principal.
 */
Principal.prototype.animacaoIdle = function(ctx,dt,img){
    this.tempSpriteAux -= dt;
    let nort = 320,west = 1;
    if (this.tempSpriteAux < 0) {
        this.tempSpriteAux = this.tempSprite;
        this.passo = (this.passo+1)%4;
    }

    var can = document.querySelector("canvas");
    if (this.leste) {
        ctx.scale(-1,1);
        west = -1;
    }else{
        ctx.scale(1,1);
    }
    
    if (this.norte) {
        // ctx.drawImage(img, 60 * this.passo + nort, 0, 60, 60, (this.x)*west, this.y-7, this.w*1.3, this.h*1.3);
        if (west == -1) {
            ctx.drawImage(img, 80 * this.passo+ nort, 0, 60, 60, (this.x)*west-4-this.w, this.y-7, this.w*1.3, this.h*1.3);
        } else {
            ctx.drawImage(img, 80 * this.passo+ nort, 0, 60, 60, (this.x)*west-4, this.y-7, this.w*1.3, this.h*1.3);
        }
    }else{
        // ctx.drawImage(img, 60 * this.passo, 0, 60, 60, (this.x)*west, this.y-7, this.w*1.3, this.h*1.3);
        if (west == -1) {
            ctx.drawImage(img, 80 * this.passo, 0, 60, 60, (this.x)*west-4-this.w, this.y-7, this.w*1.3, this.h*1.3);
        } else {
            ctx.drawImage(img, 80 * this.passo, 0, 60, 60, (this.x)*west-4, this.y-7, this.w*1.3, this.h*1.3);
        }
    }
    if (west == -1) {
        ctx.translate(-can.width,can.height);
    }
};

/** Função que é responsável por fazer a animação do perçonagem principal quando ele andar.
 * 
 * @param {CanvasRenderingContext2D} ctx -> contexto do canvas (2D).
 * @param {Number} dt -> tempo do quadro em ms.
 * @param {Image} img -> imagem do perçonagem principal.
 */
Principal.prototype.animacaoWalking = function(ctx,dt,img){
    this.tempSpriteAux -= dt;
    let nort = 100,west = 1;

    if (this.tempSpriteAux < 0) {
        this.tempSpriteAux = this.tempSprite;
        this.passo = (this.passo+1)%8;
    }

    if (this.leste) {
        ctx.scale(-1,1);
        west = -1;
    }else{
        ctx.scale(1,1);
    }

    if (this.norte) {
        // ctx.drawImage(img, 52.5 * this.passo, 60 + nort, 52.5, 60, (this.x-4), this.y-7, this.w*1.3, this.h*1.3);
        if (west == -1) {
            ctx.drawImage(img, 80 * this.passo, 60 + nort, 60, 60, (this.x)*west-4-this.w, this.y-7, this.w*1.3, this.h*1.3);
        } else {
            ctx.drawImage(img, 80 * this.passo, 60 + nort, 60, 60, (this.x)*west-4, this.y-7, this.w*1.3, this.h*1.3);
        }
    }else{
        // ctx.drawImage(img, 55 * this.passo, 60, 55, 60, (this.x-4), this.y-7, this.w*1.3, this.h*1.3);
        if (west == -1) {
            ctx.drawImage(img, 80 * this.passo, 80, 60, 60, (this.x)*west-4-this.w, this.y-7, this.w*1.3, this.h*1.3);
        } else {
            ctx.drawImage(img, 80 * this.passo, 80, 60, 60, (this.x)*west-4, this.y-7, this.w*1.3, this.h*1.3);
        }
    }
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

/** Função que é responsável por mover o personagem.
 * 
 * @param {Number} dt -> tempo do quadro em ms.
 * @param {HTMLCanvasElement} can -> canvas.
 */
Principal.prototype.mover = function(dt,can){
    if (this.index != -1 ||  this.marcaX != -1 && this.marcaY != -1) {
        this.parado = false;
        if (this.index != -1) {
            this.marcaX = -1;
            this.marcaY = -1;
            this.inimigos[this.index].marcado = true;
            this.vx = this.vm*Math.sign(- this.x - this.w/2 + (this.inimigos[this.index].x + this.inimigos[this.index].w/2));
            this.vy = this.vm*Math.sign(- this.y - this.h/2 + (this.inimigos[this.index].y + this.inimigos[this.index].h));

            if ((this.x + this.rangeFisico) <= this.inimigos[this.index].x + this.inimigos[this.index].w && (this.x + this.rangeFisico) >= this.inimigos[this.index].x) {
                this.vx = 0;
            }

            if ((this.y + this.rangeFisico) <= this.inimigos[this.index].y + this.inimigos[this.index].h && (this.y + this.rangeFisico) >= this.inimigos[this.index].y) {
                this.vy = 0;
            }

            if (((this.x) >= 0 && (this.x + Math.round(this.w)) <= can.width) 
            && ((this.y) >= 0 && (this.y + (this.h)) <= can.height)) {
                this.x = this.x + this.vx * dt;
                this.y = this.y + this.vy * dt;
            }else{
                // Saiu da borda
            }

            if (!this.vx && !this.vy) {
                this.atkpsAux -= dt;
                if (this.atkpsAux <= 0) {
                    this.atkpsAux = this.atkps;
                    this.inimigos[this.index].dano(this.atkMin,this.atkMax);
                }
            }else{
                this.atkpsAux = this.atkps;
            }
        }else{
            this.vx = this.vm*Math.sign(this.marcaX - (this.x+ Math.round(this.w/2)));
            this.vy = this.vm*Math.sign(this.marcaY - (this.y+this.h));
    
            if ((this.x + Math.round(this.w/2)) >= this.marcaX -1 && (this.x + Math.round(this.w/2)) <= this.marcaX +1) {
                this.vx = 0;
            }
    
            if ((this.y + (this.h)) >= this.marcaY -1 && (this.y + (this.h)) <= this.marcaY +1) {
                this.vy = 0;
            }
    
            if ((this.x + this.vx * dt + Math.round(this.w/2)) < can.width && (this.x + this.vx * dt) >= 0) {
                this.x = this.x + this.vx * dt;
            }
            if ((this.y + this.vy * dt + this.h) < can.height-55 && (this.y + this.vy * dt) >= 0) {
                this.y = this.y + this.vy * dt;
            }
    
            if (((this.x + Math.round(this.w/2)) >= this.marcaX -1 && (this.x + Math.round(this.w/2)) <= this.marcaX +1) 
            && ((this.y + (this.h)) >= this.marcaY -1 && (this.y + (this.h)) <= this.marcaY +1)) {
                this.marcaX = -1;
                this.marcaY = -1;
            }
        }
    }else{
        this.parado = true;
    }

};

/** Função para verificar e marcar o inimigo caso o usuário queira atacar-lo.
 * 
 * *Lembre-se de pegar mudar a referencia para o inicio do canvas.
 * @param {Number} marcaX ->Posição do mouse, no eixo X.
 * @param {Number} marcaY ->Posição do mouse, no eixo Y.
 * @returns {Boolean} ->True caso há um inimigo na posição do click do mouse.
 * @returns {Number} ->O index do inimigo focado, -1 caso não esteja focando um inimigo. 
 */
Principal.prototype.verifica = function(marcaX,marcaY){
    let mx = false,my = false;
    for (let i = 0; i < this.inimigos.length; i++) {
        this.inimigos[i].marcado = false;
    }
    for (let i = 0; i < this.inimigos.length; i++) {
        if (marcaX >= this.inimigos[i].x && marcaX <= this.inimigos[i].x + this.inimigos[i].w) {
            mx = true;
        }
    
        if (marcaY >= this.inimigos[i].y &&  marcaY <= this.inimigos[i].y + this.inimigos[i].h) {
            my = true;
        }

        if (mx && my) {
            this.index = i;
            return true;
        }
    }
    this.index = -1;
    return false;
};