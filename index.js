const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d')


canvas.width = 1250
canvas.height = 650

const offset = {
    x: -38,
    y: -137
}

const collisionsMap = []
for (let i = 0; i < collisions_0_2.length; i += 30) {
    collisionsMap.push(collisions_0_2.slice(i, 30 + i))
}

class Boundary {
    static height = 44.8
    static width = 44.8
    constructor({ position }) {
        this.position = position
        this.width = 44.8
        this.height = 44.8
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
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

console.log(boundaries)

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

const image = new Image()
image.src = "./img/map_0_2(Start).png"

const PlayerImage = new Image()
PlayerImage.src = "./img/Player/standing_right2.png"

class Sprite {
    constructor({ position, velocity, image, frames = { max: 1 } }) {
        this.position = position
        this.image = image
        this.frames = frames
    }
    draw() {
        c.drawImage(
            this.image,
            //canvas.width / 2 - 67,
            //canvas.height / 2 - 78
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )
    }
}

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 68,
        y: canvas.height / 2 - 76
    },
    image: PlayerImage
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false }
}

const testBoundary = new Boundary({
    position: {
        x: 400,
        y: 400
    }
})

const movables = [background, testBoundary]

function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    //boundaries.forEach(boundary => {
    //    boundary.draw()
    //})
    testBoundary.draw()
    player.draw()

    //if (player.position.x + player.width)

    if (keys.w.pressed) {
        movables.forEach(movable => {
            movable.position.y += 5
        })
    }
    if (keys.a.pressed) {
        movables.forEach(movable => {
            movable.position.x += 5
        })
    }
    if (keys.s.pressed) {
        movables.forEach(movable => {
            movable.position.y -= 5
        })
    }
    if (keys.d.pressed) {
        movables.forEach(movable => {
            movable.position.x -= 5
        })
    }
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
    }
})