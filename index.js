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
        runningRight: PlayerRunningRightImage
    }
})

const playerShadow = new Sprite({
    position: {
        x: player.position.x - 30,
        y: player.position.y + 44
    },
    imageSrc: "./img/player/shadow.png",
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
    d: { pressed: false }
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

const changeLevel = (transition) => {
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
    playerShadow.draw()
    player.draw()
    enemies.forEach(enemy => {
        enemy.draw()
        enemy.moving = true
    })
    foreground.draw()

    c.save()
    c.globalAlpha = overlay.opacity
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.restore()

    let moving = true
    player.moving = false
    if (keys.w.pressed) {
        player.moving = true
        lastDirection == "right" ? player.image = player.sprites.runningRight : player.image = player.sprites.runningLeft
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 5,
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
            if (background.position.y > -5) {
                moving = false
                playerMovables.forEach(playerMovable => {
                    playerMovable.position.y -= 5
                })
                offsetBuffer.y += 5
            } else {
                if (offsetBuffer.y != 0) {
                    playerMovables.forEach(playerMovable => {
                        playerMovable.position.y -= 5
                    })
                    offsetBuffer.y += 5
                } else {
                    movables.forEach(movable => {
                        movable.position.y += 5
                    })
                }
            }
        }
    }
    if (keys.a.pressed) {
        player.moving = true
        player.image = player.sprites.runningLeft
        lastDirection = "left"
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, position: {
                        x: boundary.position.x + 5,
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
            if (background.position.x > -5) {
                moving = false
                playerMovables.forEach(playerMovable => {
                    playerMovable.position.x -= 5
                })
                offsetBuffer.x += 5
            } else {
                if (offsetBuffer.x != 0) {
                    playerMovables.forEach(playerMovable => {
                        playerMovable.position.x -= 5
                    })
                    offsetBuffer.x += 5
                } else {
                    movables.forEach(movable => {
                        movable.position.x += 5
                    })
                }
            }
        }
    }
    if (keys.s.pressed) {
        player.moving = true
        lastDirection == "right" ? player.image = player.sprites.runningRight : player.image = player.sprites.runningLeft
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 5,
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
            if (background.position.y < (canvas.height - background.height + 5)) {
                moving = false
                playerMovables.forEach(playerMovable => {
                    playerMovable.position.y += 5
                })
                offsetBuffer.y -= 5
            } else {
                if (offsetBuffer.y != 0) {
                    playerMovables.forEach(playerMovable => {
                        playerMovable.position.y += 5
                    })
                    offsetBuffer.y -= 5
                } else {
                    movables.forEach(movable => {
                        movable.position.y -= 5
                    })
                }
            }
        }
    }
    if (keys.d.pressed) {
        player.moving = true
        player.image = player.sprites.runningRight
        lastDirection = "right"
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, position: {
                        x: boundary.position.x - 5,
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
            if (background.position.x < (canvas.width - background.width + 5)) {
                moving = false
                playerMovables.forEach(playerMovable => {
                    playerMovable.position.x += 5
                })
                offsetBuffer.x -= 5
            } else {
                if (offsetBuffer.x != 0) {
                    playerMovables.forEach(playerMovable => {
                        playerMovable.position.x += 5
                    })
                    offsetBuffer.x -= 5
                } else {
                    movables.forEach(movable => {
                        movable.position.x -= 5
                    })
                }
            }
        }
    }
    if (!player.moving) {
        if (lastDirection == "left") {
            player.image = player.sprites.left
        } else if (lastDirection == "right") {
            player.image = player.sprites.right
        }
    }
    document.getElementById('level').innerHTML = `${level}`;
    document.getElementById('coordinates').innerHTML = `PLAYER: ${player.position.x}, ${player.position.y}`;
    document.getElementById('offsetBuffer').innerHTML = `offsetBUFFER: ${offsetBuffer.x}, ${offsetBuffer.y}`;
    document.getElementById('bgPosition').innerHTML = `BG: ${background.position.x}, ${background.position.y}`;
}

animate()

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            break;
        case 'a':
            keys.a.pressed = true
            break;
        case 's':
            keys.s.pressed = true
            break;
        case 'd':
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
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break;
        case 'a':
            keys.a.pressed = false
            break;
        case 's':
            keys.s.pressed = false
            break;
        case 'd':
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
    }
})
