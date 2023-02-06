let keyBlock = false
let startScreenToggle = true
let musicStart = false
let runSound = false
let deathSound = false
let winSound = false
let showWinPortal = false
let portalSound = false
let win = false
let showGates = false
let keyFound = false
let showKey = false

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 31,
        y: canvas.height / 2 - 71
    },
    frames: {
        max: 7
    },
    imageSrc: "./img/player/standing_right.png",
    sprites: {
        left: PlayerStandingLeftImage,
        right: PlayerStandingRightImage,
        runningLeft: PlayerRunningLeftImage,
        runningRight: PlayerRunningRightImage,
        deadLeft: PlayerDeadLeftImage,
        deadRight: PlayerDeadRightImage
    }
})

const playerShadow = new Sprite({
    position: {
        x: player.position.x - 30,
        y: player.position.y + 44
    },
    imageSrc: "./img/player/shadow.png",
})

const deathScreen = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: "./img/deathScreen.png",
})

const startScreen = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: "./img/startScreen.png",
})

const winScreen = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: "./img/winScreen.png",
})

const winPortal = new Sprite({
    position: {
        x: 648,
        y: 113
    },
    imageSrc: "./img/portal_red.png",
})

const gates = new Sprite({
    position: {
        x: -57,
        y: -338
    },
    imageSrc: "./img/gates.png",
})

const key = new Sprite({
    position: {
        x: 670,
        y: 640
    },
    imageSrc: "./img/key.png",
    enemyType: "key",
    shadow: true
})

levels[level].init({
    bgPosition: {
        x: -56,
        y: -174
    },
    enemiesOffset: {
        x: 0,
        y: 0
    }
})

const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false },
    space: { pressed: false },
}

const checkIfRunning = () => {
    if (!keyBlock) {
        let data = Object.entries(keys)
        let isRunning = false
        for (let i = 0; i < data.length - 1; i++) {
            if (data[i][1].pressed) {
                if (!runSound) {
                    audio.Run.play()
                    runSound = true
                    break
                }
                isRunning = true
            }
        }
        if (!isRunning) audio.Run.stop()
    }
}

const playerMovables = [player, playerShadow]

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

const restart = () => {
    gsap.to(overlay, {
        opacity: 1,
        onComplete: () => {
            dialogWindows.forEach(dialog => {
                dialog.show = false
                dialog.isShown = false
            })
            Object.keys(showDialogsData).forEach(key => {
                showDialogsData[key] = false
            })
            console.log(showDialogsData)
            levels["0_2"].init({
                bgPosition: {
                    x: -56,
                    y: -174
                },
                enemiesOffset: {
                    x: 0,
                    y: 0
                }
            })
            player.position.x = 669
            player.position.y = 299
            playerShadow.position.x = player.position.x - 30
            playerShadow.position.y = player.position.y + 44
            offsetBuffer.x = 0
            offsetBuffer.y = 0
            lastDirection = "right"
            player.image = PlayerStandingRightImage
            player.frames.val = 0
            player.frames.elapsed = 0
            keyBlock = false
            player.dead = false
            win = false
            showWinPortal = false
            deathSound = false
            keyFound = false
            gsap.to(overlay, {
                opacity: 0
            })
        }
    })
}

const deathDetect = () => {
    audio.Run.stop()
    player.dead = true
    if (!deathSound) {
        audio.Death.play()
        deathSound = true
    }
    gsap.to(player.frames, {
        val: 6,
        onComplete: () => {
            keyBlock = true
        },
        duration: 0.5,
        modifiers: {
            val: function (x) {
                return parseInt(x);
            }
        }
    })
}

const winDetect = () => {
    audio.Run.stop()
    if (!winSound) {
        audio.Win.play()
        winSound = true
    }
    gsap.to(overlay, {
        opacity: 1,
        onComplete: () => {
            keyBlock = true
            win = true
            audio.Map.stop()
            musicStart = false
            gsap.to(overlay, {
                opacity: 0
            })
            portalSound = false
        },
        duration: 1.5
    })
}

const changeLevel = (transition) => {
    if (transition.isPortal) {
        if (!portalSound) {
            audio.Portal.play()
            portalSound = true
        }
    }
    gsap.to(overlay, {
        opacity: 1,
        onComplete: () => {
            levels[transition.transitTo].init({
                bgPosition: {
                    x: transition.bgPosition.x,
                    y: transition.bgPosition.y
                },
                enemiesOffset: {
                    x: transition.enemiesOffsetData.x,
                    y: transition.enemiesOffsetData.y
                }
            })
            player.position.x = transition.playerPosition.x
            player.position.y = transition.playerPosition.y
            playerShadow.position.x = transition.playerPosition.x - 30
            playerShadow.position.y = transition.playerPosition.y + 44
            offsetBuffer.x = transition.offsetBuffer.x
            offsetBuffer.y = transition.offsetBuffer.y
            gsap.to(overlay, {
                opacity: 0
            })
            portalSound = false
        }
    })
}


