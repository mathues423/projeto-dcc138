function frames(t) {
    dt = (t - anterior) / 1000;
    limpar();
    if (principal.teclas.w) {
        principal.abilidades.w.tipo(principal,context);
    }
    anterior = t;
    requestAnimationFrame(frames);
}
var dt, anterior = 0;
requestAnimationFrame(frames);