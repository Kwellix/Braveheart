const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d')
canvas.width = 1400
canvas.height = 740

let background
let collisionsMap = []
let movables = []
let boundaries = []
let foreground
let transitions = []
let offset = {
    x: -56,
    y: -174
}
let offsetBuffer = {
    x: 0,
    y: 0
}

let overlay = {
    opacity: 0
}

let spawn = true
let level = "0_2"
let levels = {
    "0_2": {
        init: () => {
            collisionsMap = []
            boundaries = []
            background = new Sprite({
                position: {
                    x: offset.x,
                    y: offset.y
                },
                imageSrc: "./img/maps/map_0_2(Start).png"
            })
            for (let i = 0; i < collisions_0_2.length; i += 30) {
                collisionsMap.push(collisions_0_2.slice(i, 30 + i))
            }
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
            foreground = new Sprite({
                position: {
                    x: offset.x,
                    y: offset.y
                },
                imageSrc: "./img/maps/foreground_0_2(Start).png"
            })
            transitions = [
                new Sprite({
                    position: {
                        x: 1428,
                        y: 300,
                    },
                    imageSrc: "./img/transition_vertical_right.png",
                    transitTo: "1_2",
                    transitDirection: "Right",
                    offsetBuffer: {
                        x: 0,
                        y: 0
                    },
                    playerPosition: {
                        x: 0,
                        y: 0
                    },
                    bgOffset: {
                        x: 0,
                        y: 0
                    },

                })
            ]
            movables = [background, ...boundaries, foreground, ...transitions]
        }
    },
    "1_2": {
        init: () => {
            collisionsMap = []
            boundaries = []
            console.log("LEVEL 2")
            background = new Sprite({
                position: {
                    x: 0,
                    y: -174
                },
                imageSrc: "./img/maps/map_1_2.png"
            })
            //for (let i = 0; i < collisions_0_2.length; i += 30) {
            //    collisionsMap.push(collisions_0_2.slice(i, 30 + i))
            //}
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
            foreground = new Sprite({
                position: {
                    x: offset.x,
                    y: offset.y
                },
                imageSrc: "./img/maps/foreground_0_2(Start).png"
            })
            transitions = [
                new Sprite({
                    position: {
                        x: 0,
                        y: 300,
                    },
                    imageSrc: "./img/transition_vertical_left.png",
                    transitTo: "0_2",
                    transitDirection: "Left",
                    offsetBuffer: {
                        x: 640,
                        y: 0
                    }
                })
            ]
            movables = [background, ...boundaries, foreground, ...transitions]

        }
    },
}


