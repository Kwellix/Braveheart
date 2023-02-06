const times = [];
let fps;
let multiplier;

let playerSpeed
let playerFrameSpeed
let mobSpeedMultiplier

function refreshLoop() {
    window.requestAnimationFrame(() => {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) {
            times.shift();
        }
        times.push(now);
        fps = times.length;
        refreshLoop();
    });
    if (fps < 80) {
        playerSpeed = 5.5
        playerFrameSpeed = 5
        mobSpeedMultiplier = 1.1
    } else if (fps > 80 && fps < 100) {
        playerSpeed = 4
        playerFrameSpeed = 8
        mobSpeedMultiplier = 0.8
    } else if (fps > 100) {
        playerSpeed = 3
        playerFrameSpeed = 11
        mobSpeedMultiplier = 0.6
    }
}

refreshLoop();



