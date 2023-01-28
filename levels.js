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
    "0_1": {
        init: ({ bgPosition }) => {
            collisionsMap = []
            boundaries = []
            background = new Sprite({
                position: {
                    x: bgPosition.x,
                    y: bgPosition.y
                },
                imageSrc: "./img/maps/map_0_1.png"
            })
            for (let i = 0; i < collisions_0_1.length; i += 30) {
                collisionsMap.push(collisions_0_1.slice(i, 30 + i))
            }
            collisionsMap.forEach((row, i) => {
                row.forEach((symbol, j) => {
                    if (symbol === 1665) {
                        boundaries.push(new Boundary({
                            position: {
                                x: j * Boundary.width + bgPosition.x,
                                y: i * Boundary.height + bgPosition.y
                            }
                        }))
                    }
                })
            })
            foreground = new Sprite({
                position: {
                    x: bgPosition.x,
                    y: bgPosition.y
                },
                imageSrc: "./img/maps/foreground_0_1.png"
            })
            transitions = [
                new Sprite({
                    position: {
                        x: 0,
                        y: 740,
                    },
                    imageSrc: "./img/transition_horizontal_down.png",
                    transitTo: "0_2",
                    bgPosition: {
                        x: -56,
                        y: -4
                    },
                    offsetBuffer: {
                        x: 0,
                        y: 260
                    },
                    playerPosition: {
                        x: 669,
                        y: 39
                    }
                })
            ]
            movables = [background, ...boundaries, foreground, ...transitions]
        }
    },
    "0_2": {
        init: ({ bgPosition }) => {
            collisionsMap = []
            boundaries = []
            background = new Sprite({
                position: {
                    x: bgPosition.x,
                    y: bgPosition.y
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
                                x: j * Boundary.width + bgPosition.x,
                                y: i * Boundary.height + bgPosition.y
                            }
                        }))
                    }
                })
            })
            foreground = new Sprite({
                position: {
                    x: bgPosition.x,
                    y: bgPosition.y
                },
                imageSrc: "./img/maps/foreground_0_2(Start).png"
            })
            transitions = [
                new Sprite({
                    position: {
                        x: 1428,
                        y: 0,
                    },
                    imageSrc: "./img/transition_vertical_right.png",
                    transitTo: "1_2",
                    bgPosition: {
                        x: 0,
                        y: -174
                    },
                    offsetBuffer: {
                        x: 595,
                        y: 0
                    },
                    playerPosition: {
                        x: 58,
                        y: 299
                    }
                }),
                new Sprite({
                    position: {
                        x: 0,
                        y: 900,
                    },
                    imageSrc: "./img/transition_horizontal_down.png",
                    transitTo: "0_3",
                    bgPosition: {
                        x: -55,
                        y: -56
                    },
                    offsetBuffer: {
                        x: 0,
                        y: 285
                    },
                    playerPosition: {
                        x: 669,
                        y: 14
                    }
                }),
                new Sprite({
                    position: {
                        x: 0,
                        y: -300,
                    },
                    imageSrc: "./img/transition_horizontal_up.png",
                    transitTo: "0_1",
                    bgPosition: {
                        x: -56,
                        y: -334
                    },
                    offsetBuffer: {
                        x: 0,
                        y: -310
                    },
                    playerPosition: {
                        x: 669,
                        y: 609
                    }
                }),
            ]
            movables = [background, ...boundaries, foreground, ...transitions]
        }
    },
    "1_2": {
        init: ({ bgPosition }) => {
            collisionsMap = []
            boundaries = []
            background = new Sprite({
                position: {
                    x: bgPosition.x,
                    y: bgPosition.y
                },
                imageSrc: "./img/maps/map_1_2.png"
            })
            for (let i = 0; i < collisions_1_2.length; i += 30) {
                collisionsMap.push(collisions_1_2.slice(i, 30 + i))
            }
            collisionsMap.forEach((row, i) => {
                row.forEach((symbol, j) => {
                    if (symbol === 1153) {
                        boundaries.push(new Boundary({
                            position: {
                                x: j * Boundary.width + bgPosition.x,
                                y: i * Boundary.height + bgPosition.y
                            }
                        }))
                    }
                })
            })
            foreground = new Sprite({
                position: {
                    x: bgPosition.x,
                    y: bgPosition.y
                },
                imageSrc: "./img/maps/foreground_1_2.png"
            })
            transitions = [
                new Sprite({
                    position: {
                        x: 0,
                        y: 0,
                    },
                    imageSrc: "./img/transition_vertical_left.png",
                    transitTo: "0_2",
                    bgPosition: {
                        x: -136,
                        y: -174
                    },
                    offsetBuffer: {
                        x: -635,
                        y: 0
                    },
                    playerPosition: {
                        x: 1304,
                        y: 299
                    }
                }),
                new Sprite({
                    position: {
                        x: 5,
                        y: 850,
                    },
                    imageSrc: "./img/transition_horizontal_down.png",
                    transitTo: "1_3",
                    bgPosition: {
                        x: -31,
                        y: -4
                    },
                    offsetBuffer: {
                        x: 0,
                        y: 240
                    },
                    playerPosition: {
                        x: 669,
                        y: 59
                    }
                }),
            ]
            movables = [background, ...boundaries, foreground, ...transitions]

        }
    },
    "1_3": {
        init: ({ bgPosition }) => {
            collisionsMap = []
            boundaries = []
            background = new Sprite({
                position: {
                    x: bgPosition.x,
                    y: bgPosition.y
                },
                imageSrc: "./img/maps/map_1_3.png"
            })
            for (let i = 0; i < collisions_1_3.length; i += 30) {
                collisionsMap.push(collisions_1_3.slice(i, 30 + i))
            }
            collisionsMap.forEach((row, i) => {
                row.forEach((symbol, j) => {
                    if (symbol === 1665) {
                        boundaries.push(new Boundary({
                            position: {
                                x: j * Boundary.width + bgPosition.x,
                                y: i * Boundary.height + bgPosition.y
                            }
                        }))
                    }
                })
            })
            foreground = new Sprite({
                position: {
                    x: bgPosition.x,
                    y: bgPosition.y
                },
                imageSrc: "./img/maps/foreground_1_3.png"
            })
            transitions = [
                new Sprite({
                    position: {
                        x: 0,
                        y: -175,
                    },
                    imageSrc: "./img/transition_horizontal_up.png",
                    transitTo: "1_2",
                    bgPosition: {
                        x: 0,
                        y: -335
                    },
                    offsetBuffer: {
                        x: 0,
                        y: -255
                    },
                    playerPosition: {
                        x: 700,
                        y: 550
                    }
                }),
                new Sprite({
                    position: {
                        x: 0,
                        y: 0,
                    },
                    imageSrc: "./img/transition_vertical_left.png",
                    transitTo: "0_3",
                    bgPosition: {
                        x: -135,
                        y: -166
                    },
                    offsetBuffer: {
                        x: -585,
                        y: 0
                    },
                    playerPosition: {
                        x: 1254,
                        y: 299
                    }
                }),
            ]
            movables = [background, ...boundaries, foreground, ...transitions]

        }
    },
    "0_3": {
        init: ({ bgPosition }) => {
            collisionsMap = []
            boundaries = []
            background = new Sprite({
                position: {
                    x: bgPosition.x,
                    y: bgPosition.y
                },
                imageSrc: "./img/maps/map_0_3.png"
            })
            for (let i = 0; i < collisions_0_3.length; i += 30) {
                collisionsMap.push(collisions_0_3.slice(i, 30 + i))
            }
            collisionsMap.forEach((row, i) => {
                row.forEach((symbol, j) => {
                    if (symbol === 1345) {
                        boundaries.push(new Boundary({
                            position: {
                                x: j * Boundary.width + bgPosition.x,
                                y: i * Boundary.height + bgPosition.y
                            }
                        }))
                    }
                })
            })
            foreground = new Sprite({
                position: {
                    x: bgPosition.x,
                    y: bgPosition.y
                },
                imageSrc: "./img/maps/foreground_0_3.png"
            })
            transitions = [
                new Sprite({
                    position: {
                        x: 0,
                        y: -150,
                    },
                    imageSrc: "./img/transition_horizontal_up.png",
                    transitTo: "0_2",
                    bgPosition: {
                        x: -56,
                        y: -334
                    },
                    offsetBuffer: {
                        x: 0,
                        y: -310
                    },
                    playerPosition: {
                        x: 669,
                        y: 609
                    }
                }),
                new Sprite({
                    position: {
                        x: 1450,
                        y: 0,
                    },
                    imageSrc: "./img/transition_vertical_right.png",
                    transitTo: "1_3",
                    bgPosition: {
                        x: -1,
                        y: -164
                    },
                    offsetBuffer: {
                        x: 560,
                        y: 0
                    },
                    playerPosition: {
                        x: 109,
                        y: 299
                    }
                }),
            ]
            movables = [background, ...boundaries, foreground, ...transitions]

        }
    },
}


