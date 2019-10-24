function Inimigo(args = {}) {
    var can = document.querySelector("canvas");
    var aux = 6*Math.random()+6;
    if (args.hpMax == undefined) {
        args.hpMax = 50;
    }
    if (args.hpstemp == undefined) {
        args.hpstemp = 3.5;
    }
    var inimigo = {
        //Tamanho
        w: 30, 
        h: 30,

        //Movimento
        vx: 0,
        vy: 0,
        vm: 60,
        angulo: undefined,
        posiC:-1,
        posiL:-1,

        //Caracteristicas
        nome:"???",
        hpMax: args.hpMax,
        hp: args.hpMax,
        atkMin:1,
        atkMax:3,
        xp:10,
        lvl:1,
        agressivo: false,
        comportamento: undefined,

        //Controles do Sprite
        sprite: undefined,
        norte: false,
        leste: false,
        passo: 0,
        tempSprite : 0.15,
        tempSpriteAux : 0.15,

        x: can.width / 3 + Math.random() * (2 / 3 * can.width - 60),
        y: can.height / 3 + Math.random() * (2 / 3 * can.height - 120),
        spaw: false,

        //Controles de tempo
        hpstempaux: args.hpstemp,
        hpstemp: args.hpstemp,
        tempAndando: aux,
        tempAndandoAux: aux,
        tempParado: aux+3,
        tempParadoAux: aux+3,

        //Controle de combate
        marcado: false,
        itsLife: true,
        danoVet: [],
        doge: 10,
        tempdano: 0.8,
        agressivo: false,
        hps: 1,
        rangeFisico: 30,
        atkpsAux: 1,
        atkps: 1,
    };

    Object.assign(this,inimigo,args);
}

Inimigo.prototype = new Inimigo();
Inimigo.prototype.constructor = Inimigo;

/** Função que exibe o inimigo dando prioridade para ele mesmo, depois sua movimentação e por fim sua barra de vida.
 * 
 * @param {CanvasRenderingContext2D} ctx -> contexto do canvas (2D).
 * @param {Number} dt -> tempo do quadro em ms.
 * @param {Principal} principal -> principal.
 * @param {Mapa} Mapa -> principal.
 */
Inimigo.prototype.inf = function(ctx,dt,principal,Mapa){
    var can = document.querySelector("canvas");
    if(!this.spaw){
        if (Mapa.list) {
            let rand = Math.floor(Math.random()*Mapa.casasVazias);
            this.x = Mapa.list[rand].i*Mapa.W;
            this.y = Mapa.list[rand].j*Mapa.H;
            console.log(`Base ${rand} Enemi criado em x: ${this.x} | y: ${this.y}`);
        }else{
            var list = [];
            var cont = 0;
            for (let coluna = 0; coluna < Mapa.Mapa.length; coluna++) {
                for (let linha = 0; linha < Mapa.Mapa[coluna].length; linha++) {
                    if (Mapa.Mapa[coluna][linha]!=0) {
                        list[cont] = {i:linha, j:coluna};
                        cont++;
                    }
                }
            }
            Mapa.list = list;
            Mapa.casasVazias = cont;
            let rand = Math.floor(Math.random()*cont);
            this.x = list[rand].i*Mapa.W;
            this.y = list[rand].j*Mapa.H;
            console.log(`Lista criada no mapa com um total de ${cont} casa(s) vazia(s).`);
            console.log(`Base ${rand} Enemi criado em x: ${this.x} | y: ${this.y}`);
        }
        
        this.spaw = true;
    }
    this.desenhaHpNome(ctx);
    this.desenhaPersonagem(ctx,dt);
    this.mover(dt,can,principal,Mapa);
};

/** Função responsavel por desenhar a vida caso tiver perdido ou o nome.
 * 
 * @param {CanvasRenderingContext2D} ctx -> contexto do canvas (2D).
 */
