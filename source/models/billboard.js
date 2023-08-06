import { canvasHeight, canvasWidth } from "../constants.js";

const screenOffset = 65;

export const billboard = {    
    x: canvasWidth + screenOffset,
    y: 100,
    size: 15,
    adIndex: 0,
    ads: []
};

export function updateBillboard(dt) {
    billboard.x -= 45 * dt;
    if (billboard.x < -3 * billboard.size) {
        billboard.x = canvasWidth + Math.random() * 20 + 70;
        if (++billboard.adIndex > billboard.ads.length - 1) {
            billboard.adIndex = 0;
        }
    }
}

export function renderBillboard(ctx) {
    const { x, y, size, ads, adIndex } = billboard;
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0,0,0,0.35)';
    ctx.moveTo(0, y + 2.5 * size);
    ctx.lineTo(canvasWidth, y + 2.5 * size);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = '#797676';
    ctx.fillStyle = '#797676';
    ctx.fillRect(x + 0.85 * size, y - size, 0.45 * size, 3.5 * size);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + 1.25 * size, y);
    ctx.lineTo(x + 1.25 * size, y + 2.5 * size);
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = '#FFFFFF';
    ctx.rect(x - size, y - 2.75 * size, 4 * size, 2.5 * size);
    ctx.fill();
    ctx.stroke();
    ctx.font = '1.5rem serif';
    ctx.fillStyle = 'black'
    ctx.fillText(ads[adIndex], x + 0.2 * size, y - size);
    ctx.restore();
}