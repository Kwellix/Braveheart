const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d')


canvas.width = 1400
canvas.height = 740

const offset = {
    x: -56,
    y: -174
}

const offsetBuffer = {
    x: 0,
    y: 0
}

const collisionsMap = []
for (let i = 0; i < collisions_0_2.length; i += 30) {
    collisionsMap.push(collisions_0_2.slice(i, 30 + i))
}

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

const image = new Image()
image.src = "./img/map_0_2(Start).png"

const foregroundImage = new Image()
foregroundImage.src = "./img/foreground_0_2(Start).png"

const playerShadowImage = new Image()
playerShadowImage.src = "./img/Player/shadow.png"

const PlayerStandingRightImage = new Image()
PlayerStandingRightImage.src = "./img/Player/standing_right.png"
const PlayerStandingLeftImage = new Image()
PlayerStandingLeftImage.src = "./img/Player/standing_left.png"
const PlayerRunningRightImage = new Image()
PlayerRunningRightImage.src = "./img/Player/running_right.png"
const PlayerRunningLeftImage = new Image()
PlayerRunningLeftImage.src = "./img/Player/running_left.png"

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 31,
        y: canvas.height / 2 - 71
    },
    frames: {
        max: 7
    },
    image: PlayerStandingRightImage,
    sprites: {
        left: PlayerStandingLeftImage,
        right: PlayerStandingRightImage,
        runningLeft: PlayerRunningLeftImage,
        runningRight: PlayerRunningRightImage
    }
})

const playerShadow = new Sprite({
    position: {
        x: canvas.width / 2 - 61,
        y: canvas.height / 2 - 27
    },
    image: playerShadowImage,
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
})

const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false }
}

const boundaries = []
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1089) {
            boundaries.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            }))
        }
    })
})

const movables = [background, ...boundaries, foreground]
const playerMovables = [player, playerShadow]

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

let lastDirection = "right"
function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    playerShadow.draw()
    player.draw()
    foreground.draw()

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
                console.log("colliding")
                moving = false
                break
            }
        }
        if (moving) {
            if (background.position.y > 0) {
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
                console.log("colliding")
                moving = false
                break
            }
        }
        if (moving) {
            if (background.position.x > 0) {
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
                console.log("colliding")
                moving = false
                break
            }
        }
        if (moving) {
            if (background.position.y < (canvas.height - background.height)) {
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
                console.log("colliding")
                moving = false
                break
            }
        }
        if (moving) {
            if (background.position.x < (canvas.width - background.width)) {
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
    console.log(offsetBuffer)
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