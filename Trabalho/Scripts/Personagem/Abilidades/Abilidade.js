function Abilidade(params = {}) {
    var abilidade = {
        cd: params.cd,
        cdAux: params.cd,
        custo: 1,
        area: 0,
        x: -1,
        y: -1,
        tipo: undefined,
        danoBase: 2,

        temp: params.temp,
        tempAux: params.temp,
    };

    Object.assign(this,abilidade,params);
}

Abilidade.prototype = new Abilidade();
Abilidade.prototype.constructor = Abilidade;

Abilidade.prototype.cast = function (principal,alvo,mouseX,mouseY) {
    if (this.tipo != undefined) {
        if (this.cdAux == 0) {
            if (this.tipo == "clickUse") {
                this.castclickUse(principal,alvo,20, 10);
                this.castclickUse(principal,alvo,15, 15);
                this.castclickUse(principal,alvo,10, 20);
                principal.mp -= this.custo;
            }
            this.cdAux = this.cd;
        }
    }
};
/**
 * 
 * @param {Principal} principal
 * @param {Inimigo} alvo
 * @param {Number} auxX
 */
Abilidade.prototype.castclickUse = function (principal,alvo,auxX,auxY) {
    alvo.danoSkill(this.danoBase + principal.atkMin,this.danoBase + principal.atkMax, auxX, auxY);
    // console.log(principal);
};