let lastDirection = "right"
function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    transitions.forEach(transition => {
        transition.draw()
    })
    if (showWinPortal) winPortal.draw()
    if (showGates) gates.draw()
    if (showKey) key.draw()
    playerShadow.draw()
    player.draw()
    enemies.forEach(enemy => {
        enemy.draw()
        enemy.moving = true
    })
    enemyHitboxes.forEach(hitbox => {
        hitbox.draw()
    })
    foreground.draw()
    if (!startScreenToggle) {
        if (!keyBlock) {
            dialogWindows.forEach(dialog => {
                dialog.draw()
            })
        }
    }

    checkIfRunning()
    if (keyBlock) {
        if (!win) deathScreen.draw()
    }
    if (startScreenToggle) startScreen.draw()
    if (win) winScreen.draw()

    c.save()
    c.globalAlpha = overlay.opacity
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.restore()

    let moving = true
    player.moving = false

    //Detect hitbox collision
    for (let i = 0; i < enemyHitboxes.length; i++) {
        const hitbox = enemyHitboxes[i]
        if (rectangularCollision({
            rectangle1: player,
            rectangle2: {
                ...hitbox, position: {
                    x: hitbox.position.x,
                    y: hitbox.position.y,
                }
            }
        })) {
            lastDirection == "right" ? player.image = player.sprites.deadRight : player.image = player.sprites.deadLeft
            deathDetect()
        }
    }

    if (!keyBlock) {
        if (showWinPortal) {
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: winPortal
            })) {
                winDetect()
            }
        }
        if (!keyFound) {
            if (level == "1_3") {
                if (rectangularCollision({
                    rectangle1: player,
                    rectangle2: key
                })) {
                    audio.KeyFound.play()
                    keyFound = true
                    showKey = false
                }
            }
        }
        if (keys.w.pressed) {
            player.moving = true
            if (!player.dead) lastDirection == "right" ? player.image = player.sprites.runningRight : player.image = player.sprites.runningLeft
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if (rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, position: {
                            x: boundary.position.x,
                            y: boundary.position.y + playerSpeed,
                        }
                    }
                })) {
                    moving = false
                    break
                }
            }
            for (let i = 0; i < transitions.length; i++) {
                const transition = transitions[i]
                if (rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...transition, position: {
                            x: transition.position.x,
                            y: transition.position.y,
                        }
                    }
                })) {
                    changeLevel(transition)
                    break
                }
            }
            if (moving) {
                if (background.position.y > -playerSpeed) {
                    moving = false
                    playerMovables.forEach(playerMovable => {
                        playerMovable.position.y -= playerSpeed
                    })
                    offsetBuffer.y += playerSpeed
                } else {
                    if (offsetBuffer.y < -10 || offsetBuffer.y > 10) {
                        playerMovables.forEach(playerMovable => {
                            playerMovable.position.y -= playerSpeed
                        })
                        offsetBuffer.y += playerSpeed
                    } else {
                        movables.forEach(movable => {
                            movable.position.y += playerSpeed
                        })
                    }
                }
            }
        }
        if (keys.a.pressed) {
            player.moving = true
            if (!player.dead) player.image = player.sprites.runningLeft
            lastDirection = "left"
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if (rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, position: {
                            x: boundary.position.x + playerSpeed,
                            y: boundary.position.y,
                        }
                    }
                })) {
                    moving = false
                    break
                }
            }
            for (let i = 0; i < transitions.length; i++) {
                const transition = transitions[i]
                if (rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...transition, position: {
                            x: transition.position.x,
                            y: transition.position.y,
                        }
                    }
                })) {
                    changeLevel(transition)
                    break
                }
            }
            if (moving) {
                if (background.position.x > -playerSpeed) {
                    moving = false
                    playerMovables.forEach(playerMovable => {
                        playerMovable.position.x -= playerSpeed
                    })
                    offsetBuffer.x += playerSpeed
                } else {
                    if (offsetBuffer.x < -10 || offsetBuffer.x > 10) {
                        playerMovables.forEach(playerMovable => {
                            playerMovable.position.x -= playerSpeed
                        })
                        offsetBuffer.x += playerSpeed
                    } else {
                        movables.forEach(movable => {
                            movable.position.x += playerSpeed
                        })
                    }
                }
            }
        }
        if (keys.s.pressed) {
            player.moving = true
            if (!player.dead) lastDirection == "right" ? player.image = player.sprites.runningRight : player.image = player.sprites.runningLeft
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if (rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, position: {
                            x: boundary.position.x,
                            y: boundary.position.y - playerSpeed,
                        }
                    }
                })) {
                    moving = false
                    break
                }
            }
            for (let i = 0; i < transitions.length; i++) {
                const transition = transitions[i]
                if (rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...transition, position: {
                            x: transition.position.x,
                            y: transition.position.y,
                        }
                    }
                })) {
                    changeLevel(transition)
                    break
                }
            }
            if (moving) {
                if (background.position.y < (canvas.height - background.height + playerSpeed)) {
                    moving = false
                    playerMovables.forEach(playerMovable => {
                        playerMovable.position.y += playerSpeed
                    })
                    offsetBuffer.y -= playerSpeed
                } else {
                    if (offsetBuffer.y < -10 || offsetBuffer.y > 10) {
                        playerMovables.forEach(playerMovable => {
                            playerMovable.position.y += playerSpeed
                        })
                        offsetBuffer.y -= playerSpeed
                    } else {
                        movables.forEach(movable => {
                            movable.position.y -= playerSpeed
                        })
                    }
                }
            }
        }
        if (keys.d.pressed) {
            player.moving = true
            if (!player.dead) player.image = player.sprites.runningRight
            lastDirection = "right"
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if (rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, position: {
                            x: boundary.position.x - playerSpeed,
                            y: boundary.position.y,
                        }
                    }
                })) {
                    moving = false
                    break
                }
            }
            for (let i = 0; i < transitions.length; i++) {
                const transition = transitions[i]
                if (rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...transition, position: {
                            x: transition.position.x,
                            y: transition.position.y,
                        }
                    }
                })) {
                    changeLevel(transition)
                    break
                }
            }
            if (moving) {
                if (background.position.x < (canvas.width - background.width + playerSpeed)) {
                    moving = false
                    playerMovables.forEach(playerMovable => {
                        playerMovable.position.x += playerSpeed
                    })
                    offsetBuffer.x -= playerSpeed
                } else {
                    if (offsetBuffer.x < -10 || offsetBuffer.x > 10) {
                        playerMovables.forEach(playerMovable => {
                            playerMovable.position.x += playerSpeed
                        })
                        offsetBuffer.x -= playerSpeed
                    } else {
                        movables.forEach(movable => {
                            movable.position.x -= playerSpeed
                        })
                    }
                }
            }
        }
    } else {
        if (keys.space.pressed) {
            restart()
        }
    }

    if (!player.dead) {
        if (!player.moving) {
            if (lastDirection == "left") {
                player.image = player.sprites.left
            } else if (lastDirection == "right") {
                player.image = player.sprites.right
            }
        }
    }
    //document.getElementById('level').innerHTML = `${level}`;
    //document.getElementById('playerSpeed').innerHTML = `${playerSpeed}`;
    //document.getElementById('fpsMeter').innerHTML = `FPS: ${fps}`;
    //document.getElementById('coordinates').innerHTML = `PLAYER: ${player.position.x}, ${player.position.y}`;
    //document.getElementById('offsetBuffer').innerHTML = `offsetBUFFER: ${offsetBuffer.x}, ${offsetBuffer.y}`;
    //document.getElementById('bgPosition').innerHTML = `BG: ${background.position.x}, ${background.position.y}`;
}

