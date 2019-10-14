// Controle da exibição do personagem principal e do level(conjunto de mapas).
function DrawLevel(level) {
    if (level.char) {
        level.char.Passo();
    }
    for (let col = 0; col < MAX_H_L; col++) {
        for (let lin = 0; lin < MAX_W_L; lin++) {
            DrawCel(level.mapa[col][lin]);
        }
    }
}

function DrawCel(Code) {
    let tamX = canvas.width/(MAX_W_L*MAX_W_M),tamY = canvas.height/(MAX_H_M*MAX_H_L);
    let x=0,y=0;
    let cont=0;
    for (let col = 0; col < MAX_H_M; col++) {
        for (let lin = 0; lin < MAX_W_M; lin++) {
            switch (Hashing_Map[Code].cels[col][lin]) {
                case 0:
                    context.fillStyle = cores[1];
                    break;
                case 1:
                    context.fillStyle = cores[0];
                    break;
            
                default:
                    context.fillStyle = cores[2];
                    break;
            }
            context.fillRect(x,y , x+tamX,y+tamY);
            context.strokeRect(x,y , x+tamX,y+tamY);
            x+= tamX;
            cont++;
            if (Hashing_Map[Code].cels[col][lin] == 0) {
                context.fillStyle = "white";
                console.log(Hashing_Map[Code].cels[col][lin]);
            }else{
                context.fillStyle = "black";
            }
            context.fillText(`ID:${Hashing_Map[Code].cels[col][lin]}`,x,y+tamY/2);
            context.fillText(`(${x}|${y})`,x,y+tamY);
        }
        x=0;
        // console.log(`Cont:${cont}`);
        y+= tamY;
    }
}