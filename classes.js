const PlayerStandingRightImage = new Image()
PlayerStandingRightImage.src = "./img/player/standing_right.png"
const PlayerStandingLeftImage = new Image()
PlayerStandingLeftImage.src = "./img/player/standing_left.png"
const PlayerRunningRightImage = new Image()
PlayerRunningRightImage.src = "./img/player/running_right.png"
const PlayerRunningLeftImage = new Image()
PlayerRunningLeftImage.src = "./img/player/running_left.png"

class Sprite {
    constructor({ position, imageSrc, frames = { max: 1 }, sprites, transitTo, bgPosition, offsetBuffer, playerPosition }) {
        this.position = position
        this.image = new Image()
        this.frames = { ...frames, val: 0, elapsed: 0 }

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.image.src = imageSrc
        this.moving = false
        this.sprites = sprites
        this.transitTo = transitTo
        this.offsetBuffer = offsetBuffer
        this.bgPosition = bgPosition
        this.playerPosition = playerPosition
    }
    draw() {
        c.drawImage(
            this.image,
            //canvas.width / 2 - 67,
            //canvas.height / 2 - 78
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )

        if (this.moving) {
            if (this.frames.max > 1) {
                this.frames.elapsed++
            }

            if (this.frames.elapsed % 5 === 0) {
                if (this.frames.val < this.frames.max - 1) this.frames.val++
                else this.frames.val = 0
            }
        }
    }
}

class Boundary {
    static height = 51.2
    static width = 51.2
    constructor({ position }) {
        this.position = position
        this.width = 51.2
        this.height = 51.2
    }

    draw() {
        c.fillStyle = 'rgba(255,0,0,0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
