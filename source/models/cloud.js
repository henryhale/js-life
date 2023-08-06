import { canvasWidth } from "../constants.js";

const screenOffset = 100;
const minHeight = 25;
const minSpeed = 5;
const minSize = 1;

export function createCloud() {
    return {
        x: canvasWidth * Math.random() + screenOffset,
        y: Math.random() * 5 + minHeight,
        speed: minSpeed * (Math.random() + 1),
        size: minSize + Math.random() * 10
    }
}

export function updateCloud(cloud, dt) {
    cloud.x -= cloud.speed * dt;
    if (cloud.x < -screenOffset) {
        cloud.x = screenOffset * Math.random() + canvasWidth;
    }
}

export function renderCloud(cloud, ctx) {
    const { size: s, x, y  } = cloud;
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.strokeStyle = '#a3a1a1';
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(x, y, s, Math.PI, -Math.PI/2);
    ctx.arc(x + s, y, s, 0, Math.PI/4);
    ctx.arc(x + s, y + s/2, s, Math.PI/4, Math.PI/2);
    ctx.quadraticCurveTo(x - s, y + s, x - s*2, y + 2*s);
    ctx.quadraticCurveTo(x - 2*s, y + s, x - 4*s, y + 2*s);
    ctx.quadraticCurveTo(x - 2*s, y + s, x - 5*s, y + 2*s);
    ctx.quadraticCurveTo(x - s, y, x - 4*s, y + s);
    ctx.arc(x - 1.5*s, y + s, 10, -Math.PI, -Math.PI/7);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.restore();
}