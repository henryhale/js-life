import { canvasHeight, canvasWidth } from "../constants.js";

// const screenOffset = 0.25 * canvasWidth;

// const maxBump = 0.8 * canvasHeight;

export const player = {
    x: 75,
    y: 142,
    size: 10,
    tyres: {
        angle: 0,
        speed: 5,
    }
};

export function updatePlayer(dt) {
    player.tyres.speed += 1.15 * dt;
    player.tyres.speed = Math.max(0, Math.min(player.tyres.speed, 15));
    player.tyres.angle = (player.tyres.angle + dt * player.tyres.speed);
    if (player.y <= 140) {
        player.y += 1.15;
    } else {
        player.y -= 0.25;
    }
}

function renderTyres(context) {
    const 
        x1 = player.x - player.size * 2.5,
        x2 = player.x + player.size * 2.5,
        y = player.y, 
        angle = player.tyres.angle, 
        size = player.size;
    function drawTyre(ctx, x) {
        ctx.save();
        ctx.translate(x,y);
        ctx.rotate(angle);
        ctx.translate(-x,-y);
        ctx.beginPath();
        ctx.strokeStyle = '#535252';
        ctx.fillStyle = '#d3cdcd';
        ctx.lineWidth = 3;
        ctx.arc(x, y, size, 0, 2*Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(x, y + size);
        ctx.lineTo(x, y);
        ctx.lineTo(x + size, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x - size, y);
        ctx.lineTo(x, y);
        ctx.lineTo(x, y - size);
        ctx.stroke();
        ctx.translate(x,y);
        ctx.rotate(-angle);
        ctx.translate(-x,-y);
        ctx.restore();
    }
    drawTyre(context, x1);
    drawTyre(context, x2);
}

export function renderPlayer(ctx) {
    const { x, y, size } = player;
    const 
        x1 = x - size * 2.5,
        x2 = x + size * 2.5,
        dx = 2;
    ctx.save();
    renderTyres(ctx);
    ctx.strokeStyle = 'rgba(0,0,0,0.7)';
    ctx.beginPath();
    ctx.fillStyle = 'gray';
    ctx.moveTo(x1 + size + dx*1.85, y);
    ctx.lineTo(x2 - size - dx*2, y);
    ctx.quadraticCurveTo(x2, 125, x2 + size * 1.5, y);
    ctx.lineTo(x + 7*size, y);
    ctx.lineTo(x + 6.85*size, y - size);
    ctx.lineTo(x + 4.5*size, y - 1.75*size);
    ctx.lineTo(x + 1.5*size, y - 3.5*size);
    ctx.lineTo(x - 3.5*size, y - 3.5*size);
    ctx.lineTo(x - 5.5*size, y - 1.5*size);
    ctx.lineTo(x - 6.5*size, y - 1.5*size);
    ctx.lineTo(x - 6.5*size, y + 0.25*size);
    ctx.lineTo(x - 4*size, y + 0.25*size);
    ctx.quadraticCurveTo(x1, 125, x1 + size * 1.5, y);
    ctx.stroke();
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = '#DDDDDD';
    ctx.lineWidth = 0.2;
    ctx.moveTo(x + 4.5*size, y - 1.75*size);
    ctx.lineTo(x + 0.5*size, y - 1.75*size);
    ctx.lineTo(x + 0.5*size, y - 3.5*size);
    ctx.lineTo(x + 0.5*size, y - 3.5*size);
    ctx.lineTo(x + 1.5*size, y - 3.5*size);
    ctx.lineTo(x + 4.5*size, y - 1.75*size);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = '#333333';
    ctx.lineWidth = 1;
    ctx.arc(x + 0.5*size, y - 2.5*size, 3.5, -Math.PI/2, Math.PI/2);
    ctx.fill();
    ctx.moveTo(x + 0.5*size, y - 1.5*size - 3.5);
    ctx.lineTo(x + 2.5*size, y - 1.5*size - 3.5);
    ctx.lineTo(x + 2*size, y - 2*size - 3.5);
    ctx.stroke();
    ctx.restore();
}