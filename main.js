import { canvasHeight, canvasWidth } from "./source/constants.js";
import { 
    billboard,
    player,
    createCloud,

    updateBillboard,
    updateCloud,
    updatePlayer,

    renderBillboard,
    renderCloud,
    renderPlayer,

    canMove,

    updateRoad,
    renderSegments,

    gameLoop
} from "./source/index.js";

const ctx = document.querySelector('canvas').getContext('2d');

const clouds = Array.from({ length: 6 }).fill(null).map(c => createCloud());

player.size = 4.25*canvasWidth/canvasHeight;

billboard.ads = ['🖥️', '☠️', '😎', '🤖'];

function update(dt) {
    updateRoad();    
    if (canMove) {
        updatePlayer(dt);
        updateBillboard(dt);
        clouds.forEach(c => updateCloud(c, dt));
    }
}

function render() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    clouds.forEach(c => renderCloud(c, ctx));

    renderBillboard(ctx);

    renderSegments(ctx);

    renderPlayer(ctx);
}

const btn = document.querySelector('button');
btn.onclick = () => {
    btn.parentNode.removeChild(btn);
    gameLoop({ render, update, canvas: ctx.canvas });
};