Inimigo.prototype.desenhaHpNome = function (ctx) {
    var tammax = 50;
    if (this.hp == this.hpMax) {
        ctx.fillStyle = "white";
        let vet = this.nome.split("");
        let auxiliarX = 0, auxtamanho = vet.length;
        ctx.font = "12px monospace";
        if (auxtamanho * 7 > this.w) {
            while (true) {
                if (auxtamanho - 3 > 0) {
                    if ((auxtamanho - 3) % 3 == 2)
                        auxiliarX = auxiliarX - 7;

                    auxtamanho = auxtamanho - 3;
                } else {
                    break;
                }
            }
        }
        for (let i = 0; i < vet.length; i++) {
            ctx.fillText(vet[i], this.x + auxiliarX + (i * 7), this.y + 12 + this.h);
        }
    } else if (this.itsLife) {///Controle do hp parecido com o nome(vetor) ###Falta###
        this.agressivo = true;
        ctx.fillStyle = 'hsl('+ 120*this.porc(this.hp, this.hpMax) +',100%,50%)';
        ctx.fillRect(this.x - tammax / 2 + this.w / 2, this.y + this.h + 10, tammax * this.porc(this.hp, this.hpMax), 6);
        // ctx.fillRect(this.x - tammax / 2 + this.w / 2, this.y + this.h + 10, tammax * this.porc(this.hp, this.hpMax), 6);

        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x - tammax / 2 + this.w / 2, this.y + this.h + 10, tammax, 6);

        ctx.fillStyle = "white";
        ctx.font = "10px sans-serif";
        ctx.fillText(this.hp + " / " + this.hpMax, this.x, this.y + this.h + 30, tammax);

        if (this.itsLife && this.hp > this.hpMax) {
            this.hp = this.hpMax;
        }
        if (this.itsLife && this.hp < this.hpMax) {
            this.hpstempaux = this.hpstempaux - dt;
            if (this.hpstempaux < 0) {
                if (this.hp + this.hps < this.hpMax)
                    this.hp = this.hp + this.hps;
                else
                    this.hp = this.hpMax;
    
                this.hpstempaux = this.hpstemp;
            }
        }
    }
};

/** Função que divide o "cima" por "baixo".
 * 
 * @param {Number} cima -> numero que é o dividendo.
 * @param {Number} baixo -> numero que é o divisor.
 * @returns {Number} cima / baixo
 */
Inimigo.prototype.porc = function (hpAtual, hpTotal) {
    return hpAtual / hpTotal;
};

/** Função que é responsável por desenhar o inimigo.
 * 
 * @param {CanvasRenderingContext2D} ctx -> contexto do canvas (2D).
 * @param {Number} dt -> tempo do quadro em ms.
 */
Inimigo.prototype.desenhaPersonagem = function (ctx,dt){
    if (this.marcado) {
        this.foco(ctx);
    }
    for (let i = 0; i < this.danoVet.length; i++) {
        ctx.globalAlpha = this.danoVet[i].alf;
        if (this.danoVet[i].dano == "Doge") {
            ctx.font = "14px sans-serif";
            ctx.fillStyle = "#20211c";
        } else {
            ctx.fillStyle = "red";
            ctx.font = "17px sans-serif";
        }
        ctx.fillText(this.danoVet[i].dano, this.danoVet[i].x, this.danoVet[i].y);
        this.danoVet[i].y -= 1;
        this.danoVet[i].alf = this.danoVet[i].alf - 0.01;
        this.danoVet[i].temporestante = this.danoVet[i].temporestante - dt;
        if (this.danoVet[i].temporestante < 0) {
            this.danoVet.splice(i, 1);
        }
    }
    ctx.globalAlpha = 1;
    if (this.sprite == undefined) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x,this.y,this.w,this.h);
    }else{
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
        var img = new Image();
        img.src = this.sprite;
        ctx.save();
        if (this.tempParadoAux > 0) {
            this.animacaoIdle(ctx,dt,img);
        }else if (this.tempAndandoAux > 0) {
            this.animacaoWalking(ctx,dt,img);
        }
        ctx.restore();
    }
    // ctx.strokeRect(this.x,this.y, this.w,this.h);
};

/** Função que é responsável por fazer a animação do inimigo quando ele ficar parado.
 * 
 * @param {CanvasRenderingContext2D} ctx -> contexto do canvas (2D).
 * @param {Number} dt -> tempo do quadro em ms.
 * @param {Image} img -> tempo do quadro em ms.
 */
