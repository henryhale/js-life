import { canvasWidth } from "../constants.js";

export const road = {
    segments: [],
    interval: 5,
    get last() {
        return this.segments[this.segments.length - 1]
    }
};

export let canMove = false;

export function updateRoad() {
    if (!road.segments.length) {
        road.segments.push({ x: 0, y: 150 });
    } else {
        road.segments.push({
            x: road.last.x + road.interval, 
            y: Math.random() * (4) + 148,
            stone: Math.random() * 5 > 3 && Math.random() * 5 < 3
        });
    } 
    
    if (road.last.x > canvasWidth) {
        road.segments.shift();
        road.segments = road.segments.map(s => {
            s.x -= road.interval;
            return s;
        });
        if (!canMove) canMove = true;
    }
}

export function renderSegments(ctx) {
    ctx.save();
    let prev;
    road.segments.forEach((s, i) => {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0,0,0,0.7)';
        prev = road.segments[i - 1] || { x: 0, y: 150 };
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(s.x, s.y);
        if (s?.stone) ctx.fillRect(s.x-road.interval, s.y+road.interval, road.interval, 1);
        ctx.stroke();
    });
    ctx.restore();
}