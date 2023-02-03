const PlayerStandingRightImage = new Image()
PlayerStandingRightImage.src = "./img/player/standing_right.png"
const PlayerStandingLeftImage = new Image()
PlayerStandingLeftImage.src = "./img/player/standing_left.png"
const PlayerRunningRightImage = new Image()
PlayerRunningRightImage.src = "./img/player/running_right.png"
const PlayerRunningLeftImage = new Image()
PlayerRunningLeftImage.src = "./img/player/running_left.png"
const PlayerDeadLeftImage = new Image()
PlayerDeadLeftImage.src = "./img/player/deadLeft.png"
const PlayerDeadRightImage = new Image()
PlayerDeadRightImage.src = "./img/player/deadRight.png"
const beeLeft = new Image()
beeLeft.src = "./img/enemies/bee.png"
const beeRight = new Image()
beeRight.src = "./img/enemies/beeRight.png"
const skeletonLeft = new Image()
skeletonLeft.src = "./img/enemies/skeleton.png"
const skeletonRight = new Image()
skeletonRight.src = "./img/enemies/skeletonRight.png"
const shadow = new Image()
shadow.src = "./img/enemies/shadow.png"


class Sprite {
    constructor({ position, imageSrc, frames = { max: 1 }, sprites, transitTo, bgPosition, offsetBuffer, playerPosition, spriteType, enemiesOffsetData, steps, movingDirection, shadow = false, enemyType, dead = false }) {
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
        this.spriteType = spriteType
        this.enemiesOffsetData = enemiesOffsetData
        this.movingDirection = movingDirection
        this.stepsAmount = steps
        this.stepsCount = 0
        this.moveForward = true
        this.shadow = shadow
        this.enemyType = enemyType
        this.dead = dead
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

        if (this.shadow) {
            if (this.enemyType == "bee") {
                c.drawImage(
                    shadow,
                    this.position.x + 17,
                    this.position.y + 70,
                )
            }
            if (this.enemyType == "skeleton") {
                c.drawImage(
                    shadow,
                    this.position.x + 3,
                    this.position.y + 82,
                )
            }
        }

        if (this.moving) {
            if (this.frames.max > 1) {
                this.frames.elapsed++
            }

            if (this.frames.elapsed % 5 === 0) {
                if (this.frames.val < this.frames.max - 1) this.frames.val++
                else this.frames.val = 0
            }
        }

        if (this.spriteType == "enemy") {
            if (this.moveForward) {
                if (this.stepsCount <= this.stepsAmount) {
                    if (this.movingDirection == "right") {
                        this.position.x += movingSpeed
                        this.image = this.sprites.right
                    }
                    if (this.movingDirection == "left") {
                        this.position.x -= movingSpeed
                        this.image = this.sprites.left
                    }
                    if (this.movingDirection == "up") this.position.y -= movingSpeed
                    if (this.movingDirection == "down") this.position.y += movingSpeed
                    this.stepsCount++
                }
                if (this.stepsCount == this.stepsAmount) {
                    this.moveForward = false
                    this.stepsCount = 0
                }
            } else {
                if (this.stepsCount <= this.stepsAmount) {
                    if (this.movingDirection == "right") {
                        this.position.x -= movingSpeed
                        this.image = this.sprites.left
                    }
                    if (this.movingDirection == "left") {
                        this.position.x += movingSpeed
                        this.image = this.sprites.right
                    }
                    if (this.movingDirection == "up") this.position.y += movingSpeed
                    if (this.movingDirection == "down") this.position.y -= movingSpeed
                    this.stepsCount++
                }
                if (this.stepsCount == this.stepsAmount) {
                    this.moveForward = true
                    this.stepsCount = 0
                }
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

class Hitbox {
    constructor({ position, steps, movingDirection }) {
        //bee - x+28 y+28  
        //skeleton - x+10 y+60
        this.position = position
        this.width = 45
        this.height = 35
        this.movingDirection = movingDirection
        this.stepsAmount = steps
        this.stepsCount = 0
        this.moveForward = true
        this.moveForward = true
    }

    draw() {
        c.fillStyle = 'rgba(255,0,0,0.5)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        if (this.moveForward) {
            if (this.stepsCount <= this.stepsAmount) {
                if (this.movingDirection == "right") {
                    this.position.x += movingSpeed
                }
                if (this.movingDirection == "left") {
                    this.position.x -= movingSpeed

                }
                if (this.movingDirection == "up") this.position.y -= movingSpeed
                if (this.movingDirection == "down") this.position.y += movingSpeed
                this.stepsCount++
            }
            if (this.stepsCount == this.stepsAmount) {
                this.moveForward = false
                this.stepsCount = 0
            }
        } else {
            if (this.stepsCount <= this.stepsAmount) {
                if (this.movingDirection == "right") {
                    this.position.x -= movingSpeed
                }
                if (this.movingDirection == "left") {
                    this.position.x += movingSpeed
                }
                if (this.movingDirection == "up") this.position.y += movingSpeed
                if (this.movingDirection == "down") this.position.y -= movingSpeed
                this.stepsCount++
            }
            if (this.stepsCount == this.stepsAmount) {
                this.moveForward = true
                this.stepsCount = 0
            }
        }

    }
}
