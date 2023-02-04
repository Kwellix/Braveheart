const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d')
canvas.width = 1400
canvas.height = 740

let background
let enemies = []
let collisionsMap = []
let movables = []
let boundaries = []
let enemyHitboxes = []
let foreground
let transitions = []
let offsetBuffer = {
    x: 0,
    y: 0
}

let overlay = {
    opacity: 0
}

let movingSpeed = 2
let calcSteps = (amount) => {
    return parseInt(amount / movingSpeed)
}

let level = "0_2"
let levels = {
    "0_1": {
        init: ({ bgPosition, enemiesOffset }) => {
            movingSpeed = 3
            level = "0_1"
            collisionsMap = []
            boundaries = []
            enemies = []
            enemyHitboxes = []
            if (showDialogsData[6]) {
                dialogWindows[6].isShown = true
            }
            if (showDialogsData[2]) {
                dialogWindows[2].isShown = true
            }
            dialogWindows[0].isShown = true
            background = new Sprite({
                position: {
                    x: bgPosition.x,
                    y: bgPosition.y
                },
                imageSrc: "./img/maps/map_0_1.png"
            })
            if (!keyFound) showGates = true
            let collisionsSet
            keyFound ? collisionsSet = collisions_0_1_unlocked : collisionsSet = collisions_0_1_locked
            for (let i = 0; i < collisionsSet.length; i += 30) {
                collisionsMap.push(collisionsSet.slice(i, 30 + i))
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
                    },
                    enemiesOffsetData: {
                        x: 0,
                        y: 170
                    },
                    enemiesOffsetData: {
                        x: 0,
                        y: 0
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
                    },
                    enemiesOffsetData: {
                        x: 50,
                        y: 170
                    }
                }),
            ]
            enemies.push(
                new Sprite({
                    position: {
                        x: 900 + enemiesOffset.x,
                        y: -100 + enemiesOffset.y
                    },
                    frames: {
                        max: 4
                    },
                    imageSrc: "./img/enemies/bee.png",
                    sprites: {
                        left: beeLeft,
                        right: beeRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(240),
                    movingDirection: "down",
                    shadow: true,
                    enemyType: "bee"
                }),
                new Sprite({
                    position: {
                        x: 1250 + enemiesOffset.x,
                        y: 130 + enemiesOffset.y
                    },
                    frames: {
                        max: 4
                    },
                    imageSrc: "./img/enemies/bee.png",
                    sprites: {
                        left: beeLeft,
                        right: beeRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(240),
                    movingDirection: "up",
                    shadow: true,
                    enemyType: "bee"
                }),
            )
            enemyHitboxes.push(
                new Hitbox({
                    position: {
                        x: 928 + enemiesOffset.x,
                        y: -72 + enemiesOffset.y
                    },
                    steps: calcSteps(240),
                    movingDirection: "down",
                }),
                new Hitbox({
                    position: {
                        x: 1278 + enemiesOffset.x,
                        y: 158 + enemiesOffset.y
                    },
                    steps: calcSteps(240),
                    movingDirection: "up",
                }),
            )
            movables = [background, ...boundaries, foreground, ...transitions, ...enemies, ...enemyHitboxes, gates]
        }
    },
    "0_2": {
        init: ({ bgPosition, enemiesOffset }) => {
            movingSpeed = 2
            level = "0_2"
            collisionsMap = []
            boundaries = []
            enemies = []
            enemyHitboxes = []
            showGates = false
            showKey = false
            if (!showDialogsData[0]) {
                dialogWindows[0].show = true
                showDialogsData[0] = true
            }
            if (showDialogsData[1]) {
                if (!showDialogsData[2]) {
                    dialogWindows[1].isShown = true
                    dialogWindows[2].show = true
                    showDialogsData[2] = true
                }
            }
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
                    },
                    enemiesOffsetData: {
                        x: 50,
                        y: 0
                    },
                    previousDialog: 0
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
                    },
                    enemiesOffsetData: {
                        x: 0,
                        y: 110
                    },
                    previousDialog: 0
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
                    },
                    enemiesOffsetData: {
                        x: 0,
                        y: -160
                    }
                }),
            ]
            movables = [background, ...boundaries, foreground, ...transitions, ...enemies]
        }
    },
    "0_3": {
        init: ({ bgPosition, enemiesOffset }) => {
            movingSpeed = 3
            level = "0_3"
            collisionsMap = []
            boundaries = []
            enemies = []
            enemyHitboxes = []
            showKey = false
            if (showDialogsData[4]) {
                dialogWindows[4].isShown = true
            }
            if (showDialogsData[2]) {
                dialogWindows[2].isShown = true
            }
            dialogWindows[0].isShown = true
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
                    },
                    enemiesOffsetData: {
                        x: 0,
                        y: 0
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
                    },
                    enemiesOffsetData: {
                        x: 50,
                        y: 0
                    }
                }),
            ]
            enemies.push(
                new Sprite({
                    position: {
                        x: 740 + enemiesOffset.x,
                        y: 600 + enemiesOffset.y
                    },
                    frames: {
                        max: 13
                    },
                    imageSrc: "./img/enemies/skeleton.png",
                    sprites: {
                        left: skeletonLeft,
                        right: skeletonRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(630),
                    movingDirection: "left",
                    shadow: true,
                    enemyType: "skeleton"
                }),
                new Sprite({
                    position: {
                        x: 0 + enemiesOffset.x,
                        y: 220 + enemiesOffset.y
                    },
                    frames: {
                        max: 4
                    },
                    imageSrc: "./img/enemies/bee.png",
                    sprites: {
                        left: beeLeft,
                        right: beeRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(228),
                    movingDirection: "right",
                    shadow: true,
                    enemyType: "bee"
                }),
                new Sprite({
                    position: {
                        x: 170 + enemiesOffset.x,
                        y: 450 + enemiesOffset.y
                    },
                    frames: {
                        max: 4
                    },
                    imageSrc: "./img/enemies/bee.png",
                    sprites: {
                        left: beeLeft,
                        right: beeRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(228),
                    movingDirection: "left",
                    shadow: true,
                    enemyType: "bee"
                }),
            )
            enemyHitboxes.push(
                new Hitbox({
                    position: {
                        x: 28 + enemiesOffset.x,
                        y: 248 + enemiesOffset.y
                    },
                    steps: calcSteps(228),
                    movingDirection: "right",
                }),
                new Hitbox({
                    position: {
                        x: 198 + enemiesOffset.x,
                        y: 478 + enemiesOffset.y
                    },
                    steps: calcSteps(228),
                    movingDirection: "left",
                }),
                new Hitbox({
                    position: {
                        x: 750 + enemiesOffset.x,
                        y: 660 + enemiesOffset.y
                    },
                    steps: calcSteps(630),
                    movingDirection: "left",
                }),
            )
            movables = [background, ...boundaries, foreground, ...transitions, ...enemies, ...enemyHitboxes]

        }
    },
    "0_4": {
        init: ({ bgPosition, enemiesOffset }) => {
            movingSpeed = 2
            level = "0_4"
            collisionsMap = []
            boundaries = []
            enemies = []
            enemyHitboxes = []
            showWinPortal = true
            if (showDialogsData[3]) {
                dialogWindows[3].isShown = true
            }
            if (!showDialogsData[7]) {
                showDialogsData[7] = true
                dialogWindows[7].show = true
            }
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
                    },
                    enemiesOffsetData: {
                        x: -80,
                        y: 170
                    }
                }),
            ]
            movables = [background, ...boundaries, foreground, ...transitions, ...enemies, ...enemyHitboxes, winPortal]
        }
    },
    "0_5": {
        init: ({ bgPosition, enemiesOffset }) => {
            movingSpeed = 2
            level = "0_5"
            collisionsMap = []
            boundaries = []
            enemies = []
            enemyHitboxes = []
            showWinPortal = false
            if (showDialogsData[7]) {
                dialogWindows[7].isShown = true
            }
            if (!showDialogsData[3]) {
                dialogWindows[3].show = true
                showDialogsData[3] = true
            }
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
                        x: 227 + enemiesOffset.x,
                        y: 324 + enemiesOffset.y,
                    },
                    imageSrc: "./img/portal_red.png",
                    transitTo: "1_3",
                    bgPosition: {
                        x: -6,
                        y: -334
                    },
                    offsetBuffer: {
                        x: 0,
                        y: -145
                    },
                    playerPosition: {
                        x: 669,
                        y: 444
                    },
                    enemiesOffsetData: {
                        x: 50,
                        y: -160
                    },
                    isPortal: true
                }),
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
                    },
                    enemiesOffsetData: {
                        x: 0,
                        y: 0
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
                    },
                    enemiesOffsetData: {
                        x: 55,
                        y: 0
                    }
                }),
            ]
            movables = [background, ...boundaries, foreground, ...transitions, ...enemies]
        }
    },
    "1_1": {
        init: ({ bgPosition, enemiesOffset }) => {
            movingSpeed = 3
            level = "1_1"
            collisionsMap = []
            boundaries = []
            enemies = []
            enemyHitboxes = []
            showGates = false
            if (showDialogsData[5]) {
                dialogWindows[5].isShown = true
            }
            if (showDialogsData[5]) {
                if (!showDialogsData[6]) {
                    dialogWindows[5].isShown = true
                    dialogWindows[6].show = true
                    showDialogsData[6] = true
                }
            }
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
                    },
                    enemiesOffsetData: {
                        x: -75,
                        y: 175
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
                    },
                    enemiesOffsetData: {
                        x: 65,
                        y: 135
                    }
                }),
            ]
            enemies.push(
                new Sprite({
                    position: {
                        x: 1130 + enemiesOffset.x,
                        y: 390 + enemiesOffset.y
                    },
                    frames: {
                        max: 13
                    },
                    imageSrc: "./img/enemies/skeleton.png",
                    sprites: {
                        left: skeletonLeft,
                        right: skeletonRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(900),
                    movingDirection: "left",
                    shadow: true,
                    enemyType: "skeleton"
                }),
                new Sprite({
                    position: {
                        x: 230 + enemiesOffset.x,
                        y: 450 + enemiesOffset.y
                    },
                    frames: {
                        max: 13
                    },
                    imageSrc: "./img/enemies/skeleton.png",
                    sprites: {
                        left: skeletonLeft,
                        right: skeletonRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(900),
                    movingDirection: "right",
                    shadow: true,
                    enemyType: "skeleton"
                }),
                new Sprite({
                    position: {
                        x: 1160 + enemiesOffset.x,
                        y: 430 + enemiesOffset.y
                    },
                    frames: {
                        max: 13
                    },
                    imageSrc: "./img/enemies/skeleton.png",
                    sprites: {
                        left: skeletonLeft,
                        right: skeletonRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(360),
                    movingDirection: "up",
                    shadow: true,
                    enemyType: "skeleton"
                }),
            )
            enemyHitboxes.push(
                new Hitbox({
                    position: {
                        x: 1140 + enemiesOffset.x,
                        y: 450 + enemiesOffset.y
                    },
                    steps: calcSteps(900),
                    movingDirection: "left",
                }),
                new Hitbox({
                    position: {
                        x: 240 + enemiesOffset.x,
                        y: 510 + enemiesOffset.y
                    },
                    steps: calcSteps(900),
                    movingDirection: "right",
                }),
                new Hitbox({
                    position: {
                        x: 1170 + enemiesOffset.x,
                        y: 490 + enemiesOffset.y
                    },
                    steps: calcSteps(360),
                    movingDirection: "up",
                }),
            )
            movables = [background, ...boundaries, foreground, ...transitions, ...enemies, ...enemyHitboxes]

        }
    },
    "1_2": {
        init: ({ bgPosition, enemiesOffset }) => {
            movingSpeed = 4
            level = "1_2"
            collisionsMap = []
            boundaries = []
            enemies = []
            enemyHitboxes = []
            showKey = false
            if (showDialogsData[4]) {
                dialogWindows[4].isShown = true
            }
            if (showDialogsData[2]) {
                dialogWindows[2].isShown = true
            }
            dialogWindows[0].isShown = true
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
                    },
                    enemiesOffsetData: {
                        x: 0,
                        y: 0
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
                    },
                    enemiesOffsetData: {
                        x: 20,
                        y: 170
                    }
                }),
            ]
            enemies.push(
                new Sprite({
                    position: {
                        x: 250 + enemiesOffset.x,
                        y: 245 + enemiesOffset.y
                    },
                    frames: {
                        max: 4
                    },
                    imageSrc: "./img/enemies/bee.png",
                    sprites: {
                        left: beeLeft,
                        right: beeRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(1125),
                    movingDirection: "right",
                    shadow: true,
                    enemyType: "bee"
                }),
                new Sprite({
                    position: {
                        x: 715 + enemiesOffset.x,
                        y: 270 + enemiesOffset.y
                    },
                    frames: {
                        max: 4
                    },
                    imageSrc: "./img/enemies/bee.png",
                    sprites: {
                        left: beeLeft,
                        right: beeRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(500),
                    movingDirection: "up",
                    shadow: true,
                    enemyType: "bee"
                }),
                new Sprite({
                    position: {
                        x: 1400 + enemiesOffset.x,
                        y: 450 + enemiesOffset.y
                    },
                    frames: {
                        max: 4
                    },
                    imageSrc: "./img/enemies/bee.png",
                    sprites: {
                        left: beeLeft,
                        right: beeRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(1125),
                    movingDirection: "left",
                    shadow: true,
                    enemyType: "bee"
                }),
            )
            enemyHitboxes.push(
                new Hitbox({
                    position: {
                        x: 278 + enemiesOffset.x,
                        y: 273 + enemiesOffset.y
                    },
                    steps: calcSteps(1125),
                    movingDirection: "right",
                }),
                new Hitbox({
                    position: {
                        x: 743 + enemiesOffset.x,
                        y: 298 + enemiesOffset.y
                    },
                    steps: calcSteps(500),
                    movingDirection: "up",
                }),
                new Hitbox({
                    position: {
                        x: 1428 + enemiesOffset.x,
                        y: 478 + enemiesOffset.y
                    },
                    steps: calcSteps(1125),
                    movingDirection: "left",
                }),
            )
            movables = [background, ...boundaries, foreground, ...transitions, ...enemies, ...enemyHitboxes]

        }
    },
    "1_3": {
        init: ({ bgPosition, enemiesOffset }) => {
            movingSpeed = 3
            level = "1_3"
            collisionsMap = []
            boundaries = []
            enemies = []
            enemyHitboxes = []
            if (!keyFound) showKey = true
            if (showDialogsData[3]) {
                dialogWindows[3].isShown = true
            }
            if (showDialogsData[3]) {
                if (!showDialogsData[4]) {
                    dialogWindows[3].isShown = true
                    dialogWindows[4].show = true
                    showDialogsData[4] = true
                }
            }
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
                    },
                    enemiesOffsetData: {
                        x: 55,
                        y: -160
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
                    },
                    enemiesOffsetData: {
                        x: -80,
                        y: 0
                    }
                }),
            ]
            enemies.push(
                new Sprite({
                    position: {
                        x: 630 + enemiesOffset.x,
                        y: 375 + enemiesOffset.y
                    },
                    frames: {
                        max: 13
                    },
                    imageSrc: "./img/enemies/skeleton.png",
                    sprites: {
                        left: skeletonLeft,
                        right: skeletonRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(300),
                    movingDirection: "right",
                    shadow: true,
                    enemyType: "skeleton"
                }),
                new Sprite({
                    position: {
                        x: 290 + enemiesOffset.x,
                        y: 375 + enemiesOffset.y
                    },
                    frames: {
                        max: 13
                    },
                    imageSrc: "./img/enemies/skeleton.png",
                    sprites: {
                        left: skeletonLeft,
                        right: skeletonRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(300),
                    movingDirection: "right",
                    shadow: true,
                    enemyType: "skeleton"
                }),
                new Sprite({
                    position: {
                        x: 890 + enemiesOffset.x,
                        y: 410 + enemiesOffset.y
                    },
                    frames: {
                        max: 4
                    },
                    imageSrc: "./img/enemies/bee.png",
                    sprites: {
                        left: beeLeft,
                        right: beeRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(350),
                    movingDirection: "down",
                    shadow: true,
                    enemyType: "bee"
                }),
                new Sprite({
                    position: {
                        x: 280 + enemiesOffset.x,
                        y: 775 + enemiesOffset.y
                    },
                    frames: {
                        max: 4
                    },
                    imageSrc: "./img/enemies/bee.png",
                    sprites: {
                        left: beeLeft,
                        right: beeRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(350),
                    movingDirection: "up",
                    shadow: true,
                    enemyType: "bee"
                }),
                new Sprite({
                    position: {
                        x: 450 + enemiesOffset.x,
                        y: 390 + enemiesOffset.y
                    },
                    frames: {
                        max: 4
                    },
                    imageSrc: "./img/enemies/bee.png",
                    sprites: {
                        left: beeLeft,
                        right: beeRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(300),
                    movingDirection: "right",
                    shadow: true,
                    enemyType: "bee"
                }),
            )
            enemyHitboxes.push(
                new Hitbox({
                    position: {
                        x: 640 + enemiesOffset.x,
                        y: 435 + enemiesOffset.y
                    },
                    steps: calcSteps(300),
                    movingDirection: "right",
                }),
                new Hitbox({
                    position: {
                        x: 300 + enemiesOffset.x,
                        y: 435 + enemiesOffset.y
                    },
                    steps: calcSteps(300),
                    movingDirection: "right",
                }),
                new Hitbox({
                    position: {
                        x: 918 + enemiesOffset.x,
                        y: 438 + enemiesOffset.y
                    },
                    steps: calcSteps(350),
                    movingDirection: "down",
                }),
                new Hitbox({
                    position: {
                        x: 308 + enemiesOffset.x,
                        y: 805 + enemiesOffset.y
                    },
                    steps: calcSteps(350),
                    movingDirection: "up",
                }),
                new Hitbox({
                    position: {
                        x: 478 + enemiesOffset.x,
                        y: 418 + enemiesOffset.y
                    },
                    steps: calcSteps(300),
                    movingDirection: "right",
                }),
            )
            movables = [background, ...boundaries, foreground, ...transitions, ...enemies, ...enemyHitboxes, key]

        }
    },
    "1_4": {
        init: ({ bgPosition, enemiesOffset }) => {
            movingSpeed = 2
            level = "1_4"
            collisionsMap = []
            boundaries = []
            enemies = []
            enemyHitboxes = []
            if (!showDialogsData[5]) {
                dialogWindows[5].show = true
                showDialogsData[5] = true
            }
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
                        x: 226 + enemiesOffset.x,
                        y: 119 + enemiesOffset.y,
                    },
                    imageSrc: "./img/portal_blue.png",
                    transitTo: "1_1",
                    bgPosition: {
                        x: -106,
                        y: -4
                    },
                    offsetBuffer: {
                        x: 0,
                        y: 185
                    },
                    playerPosition: {
                        x: 669,
                        y: 114
                    },
                    enemiesOffsetData: {
                        x: -50,
                        y: 170
                    },
                    isPortal: true
                }),
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
                    },
                    enemiesOffsetData: {
                        x: 60,
                        y: -70
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
                    },
                    enemiesOffsetData: {
                        x: 0,
                        y: 0
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
                    },
                    enemiesOffsetData: {
                        x: -50,
                        y: 170
                    }
                }),
            ]
            movables = [background, ...boundaries, foreground, ...transitions, ...enemies]

        }
    },
    "1_5": {
        init: ({ bgPosition, enemiesOffset }) => {
            movingSpeed = 4
            level = "1_5"
            collisionsMap = []
            boundaries = []
            enemies = []
            enemyHitboxes = []
            if (showDialogsData[5]) {
                dialogWindows[5].isShown = true
            }
            if (showDialogsData[3]) {
                dialogWindows[3].isShown = true
            }
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
                    },
                    enemiesOffsetData: {
                        x: -49,
                        y: -160
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
                    },
                    enemiesOffsetData: {
                        x: 50,
                        y: 170
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
                    },
                    enemiesOffsetData: {
                        x: -80,
                        y: -5
                    }
                }),
            ]
            enemies.push(
                new Sprite({
                    position: {
                        x: 1200 + enemiesOffset.x,
                        y: 75 + enemiesOffset.y
                    },
                    frames: {
                        max: 13
                    },
                    imageSrc: "./img/enemies/skeleton.png",
                    sprites: {
                        left: skeletonLeft,
                        right: skeletonRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(330),
                    movingDirection: "down",
                    shadow: true,
                    enemyType: "skeleton"
                }),
                new Sprite({
                    position: {
                        x: 1125 + enemiesOffset.x,
                        y: 400 + enemiesOffset.y
                    },
                    frames: {
                        max: 13
                    },
                    imageSrc: "./img/enemies/skeleton.png",
                    sprites: {
                        left: skeletonLeft,
                        right: skeletonRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(330),
                    movingDirection: "up",
                    shadow: true,
                    enemyType: "skeleton"
                }),
            )
            enemyHitboxes.push(
                new Hitbox({
                    position: {
                        x: 1210 + enemiesOffset.x,
                        y: 135 + enemiesOffset.y
                    },
                    steps: calcSteps(330),
                    movingDirection: "down",
                }),
                new Hitbox({
                    position: {
                        x: 1135 + enemiesOffset.x,
                        y: 460 + enemiesOffset.y
                    },
                    steps: calcSteps(330),
                    movingDirection: "up",
                }),
            )
            movables = [background, ...boundaries, foreground, ...transitions, ...enemies, ...enemyHitboxes]

        }
    },
    "1_6": {
        init: ({ bgPosition, enemiesOffset }) => {
            movingSpeed = 3
            level = "1_6"
            collisionsMap = []
            boundaries = []
            enemies = []
            enemyHitboxes = []
            if (showDialogsData[1]) {
                dialogWindows[1].isShown = true
            }
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
                    },
                    enemiesOffsetData: {
                        x: 55,
                        y: -160
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
                    },
                    enemiesOffsetData: {
                        x: 55,
                        y: -45
                    }
                }),
            ]
            enemies.push(
                new Sprite({
                    position: {
                        x: 430 + enemiesOffset.x,
                        y: 0 + enemiesOffset.y
                    },
                    frames: {
                        max: 13
                    },
                    imageSrc: "./img/enemies/skeleton.png",
                    sprites: {
                        left: skeletonLeft,
                        right: skeletonRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(230),
                    movingDirection: "right",
                    shadow: true,
                    enemyType: "skeleton"
                }),
                new Sprite({
                    position: {
                        x: 210 + enemiesOffset.x,
                        y: 650 + enemiesOffset.y
                    },
                    frames: {
                        max: 4
                    },
                    imageSrc: "./img/enemies/bee.png",
                    sprites: {
                        left: beeLeft,
                        right: beeRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(650),
                    movingDirection: "right",
                    shadow: true,
                    enemyType: "bee"
                }),
            )
            enemyHitboxes.push(
                new Hitbox({
                    position: {
                        x: 440 + enemiesOffset.x,
                        y: 60 + enemiesOffset.y
                    },
                    steps: calcSteps(230),
                    movingDirection: "right",
                }),
                new Hitbox({
                    position: {
                        x: 238 + enemiesOffset.x,
                        y: 678 + enemiesOffset.y
                    },
                    steps: calcSteps(650),
                    movingDirection: "right",
                }),
            )
            movables = [background, ...boundaries, foreground, ...transitions, ...enemies, ...enemyHitboxes]

        }
    },
    "2_1": {
        init: ({ bgPosition, enemiesOffset }) => {
            movingSpeed = 5
            level = "2_1"
            collisionsMap = []
            boundaries = []
            enemies = []
            enemyHitboxes = []
            if (showDialogsData[6]) {
                dialogWindows[6].isShown = true
            }
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
                    },
                    enemiesOffsetData: {
                        x: -50,
                        y: 175
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
                    },
                    enemiesOffsetData: {
                        x: -80,
                        y: 165
                    }
                }),
            ]
            enemies.push(
                new Sprite({
                    position: {
                        x: 800 + enemiesOffset.x,
                        y: 650 + enemiesOffset.y
                    },
                    frames: {
                        max: 4
                    },
                    imageSrc: "./img/enemies/bee.png",
                    sprites: {
                        left: beeLeft,
                        right: beeRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(240),
                    movingDirection: "left",
                    shadow: true,
                    enemyType: "bee"
                }),
                new Sprite({
                    position: {
                        x: 575 + enemiesOffset.x,
                        y: 450 + enemiesOffset.y
                    },
                    frames: {
                        max: 4
                    },
                    imageSrc: "./img/enemies/bee.png",
                    sprites: {
                        left: beeLeft,
                        right: beeRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(240),
                    movingDirection: "right",
                    shadow: true,
                    enemyType: "bee"
                }),
            )
            enemyHitboxes.push(
                new Hitbox({
                    position: {
                        x: 828 + enemiesOffset.x,
                        y: 678 + enemiesOffset.y
                    },
                    steps: calcSteps(240),
                    movingDirection: "left",
                }),
                new Hitbox({
                    position: {
                        x: 603 + enemiesOffset.x,
                        y: 478 + enemiesOffset.y
                    },
                    steps: calcSteps(240),
                    movingDirection: "right",
                }),
            )
            movables = [background, ...boundaries, foreground, ...transitions, ...enemies, ...enemyHitboxes]

        }
    },
    "2_2": {
        init: ({ bgPosition, enemiesOffset }) => {
            movingSpeed = 5
            level = "2_2"
            collisionsMap = []
            boundaries = []
            enemies = []
            enemyHitboxes = []
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
                    },
                    enemiesOffsetData: {
                        x: -40,
                        y: -170
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
                    },
                    enemiesOffsetData: {
                        x: -40,
                        y: 175
                    }
                }),
            ]
            enemies.push(
                new Sprite({
                    position: {
                        x: 830 + enemiesOffset.x,
                        y: -60 + enemiesOffset.y
                    },
                    frames: {
                        max: 13
                    },
                    imageSrc: "./img/enemies/skeleton.png",
                    sprites: {
                        left: skeletonLeft,
                        right: skeletonRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(240),
                    movingDirection: "left",
                    shadow: true,
                    enemyType: "skeleton"
                }),
                new Sprite({
                    position: {
                        x: 590 + enemiesOffset.x,
                        y: 270 + enemiesOffset.y
                    },
                    frames: {
                        max: 13
                    },
                    imageSrc: "./img/enemies/skeleton.png",
                    sprites: {
                        left: skeletonLeft,
                        right: skeletonRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(240),
                    movingDirection: "right",
                    shadow: true,
                    enemyType: "skeleton"
                }),
                new Sprite({
                    position: {
                        x: 700 + enemiesOffset.x,
                        y: 270 + enemiesOffset.y
                    },
                    frames: {
                        max: 13
                    },
                    imageSrc: "./img/enemies/skeleton.png",
                    sprites: {
                        left: skeletonLeft,
                        right: skeletonRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(320),
                    movingDirection: "up",
                    shadow: true,
                    enemyType: "skeleton"
                }),
            )
            enemyHitboxes.push(
                new Hitbox({
                    position: {
                        x: 840 + enemiesOffset.x,
                        y: 0 + enemiesOffset.y
                    },
                    steps: calcSteps(240),
                    movingDirection: "left",
                }),
                new Hitbox({
                    position: {
                        x: 600 + enemiesOffset.x,
                        y: 330 + enemiesOffset.y
                    },
                    steps: calcSteps(240),
                    movingDirection: "right",
                }),
                new Hitbox({
                    position: {
                        x: 710 + enemiesOffset.x,
                        y: 330 + enemiesOffset.y
                    },
                    steps: calcSteps(320),
                    movingDirection: "up",
                }),
            )
            movables = [background, ...boundaries, foreground, ...transitions, ...enemies, ...enemyHitboxes]

        }
    },
    "2_3": {
        init: ({ bgPosition, enemiesOffset }) => {
            movingSpeed = 9
            level = "2_3"
            collisionsMap = []
            boundaries = []
            enemies = []
            enemyHitboxes = []
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
                    },
                    enemiesOffsetData: {
                        x: -50,
                        y: -160
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
                    },
                    enemiesOffsetData: {
                        x: -50,
                        y: 170
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
                    },
                    enemiesOffsetData: {
                        x: 0,
                        y: 0
                    }
                }),
            ]
            enemies.push(
                new Sprite({
                    position: {
                        x: 1185 + enemiesOffset.x,
                        y: 750 + enemiesOffset.y
                    },
                    frames: {
                        max: 13
                    },
                    imageSrc: "./img/enemies/skeleton.png",
                    sprites: {
                        left: skeletonLeft,
                        right: skeletonRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(500),
                    movingDirection: "up",
                    shadow: true,
                    enemyType: "skeleton"
                }),
                new Sprite({
                    position: {
                        x: 200 + enemiesOffset.x,
                        y: 250 + enemiesOffset.y
                    },
                    frames: {
                        max: 13
                    },
                    imageSrc: "./img/enemies/skeletonRight.png",
                    sprites: {
                        left: skeletonLeft,
                        right: skeletonRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(500),
                    movingDirection: "down",
                    shadow: true,
                    enemyType: "skeleton"
                }),
                new Sprite({
                    position: {
                        x: 1040 + enemiesOffset.x,
                        y: 510 + enemiesOffset.y
                    },
                    frames: {
                        max: 13
                    },
                    imageSrc: "./img/enemies/skeleton.png",
                    sprites: {
                        left: skeletonLeft,
                        right: skeletonRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(700),
                    movingDirection: "left",
                    shadow: true,
                    enemyType: "skeleton"
                }),
                new Sprite({
                    position: {
                        x: 370 + enemiesOffset.x,
                        y: 390 + enemiesOffset.y
                    },
                    frames: {
                        max: 13
                    },
                    imageSrc: "./img/enemies/skeleton.png",
                    sprites: {
                        left: skeletonLeft,
                        right: skeletonRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(700),
                    movingDirection: "right",
                    shadow: true,
                    enemyType: "skeleton"
                }),
                new Sprite({
                    position: {
                        x: 370 + enemiesOffset.x,
                        y: 630 + enemiesOffset.y
                    },
                    frames: {
                        max: 13
                    },
                    imageSrc: "./img/enemies/skeleton.png",
                    sprites: {
                        left: skeletonLeft,
                        right: skeletonRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(700),
                    movingDirection: "right",
                    shadow: true,
                    enemyType: "skeleton"
                }),
            )
            enemyHitboxes.push(
                new Hitbox({
                    position: {
                        x: 1195 + enemiesOffset.x,
                        y: 810 + enemiesOffset.y
                    },
                    steps: calcSteps(500),
                    movingDirection: "up",
                }),
                new Hitbox({
                    position: {
                        x: 210 + enemiesOffset.x,
                        y: 310 + enemiesOffset.y
                    },
                    steps: calcSteps(500),
                    movingDirection: "down"
                }),
                new Hitbox({
                    position: {
                        x: 1050 + enemiesOffset.x,
                        y: 570 + enemiesOffset.y
                    },
                    steps: calcSteps(700),
                    movingDirection: "left"
                }),
                new Hitbox({
                    position: {
                        x: 380 + enemiesOffset.x,
                        y: 450 + enemiesOffset.y
                    },
                    steps: calcSteps(700),
                    movingDirection: "right"
                }),
                new Hitbox({
                    position: {
                        x: 380 + enemiesOffset.x,
                        y: 690 + enemiesOffset.y
                    },
                    steps: calcSteps(700),
                    movingDirection: "right"
                }),
            )
            movables = [background, ...boundaries, foreground, ...transitions, ...enemies, ...enemyHitboxes]

        }
    },
    "2_4": {
        init: ({ bgPosition, enemiesOffset }) => {
            movingSpeed = 8
            level = "2_4"
            collisionsMap = []
            boundaries = []
            enemies = []
            enemyHitboxes = []
            if (showDialogsData[5]) {
                dialogWindows[5].isShown = true
            }
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
                    },
                    enemiesOffsetData: {
                        x: -50,
                        y: -160
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
                    },
                    enemiesOffsetData: {
                        x: -50,
                        y: 170
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
                    },
                    enemiesOffsetData: {
                        x: -79,
                        y: -55
                    }
                }),
            ]
            enemies.push(
                new Sprite({
                    position: {
                        x: 950 + enemiesOffset.x,
                        y: 680 + enemiesOffset.y
                    },
                    frames: {
                        max: 4
                    },
                    imageSrc: "./img/enemies/bee.png",
                    sprites: {
                        left: beeLeft,
                        right: beeRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(450),
                    movingDirection: "left",
                    shadow: true,
                    enemyType: "bee"
                }),
            )
            enemyHitboxes.push(
                new Hitbox({
                    position: {
                        x: 978 + enemiesOffset.x,
                        y: 708 + enemiesOffset.y
                    },
                    steps: calcSteps(450),
                    movingDirection: "left",
                }),
            )
            movables = [background, ...boundaries, foreground, ...transitions, ...enemies, ...enemyHitboxes]

        }
    },
    "2_5": {
        init: ({ bgPosition, enemiesOffset }) => {
            movingSpeed = 5
            level = "2_5"
            collisionsMap = []
            boundaries = []
            enemies = []
            enemyHitboxes = []
            if (showDialogsData[2]) {
                dialogWindows[2].isShown = true
            }
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
                    },
                    enemiesOffsetData: {
                        x: -50,
                        y: -160
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
                    },
                    enemiesOffsetData: {
                        x: -50,
                        y: 171
                    }
                }),
            ]
            enemies.push(
                new Sprite({
                    position: {
                        x: 480 + enemiesOffset.x,
                        y: -5 + enemiesOffset.y
                    },
                    frames: {
                        max: 4
                    },
                    imageSrc: "./img/enemies/bee.png",
                    sprites: {
                        left: beeLeft,
                        right: beeRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(250),
                    movingDirection: "down",
                    shadow: true,
                    enemyType: "bee"
                }),
                new Sprite({
                    position: {
                        x: 890 + enemiesOffset.x,
                        y: 220 + enemiesOffset.y
                    },
                    frames: {
                        max: 4
                    },
                    imageSrc: "./img/enemies/bee.png",
                    sprites: {
                        left: beeLeft,
                        right: beeRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(250),
                    movingDirection: "up",
                    shadow: true,
                    enemyType: "bee"
                }),
                new Sprite({
                    position: {
                        x: 1080 + enemiesOffset.x,
                        y: 40 + enemiesOffset.y
                    },
                    frames: {
                        max: 4
                    },
                    imageSrc: "./img/enemies/bee.png",
                    sprites: {
                        left: beeLeft,
                        right: beeRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(380),
                    movingDirection: "down",
                    shadow: true,
                    enemyType: "bee"
                }),
                new Sprite({
                    position: {
                        x: 1160 + enemiesOffset.x,
                        y: 420 + enemiesOffset.y
                    },
                    frames: {
                        max: 4
                    },
                    imageSrc: "./img/enemies/bee.png",
                    sprites: {
                        left: beeLeft,
                        right: beeRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(380),
                    movingDirection: "up",
                    shadow: true,
                    enemyType: "bee"
                }),
                new Sprite({
                    position: {
                        x: 285 + enemiesOffset.x,
                        y: 420 + enemiesOffset.y
                    },
                    frames: {
                        max: 4
                    },
                    imageSrc: "./img/enemies/bee.png",
                    sprites: {
                        left: beeLeft,
                        right: beeRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(380),
                    movingDirection: "up",
                    shadow: true,
                    enemyType: "bee"
                }),
                new Sprite({
                    position: {
                        x: 210 + enemiesOffset.x,
                        y: 40 + enemiesOffset.y
                    },
                    frames: {
                        max: 4
                    },
                    imageSrc: "./img/enemies/bee.png",
                    sprites: {
                        left: beeLeft,
                        right: beeRight,
                    },
                    spriteType: "enemy",
                    steps: calcSteps(380),
                    movingDirection: "down",
                    shadow: true,
                    enemyType: "bee"
                }),
            )
            enemyHitboxes.push(
                new Hitbox({
                    position: {
                        x: 508 + enemiesOffset.x,
                        y: 23 + enemiesOffset.y
                    },
                    steps: calcSteps(250),
                    movingDirection: "down",
                }),
                new Hitbox({
                    position: {
                        x: 918 + enemiesOffset.x,
                        y: 248 + enemiesOffset.y
                    },
                    steps: calcSteps(250),
                    movingDirection: "up",
                }),
                new Hitbox({
                    position: {
                        x: 1108 + enemiesOffset.x,
                        y: 68 + enemiesOffset.y
                    },
                    steps: calcSteps(380),
                    movingDirection: "down",
                }),
                new Hitbox({
                    position: {
                        x: 323 + enemiesOffset.x,
                        y: 448 + enemiesOffset.y
                    },
                    steps: calcSteps(380),
                    movingDirection: "up",
                }),
                new Hitbox({
                    position: {
                        x: 238 + enemiesOffset.x,
                        y: 68 + enemiesOffset.y
                    },
                    steps: calcSteps(380),
                    movingDirection: "down",
                }),
                new Hitbox({
                    position: {
                        x: 1188 + enemiesOffset.x,
                        y: 448 + enemiesOffset.y
                    },
                    steps: calcSteps(380),
                    movingDirection: "up",
                }),
            )
            movables = [background, ...boundaries, foreground, ...transitions, ...enemies, ...enemyHitboxes]

        }
    },
    "2_6": {
        init: ({ bgPosition, enemiesOffset }) => {
            movingSpeed = 2
            level = "2_6"
            collisionsMap = []
            boundaries = []
            enemies = []
            enemyHitboxes = []
            if (!showDialogsData[1]) {
                dialogWindows[1].show = true
                showDialogsData[1] = true
            }
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
                        x: 688 + enemiesOffset.x,
                        y: 375 + enemiesOffset.y,
                    },
                    imageSrc: "./img/portal_blue.png",
                    transitTo: "0_2",
                    bgPosition: {
                        x: -56,
                        y: -174
                    },
                    offsetBuffer: {
                        x: 0,
                        y: 0
                    },
                    playerPosition: {
                        x: 669,
                        y: 299
                    },
                    enemiesOffsetData: {
                        x: -50,
                        y: 170
                    },
                    isPortal: true
                }),
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
                    },
                    enemiesOffsetData: {
                        x: -50,
                        y: -165
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
                    },
                    enemiesOffsetData: {
                        x: -80,
                        y: -10
                    }
                }),
            ]
            movables = [background, ...boundaries, foreground, ...transitions, ...enemies]

        }
    },

}


