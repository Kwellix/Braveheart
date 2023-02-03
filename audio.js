const audio = {
    Map: new Howl({
        src: './audio/map.mp3',
        html5: true,
        loop: true,
        volume: 0.4
    }),
    Run: new Howl({
        src: './audio/run.mp3',
        html5: true,
        loop: true,
        volume: 0.25
    }),
    Death: new Howl({
        src: './audio/death.mp3',
        volume: 1.5
    }),
}