Inimigo.prototype.animacaoIdle = function(ctx,dt,img){
    this.tempSpriteAux -= dt;
    let nort = 235,west = 1;
    if (this.tempSpriteAux < 0) {
        this.tempSpriteAux = this.tempSprite;
        this.passo= (this.passo+1)%4;
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
            ctx.drawImage(img, 60 * this.passo+ nort, 0, 60, 60, (this.x)*west-4-this.w, this.y-7, this.w*1.3, this.h*1.3);
        } else {
            ctx.drawImage(img, 60 * this.passo+ nort, 0, 60, 60, (this.x)*west-4, this.y-7, this.w*1.3, this.h*1.3);
        }
    }else{
        // ctx.drawImage(img, 60 * this.passo, 0, 60, 60, (this.x)*west, this.y-7, this.w*1.3, this.h*1.3);
        if (west == -1) {
            ctx.drawImage(img, 60 * this.passo, 0, 60, 60, (this.x)*west-4-this.w, this.y-7, this.w*1.3, this.h*1.3);
        } else {
            ctx.drawImage(img, 60 * this.passo, 0, 60, 60, (this.x)*west-4, this.y-7, this.w*1.3, this.h*1.3);
        }
    }
    if (west == -1) {
        ctx.translate(-can.width,can.height);
    }
};

/** Função que é responsável por fazer a animação do inimigo quando ele andar.
 * 
 * @param {CanvasRenderingContext2D} ctx -> contexto do canvas (2D).
 * @param {Number} dt -> tempo do quadro em ms.
 * @param {Image} img -> imagem do inimigo.
 */
Inimigo.prototype.animacaoWalking = function(ctx,dt,img){
    this.tempSpriteAux -= dt;
    let nort = 60,west = 1;
    
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
        if (west == -1) {
            ctx.drawImage(img, 52.5 * this.passo, 60 + nort, 52.5, 60, (this.x)*west-4-this.w, this.y-7, this.w*1.3, this.h*1.3);
        } else {
            ctx.drawImage(img, 52.5 * this.passo, 60 + nort, 52.5, 60, (this.x)*west-4, this.y-7, this.w*1.3, this.h*1.3);
        }
    }else{
        if (west == -1) {
            ctx.drawImage(img, 55 * this.passo, 60, 55, 60, (this.x)*west-4-this.w, this.y-7, this.w*1.3, this.h*1.3);
        } else {
            ctx.drawImage(img, 55 * this.passo, 60, 55, 60, (this.x)*west-4, this.y-7, this.w*1.3, this.h*1.3);
        }
    }
};

/** Função que é responsável por mover o inimigo.
 * 
 * @param {Number} dt -> temdo do quadro em ms.
 * @param {HTMLCanvasElement} can -> canvas.
 * @param {Principal} principal -> principal.
 */
Inimigo.prototype.mover = function (dt,can,principal,Mapa){
    // console.log(Mapa);
    if (this.agressivo) {
        this.posiC = Math.floor(this.x / Mapa.W);
        this.posiL = Math.floor(this.y / Mapa.H);
        if (Math.sign(principal.x - this.x)*(principal.x - this.x) > this.rangeFisico) {
            this.vx = this.vm*Math.sign(principal.x - this.x);
        }else{
            this.vx = 0;
        }
        
        if (Math.sign(principal.y - this.y)*(principal.y - this.y) > this.rangeFisico) {
            this.vy = this.vm*Math.sign(principal.y - this.y );
        }else{
            this.vy = 0;
        }

        if ((this.x >= 0 && (this.x + this.w) <= can.width) 
        && (this.y >= 0 && (this.y + this.h) <= can.height)) {
            this.aplicar(dt,Mapa);
            // this.x = this.x + this.vx * dt;
            // this.y = this.y + this.vy * dt;
        }else{
            // Saiu da borda
        }

        if (!this.vx && !this.vy) {
            this.atkpsAux -= dt;
            if (this.atkpsAux <= 0) {
                this.atkpsAux = this.atkps;
                principal.dano(this.atkMin,this.atkMax);
            }
        }else{
            this.atkpsAux = this.atkps;
        }
    }else{
        if (this.tempParadoAux > 0) { // Animação Idle
            this.tempParadoAux -= dt;
            this.angulo = Math.random()*(360);
            return;
        } 
        if (this.tempAndandoAux > 0) { // Animação Walking
            this.posiC = Math.floor(this.y / Mapa.H);
            this.posiL = Math.floor(this.x / Mapa.W);
            this.tempAndandoAux -= dt;
            
            this.vx = this.vm * Math.sin(this.angulo * Math.PI/180);
            this.vy = this.vm * Math.cos(this.angulo * Math.PI/180);
            
            this.aplicar(dt,Mapa);
            // if ((this.x + this.vx * dt + this.w) < can.width && (this.x + this.vx * dt) >= 0) {
            //     this.x = this.x + this.vx * dt;
            // }
            // if ((this.y + this.vy * dt + this.h) < can.height-55 && (this.y + this.vy * dt) >= 0) {
            //     this.y = this.y + this.vy * dt;
            // }
            return;
        }
        
        this.tempAndandoAux = this.tempAndando;
        this.tempParadoAux = this.tempParado;
    }
};

