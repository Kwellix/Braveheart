const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d')
canvas.width = 1400
canvas.height = 740

let background
let enemies = []
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
            level = "0_1"
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
                }),
                new Sprite({
                    position: {
                        x: 1450,
                        y: -500,
                    },
                    imageSrc: "./img/transition_vertical_right.png",
                    transitTo: "1_1",
                    bgPosition: {
                        x: -1,
                        y: -4
                    },
                    offsetBuffer: {
                        x: 380,
                        y: 125
                    },
                    playerPosition: {
                        x: 289,
                        y: 174
                    }
                }),
            ]
            movables = [background, ...boundaries, foreground, ...transitions]
        }
    },
    "0_2": {
        init: ({ bgPosition }) => {
            level = "0_2"
            collisionsMap = []
            boundaries = []
            enemies = []
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
            enemies.push(
                new Sprite({
                    position: {
                        x: background.image.width / 2,
                        y: background.image.height / 2
                    },
                    frames: {
                        max: 13
                    },
                    imageSrc: "./img/enemies/skeleton.png",
                }),
                new Sprite({
                    position: {
                        x: background.image.width / 2 - 25,
                        y: background.image.height / 2 + 75
                    },
                    imageSrc: "./img/player/shadow.png",
                }),
                new Sprite({
                    position: {
                        x: background.image.width / 2 - 200,
                        y: background.image.height / 2 + 75
                    },
                    imageSrc: "./img/player/shadow.png",
                }),
                new Sprite({
                    position: {
                        x: background.image.width / 2 - 200,
                        y: background.image.height / 2
                    },
                    frames: {
                        max: 4
                    },
                    imageSrc: "./img/enemies/bee.png",
                }),
            )
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
            movables = [background, ...boundaries, foreground, ...transitions, ...enemies]
        }
    },
    "0_3": {
        init: ({ bgPosition }) => {
            level = "0_3"
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
    "0_4": {
        init: ({ bgPosition }) => {
            level = "0_4"
            collisionsMap = []
            boundaries = []
            background = new Sprite({
                position: {
                    x: bgPosition.x,
                    y: bgPosition.y
                },
                imageSrc: "./img/maps/map_0_4.png"
            })
            for (let i = 0; i < collisions_0_4.length; i += 30) {
                collisionsMap.push(collisions_0_4.slice(i, 30 + i))
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
                imageSrc: "./img/maps/foreground_0_4.png"
            })
            transitions = [
                new Sprite({
                    position: {
                        x: 0,
                        y: 850,
                    },
                    imageSrc: "./img/transition_horizontal_down.png",
                    transitTo: "0_5",
                    bgPosition: {
                        x: -136,
                        y: -4
                    },
                    offsetBuffer: {
                        x: -25,
                        y: 265
                    },
                    playerPosition: {
                        x: 694,
                        y: 34
                    }
                }),
            ]
            movables = [background, ...boundaries, foreground, ...transitions]
        }
    },
    "0_5": {
        init: ({ bgPosition }) => {
            level = "0_5"
            collisionsMap = []
            boundaries = []
            background = new Sprite({
                position: {
                    x: bgPosition.x,
                    y: bgPosition.y
                },
                imageSrc: "./img/maps/map_0_5.png"
            })
            for (let i = 0; i < collisions_0_5.length; i += 30) {
                collisionsMap.push(collisions_0_5.slice(i, 30 + i))
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
                imageSrc: "./img/maps/foreground_0_5.png"
            })
            transitions = [
                new Sprite({
                    position: {
                        x: 0,
                        y: -200,
                    },
                    imageSrc: "./img/transition_horizontal_up.png",
                    transitTo: "0_4",
                    bgPosition: {
                        x: -96,
                        y: -334
                    },
                    offsetBuffer: {
                        x: 0,
                        y: -305
                    },
                    playerPosition: {
                        x: 669,
                        y: 604
                    }
                }),
                new Sprite({
                    position: {
                        x: 1500,
                        y: 150,
                    },
                    imageSrc: "./img/transition_vertical_right.png",
                    transitTo: "1_5",
                    bgPosition: {
                        x: -1,
                        y: -174
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
    "1_1": {
        init: ({ bgPosition }) => {
            level = "1_1"
            collisionsMap = []
            boundaries = []
            background = new Sprite({
                position: {
                    x: bgPosition.x,
                    y: bgPosition.y
                },
                imageSrc: "./img/maps/map_1_1.png"
            })
            for (let i = 0; i < collisions_1_1.length; i += 30) {
                collisionsMap.push(collisions_1_1.slice(i, 30 + i))
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
                imageSrc: "./img/maps/foreground_1_1.png"
            })
            transitions = [
                new Sprite({
                    position: {
                        x: 0,
                        y: 0,
                    },
                    imageSrc: "./img/transition_vertical_left.png",
                    transitTo: "0_1",
                    bgPosition: {
                        x: -136,
                        y: -4
                    },
                    offsetBuffer: {
                        x: -635,
                        y: 130
                    },
                    playerPosition: {
                        x: 1304,
                        y: 169
                    }
                }),
                new Sprite({
                    position: {
                        x: 1500,
                        y: 150,
                    },
                    imageSrc: "./img/transition_vertical_right.png",
                    transitTo: "2_1",
                    bgPosition: {
                        x: -1,
                        y: -29
                    },
                    offsetBuffer: {
                        x: 530,
                        y: 0
                    },
                    playerPosition: {
                        x: 139,
                        y: 299
                    }
                }),

            ]
            movables = [background, ...boundaries, foreground, ...transitions]

        }
    },
    "1_2": {
        init: ({ bgPosition }) => {
            level = "1_2"
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
            level = "1_3"
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
    "1_4": {
        init: ({ bgPosition }) => {
            level = "1_4"
            collisionsMap = []
            boundaries = []
            background = new Sprite({
                position: {
                    x: bgPosition.x,
                    y: bgPosition.y
                },
                imageSrc: "./img/maps/map_1_4.png"
            })
            for (let i = 0; i < collisions_1_4.length; i += 30) {
                collisionsMap.push(collisions_1_4.slice(i, 30 + i))
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
                imageSrc: "./img/maps/foreground_1_4.png"
            })
            transitions = [
                new Sprite({
                    position: {
                        x: 1500,
                        y: 150,
                    },
                    imageSrc: "./img/transition_vertical_right.png",
                    transitTo: "2_4",
                    bgPosition: {
                        x: -1,
                        y: -234
                    },
                    offsetBuffer: {
                        x: 610,
                        y: 0
                    },
                    playerPosition: {
                        x: 59,
                        y: 299
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
                new Sprite({
                    position: {
                        x: 0,
                        y: 850,
                    },
                    imageSrc: "./img/transition_horizontal_down.png",
                    transitTo: "1_5",
                    bgPosition: {
                        x: -106,
                        y: -4
                    },
                    offsetBuffer: {
                        x: 0,
                        y: 235
                    },
                    playerPosition: {
                        x: 669,
                        y: 64
                    }
                }),
            ]
            movables = [background, ...boundaries, foreground, ...transitions]

        }
    },
    "1_5": {
        init: ({ bgPosition }) => {
            level = "1_5"
            collisionsMap = []
            boundaries = []
            background = new Sprite({
                position: {
                    x: bgPosition.x,
                    y: bgPosition.y
                },
                imageSrc: "./img/maps/map_1_5.png"
            })
            for (let i = 0; i < collisions_1_5.length; i += 30) {
                collisionsMap.push(collisions_1_5.slice(i, 30 + i))
            }
            collisionsMap.forEach((row, i) => {
                row.forEach((symbol, j) => {
                    if (symbol === 577) {
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
                imageSrc: "./img/maps/foreground_1_5.png"
            })
            transitions = [
                new Sprite({
                    position: {
                        x: 0,
                        y: -150,
                    },
                    imageSrc: "./img/transition_horizontal_up.png",
                    transitTo: "1_4",
                    bgPosition: {
                        x: -106,
                        y: -334
                    },
                    offsetBuffer: {
                        x: 0,
                        y: -280
                    },
                    playerPosition: {
                        x: 669,
                        y: 579
                    }
                }),
                new Sprite({
                    position: {
                        x: 0,
                        y: 850,
                    },
                    imageSrc: "./img/transition_horizontal_down.png",
                    transitTo: "1_6",
                    bgPosition: {
                        x: -1,
                        y: -4
                    },
                    offsetBuffer: {
                        x: 244,
                        y: 235
                    },
                    playerPosition: {
                        x: 314,
                        y: 64
                    }
                }),
                new Sprite({
                    position: {
                        x: 0,
                        y: 0,
                    },
                    imageSrc: "./img/transition_vertical_left.png",
                    transitTo: "0_5",
                    bgPosition: {
                        x: -136,
                        y: -179
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
            ]
            movables = [background, ...boundaries, foreground, ...transitions]

        }
    },
    "1_6": {
        init: ({ bgPosition }) => {
            level = "1_6"
            collisionsMap = []
            boundaries = []
            background = new Sprite({
                position: {
                    x: bgPosition.x,
                    y: bgPosition.y
                },
                imageSrc: "./img/maps/map_1_6.png"
            })
            for (let i = 0; i < collisions_1_6.length; i += 30) {
                collisionsMap.push(collisions_1_6.slice(i, 30 + i))
            }
            collisionsMap.forEach((row, i) => {
                row.forEach((symbol, j) => {
                    if (symbol === 1409) {
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
                imageSrc: "./img/maps/foreground_1_6.png"
            })
            transitions = [
                new Sprite({
                    position: {
                        x: 0,
                        y: -175,
                    },
                    imageSrc: "./img/transition_horizontal_up.png",
                    transitTo: "1_5",
                    bgPosition: {
                        x: -1,
                        y: -334
                    },
                    offsetBuffer: {
                        x: 355,
                        y: -285
                    },
                    playerPosition: {
                        x: 314,
                        y: 584
                    }
                }),
                new Sprite({
                    position: {
                        x: 1250,
                        y: 0,
                    },
                    imageSrc: "./img/transition_vertical_right.png",
                    transitTo: "2_6",
                    bgPosition: {
                        x: -1,
                        y: -219
                    },
                    offsetBuffer: {
                        x: 630,
                        y: 0
                    },
                    playerPosition: {
                        x: 59,
                        y: 295
                    }
                }),

            ]
            movables = [background, ...boundaries, foreground, ...transitions]

        }
    },
    "2_1": {
        init: ({ bgPosition }) => {
            level = "2_1"
            collisionsMap = []
            boundaries = []
            background = new Sprite({
                position: {
                    x: bgPosition.x,
                    y: bgPosition.y
                },
                imageSrc: "./img/maps/map_2_1.png"
            })
            for (let i = 0; i < collisions_2_1.length; i += 30) {
                collisionsMap.push(collisions_2_1.slice(i, 30 + i))
            }
            collisionsMap.forEach((row, i) => {
                row.forEach((symbol, j) => {
                    if (symbol === 577) {
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
                imageSrc: "./img/maps/foreground_2_1.png"
            })
            transitions = [
                new Sprite({
                    position: {
                        x: 0,
                        y: 850,
                    },
                    imageSrc: "./img/transition_horizontal_down.png",
                    transitTo: "2_2",
                    bgPosition: {
                        x: -106,
                        y: -4
                    },
                    offsetBuffer: {
                        x: 0,
                        y: 255
                    },
                    playerPosition: {
                        x: 669,
                        y: 44
                    }
                }),
                new Sprite({
                    position: {
                        x: 0,
                        y: 0,
                    },
                    imageSrc: "./img/transition_vertical_left.png",
                    transitTo: "1_1",
                    bgPosition: {
                        x: -136,
                        y: -9
                    },
                    offsetBuffer: {
                        x: -575,
                        y: 0
                    },
                    playerPosition: {
                        x: 1244,
                        y: 299
                    }
                }),
            ]
            movables = [background, ...boundaries, foreground, ...transitions]

        }
    },
    "2_2": {
        init: ({ bgPosition }) => {
            level = "2_2"
            collisionsMap = []
            boundaries = []
            background = new Sprite({
                position: {
                    x: bgPosition.x,
                    y: bgPosition.y
                },
                imageSrc: "./img/maps/map_2_2.png"
            })
            for (let i = 0; i < collisions_2_2.length; i += 30) {
                collisionsMap.push(collisions_2_2.slice(i, 30 + i))
            }
            collisionsMap.forEach((row, i) => {
                row.forEach((symbol, j) => {
                    if (symbol === 897) {
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
                imageSrc: "./img/maps/foreground_2_2.png"
            })
            transitions = [
                new Sprite({
                    position: {
                        x: 0,
                        y: -375,
                    },
                    imageSrc: "./img/transition_horizontal_up.png",
                    transitTo: "2_1",
                    bgPosition: {
                        x: -106,
                        y: -334
                    },
                    offsetBuffer: {
                        x: 0,
                        y: -305
                    },
                    playerPosition: {
                        x: 669,
                        y: 604
                    }
                }),
                new Sprite({
                    position: {
                        x: 0,
                        y: 700,
                    },
                    imageSrc: "./img/transition_horizontal_down.png",
                    transitTo: "2_3",
                    bgPosition: {
                        x: -96,
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
    "2_3": {
        init: ({ bgPosition }) => {
            level = "2_3"
            collisionsMap = []
            boundaries = []
            background = new Sprite({
                position: {
                    x: bgPosition.x,
                    y: bgPosition.y
                },
                imageSrc: "./img/maps/map_2_3.png"
            })
            for (let i = 0; i < collisions_2_3.length; i += 30) {
                collisionsMap.push(collisions_2_3.slice(i, 30 + i))
            }
            collisionsMap.forEach((row, i) => {
                row.forEach((symbol, j) => {
                    if (symbol === 833) {
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
                imageSrc: "./img/maps/foreground_2_3.png"
            })
            transitions = [
                new Sprite({
                    position: {
                        x: 0,
                        y: -275,
                    },
                    imageSrc: "./img/transition_horizontal_up.png",
                    transitTo: "2_2",
                    bgPosition: {
                        x: -106,
                        y: -334
                    },
                    offsetBuffer: {
                        x: 0,
                        y: -50
                    },
                    playerPosition: {
                        x: 669,
                        y: 349
                    }
                }),
                new Sprite({
                    position: {
                        x: 0,
                        y: 900,
                    },
                    imageSrc: "./img/transition_horizontal_down.png",
                    transitTo: "2_4",
                    bgPosition: {
                        x: -106,
                        y: -4
                    },
                    offsetBuffer: {
                        x: 0,
                        y: 50
                    },
                    playerPosition: {
                        x: 669,
                        y: 249
                    }
                }),
                new Sprite({
                    position: {
                        x: 0,
                        y: -200,
                    },
                    imageSrc: "./img/transition_vertical_left.png",
                    transitTo: "1_3",
                    bgPosition: {
                        x: -136,
                        y: -164
                    },
                    offsetBuffer: {
                        x: -640,
                        y: 0
                    },
                    playerPosition: {
                        x: 1304,
                        y: 299
                    }
                }),
            ]
            movables = [background, ...boundaries, foreground, ...transitions]

        }
    },
    "2_4": {
        init: ({ bgPosition }) => {
            level = "2_4"
            collisionsMap = []
            boundaries = []
            background = new Sprite({
                position: {
                    x: bgPosition.x,
                    y: bgPosition.y
                },
                imageSrc: "./img/maps/map_2_4.png"
            })
            for (let i = 0; i < collisions_2_4.length; i += 30) {
                collisionsMap.push(collisions_2_4.slice(i, 30 + i))
            }
            collisionsMap.forEach((row, i) => {
                row.forEach((symbol, j) => {
                    if (symbol === 1409) {
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
                imageSrc: "./img/maps/foreground_2_4.png"
            })
            transitions = [
                new Sprite({
                    position: {
                        x: 0,
                        y: -100,
                    },
                    imageSrc: "./img/transition_horizontal_up.png",
                    transitTo: "2_3",
                    bgPosition: {
                        x: -106,
                        y: -334
                    },
                    offsetBuffer: {
                        x: 0,
                        y: -250
                    },
                    playerPosition: {
                        x: 669,
                        y: 504
                    }
                }),
                new Sprite({
                    position: {
                        x: 0,
                        y: 850,
                    },
                    imageSrc: "./img/transition_horizontal_down.png",
                    transitTo: "2_5",
                    bgPosition: {
                        x: -106,
                        y: -4
                    },
                    offsetBuffer: {
                        x: 0,
                        y: 265
                    },
                    playerPosition: {
                        x: 669,
                        y: 34
                    }
                }),
                new Sprite({
                    position: {
                        x: -60,
                        y: 0,
                    },
                    imageSrc: "./img/transition_vertical_left.png",
                    transitTo: "1_4",
                    bgPosition: {
                        x: -136,
                        y: -229
                    },
                    offsetBuffer: {
                        x: -640,
                        y: 0
                    },
                    playerPosition: {
                        x: 1304,
                        y: 299
                    }
                }),
            ]
            movables = [background, ...boundaries, foreground, ...transitions]

        }
    },
    "2_5": {
        init: ({ bgPosition }) => {
            level = "2_5"
            collisionsMap = []
            boundaries = []
            background = new Sprite({
                position: {
                    x: bgPosition.x,
                    y: bgPosition.y
                },
                imageSrc: "./img/maps/map_2_5.png"
            })
            for (let i = 0; i < collisions_2_5.length; i += 30) {
                collisionsMap.push(collisions_2_5.slice(i, 30 + i))
            }
            collisionsMap.forEach((row, i) => {
                row.forEach((symbol, j) => {
                    if (symbol === 1409) {
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
                imageSrc: "./img/maps/foreground_2_5.png"
            })
            transitions = [
                new Sprite({
                    position: {
                        x: 0,
                        y: -200,
                    },
                    imageSrc: "./img/transition_horizontal_up.png",
                    transitTo: "2_4",
                    bgPosition: {
                        x: -106,
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
                        x: 0,
                        y: 850,
                    },
                    imageSrc: "./img/transition_horizontal_down.png",
                    transitTo: "2_6",
                    bgPosition: {
                        x: -106,
                        y: -4
                    },
                    offsetBuffer: {
                        x: 0,
                        y: 225
                    },
                    playerPosition: {
                        x: 669,
                        y: 64
                    }
                }),
            ]
            movables = [background, ...boundaries, foreground, ...transitions]

        }
    },
    "2_6": {
        init: ({ bgPosition }) => {
            level = "2_6"
            collisionsMap = []
            boundaries = []
            background = new Sprite({
                position: {
                    x: bgPosition.x,
                    y: bgPosition.y
                },
                imageSrc: "./img/maps/map_2_6.png"
            })
            for (let i = 0; i < collisions_2_6.length; i += 30) {
                collisionsMap.push(collisions_2_6.slice(i, 30 + i))
            }
            collisionsMap.forEach((row, i) => {
                row.forEach((symbol, j) => {
                    if (symbol === 833) {
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
                imageSrc: "./img/maps/foreground_2_6.png"
            })
            transitions = [
                new Sprite({
                    position: {
                        x: 0,
                        y: -100,
                    },
                    imageSrc: "./img/transition_horizontal_up.png",
                    transitTo: "2_5",
                    bgPosition: {
                        x: -106,
                        y: -334
                    },
                    offsetBuffer: {
                        x: 0,
                        y: -95
                    },
                    playerPosition: {
                        x: 669,
                        y: 384
                    }
                }),
                new Sprite({
                    position: {
                        x: -60,
                        y: 0,
                    },
                    imageSrc: "./img/transition_vertical_left.png",
                    transitTo: "1_6",
                    bgPosition: {
                        x: -136,
                        y: -184
                    },
                    offsetBuffer: {
                        x: -440,
                        y: 0
                    },
                    playerPosition: {
                        x: 1109,
                        y: 299
                    }
                }),
            ]
            movables = [background, ...boundaries, foreground, ...transitions]

        }
    },

}


