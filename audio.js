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
        volume: 0.10
    }),
    Death: new Howl({
        src: './audio/death.mp3',
        volume: 1.5
    }),
    Portal: new Howl({
        src: './audio/portal.mp3',
        volume: 0.70
    }),
    Win: new Howl({
        src: './audio/win.mp3',
        volume: 0.70
    }),
    KeyFound: new Howl({
        src: './audio/keyfound.mp3',
        volume: 0.70
    }),
}