/** Função que é responsavel por desenhar um quadrado branco no inimigo que está  sendo focado.
 * 
 * @param {CanvasRenderingContext2D} ctx -> contexto do canvas (2D).
 */
Inimigo.prototype.foco = function (ctx){
    ctx.fillStyle = "white";
    ctx.fillRect(this.x + this.w/2 - 2, this.y - 2, 4,4);
};

/** Função que é responsavel por ver o dano sofrido pelo inimigo. 
 * 
 * @param {Number} atkMin ->o ataque minimo do personagem inimigo.
 * @param {Number} atkMax ->o ataque máximo do personagem inimigo.
 */
Inimigo.prototype.dano = function(atkMin,atkMax){
    if (this.hp > 0) {
        if (Math.random()*100 > this.doge) {
            let damage = Math.round(Math.random()*(atkMax-atkMin)+atkMin);
            let i = {dano: damage, temporestante: this.tempdano, x: this.x + this.w + 4, y: this.y + this.h / 2, alf: 1 }
            this.agressivo = true;
            this.danoVet.push(i);
            
            this.hp -= damage;
            if (this.hp <= 0){
                // console.log("Morto");
                this.itsLife = false;
            }
        }else{
            let d = {dano: "Doge", temporestante: this.tempdano, x: this.x + this.w + 4, y: this.y + this.h / 2, alf: 1 }
            this.danoVet.push(d);
        }
    }else{
        this.itsLife = false;
    }
};

/** Função que é responsavel por ver o dano sofrido pelo inimigo. 
 * 
 * @param {Number} atkMin ->o ataque minimo do personagem inimigo.
 * @param {Number} atkMax ->o ataque máximo do personagem inimigo.
 * @param {Number} auxX ->um auxiliar para diferenciar uma skill.
 */
Inimigo.prototype.danoSkill = function(atkMin,atkMax, auxX, auxY){
    if (this.hp > 0) {
        if (Math.random()*100 > this.doge) {
            let damage = Math.round(Math.random()*(atkMax-atkMin)+atkMin);
            this.hp -= damage;
            
            let i = {dano: damage, temporestante: this.tempdano, x: this.x + this.w + 4 + auxX, y: this.y + this.h / 2+ auxY, alf: 1 }
            this.agressivo = true;
            this.danoVet.push(i);
            if (this.hp <= 0)
                this.itsLife = false;
        }else{
            let d = {dano: "Doge", temporestante: this.tempdano, x: this.x + this.w + 4 +auxX, y: this.y + this.h / 2 +auxY, alf: 1 }
            this.danoVet.push(d);
        }
    }else{
        this.itsLife = false;
    }
};

Inimigo.prototype.aplicar = function (dt,Mapa) {
    var dnx;
    var dx;
    var dy;
    dx = this.vx * dt;
    dnx = dx;
    dy = this.vy * dt;
    dny = dy;
    if (dx > 0 && Mapa.Mapa[this.posiC][this.posiL + 1] === 0) {
        dnx = Mapa.W * (this.posiL + 1) - (this.x + this.w );
        dx = Math.min(dnx, dx);
    }
    if (dx < 0 && Mapa.Mapa[this.posiC][this.posiL - 1] === 0) {
        dnx = Mapa.W * (this.posiL - 1 ) - (this.x - this.w );
        dx = Math.max(dnx, dx);
    }
    if (dy > 0 && Mapa.Mapa[this.posiC + 1][this.posiL] === 0) {
        dny = Mapa.H * (this.posiC + 1) - (this.y + this.h );
        dy = Math.min(dny, dy);
    }
    if (dy < 0 && Mapa.Mapa[this.posiC - 1][this.posiL] === 0) {
        dny = Mapa.H * (this.posiC - 1) - (this.y - this.h );
        dy = Math.max(dny, dy);
    }
    this.x = this.x + dx;
    this.y = this.y + dy;

    var MAXX = Mapa.W * Mapa.linha - this.w ;
    var MAXY = Mapa.H * Mapa.coluna - this.h ;

    if (this.x > MAXX) this.x = MAXX;
    if (this.y > MAXY) {
        this.y = MAXY;
        this.vy = 0;
    }
    if (this.x - this.w / 2 < 0) this.x = 0 + this.w / 2;
    if (this.y - this.h / 2 < 0) this.y = 0 + this.h / 2;
}