animate()

window.addEventListener('keydown', (e) => {
    startScreenToggle = false
    if (!musicStart) {
        audio.Map.play()
        musicStart = true
    }
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            break;
        case 'ц':
            keys.w.pressed = true
            break;
        case 'a':
            keys.a.pressed = true
            break;
        case 'ф':
            keys.a.pressed = true
            break;
        case 's':
            keys.s.pressed = true
            break;
        case 'і':
            keys.s.pressed = true
            break;
        case 'd':
            keys.d.pressed = true
            break;
        case 'в':
            keys.d.pressed = true
            break;
        case 'ArrowUp':
            keys.w.pressed = true
            break;
        case 'ArrowLeft':
            keys.a.pressed = true
            break;
        case 'ArrowDown':
            keys.s.pressed = true
            break;
        case 'ArrowRight':
            keys.d.pressed = true
            break;
        case ' ':
            keys.space.pressed = true
            break;
    }
})

window.addEventListener('keyup', (e) => {
    runSound = false
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break;
        case 'ц':
            keys.w.pressed = false
            break;
        case 'a':
            keys.a.pressed = false
            break;
        case 'ф':
            keys.a.pressed = false
            break;
        case 's':
            keys.s.pressed = false
            break;
        case 'і':
            keys.s.pressed = false
            break;
        case 'd':
            keys.d.pressed = false
            break;
        case 'в':
            keys.d.pressed = false
            break;
        case 'ArrowUp':
            keys.w.pressed = false
            break;
        case 'ArrowLeft':
            keys.a.pressed = false
            break;
        case 'ArrowDown':
            keys.s.pressed = false
            break;
        case 'ArrowRight':
            keys.d.pressed = false
            break;
        case ' ':
            keys.space.pressed = false
            break;
    }
})
