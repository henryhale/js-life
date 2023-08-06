/**
 * Polyfill for requestAnimationFrame
 * 
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */
if (!window.requestAnimationFrame) { 
    window.requestAnimationFrame = window.webkitRequestAnimationFrame || 
                                window.mozRequestAnimationFrame    || 
                                window.oRequestAnimationFrame      || 
                                window.msRequestAnimationFrame     || 
                                function(callback, element) {
                                  window.setTimeout(callback, 1000 / 60);
                                }
}

const ts = () => new Date().getTime();

export function gameLoop({ render, update, canvas }) {
    let now = 0, 
        last = ts(),
        step = 1/60,
        dt = 0,
        gdt = 0;
    
    function frame() {
        now = ts();
        dt = Math.min(1, (now - last) / 1000);
        gdt += dt;
        while (gdt > step) {
            gdt -= step;
            update(step);
        }
        render();
        last = now;
        window.requestAnimationFrame(frame, canvas);
    }

    frame();
}
