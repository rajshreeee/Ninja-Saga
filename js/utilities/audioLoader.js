class AudioLoader {
    constructor() {
        this.audios = {};
        this.numberOfAudios = 0;
        this.numberOfLoadedAudios = 0;
        this.init();
    }

    init() {
        this.loadAudio("intro", "./audios/intro.mp3");
        this.loadAudio("punch", "./audios/punch.mp3");
        this.loadAudio("charge", "./audios/charge.mp3");
        this.loadAudio("victory", "./audios/victory.mp3");
        this.loadAudio("defeat", "./audios/defeat.mp3");
        this.loadAudio("cash", "./audios/cash.mp3");
        this.loadAudio("fight", "./audios/fight.mp3");

        this.numberOfAudios = Object.keys(this.audios).length;
    }

    loadAudio(identifier, source) {
        let audio = new Audio();
        audio.src = source;
        audio.addEventListener("canplay", () => this.numberOfLoadedAudios++);
        this.audios[identifier] = audio;
    }

    hasAllAudiosLoaded() {
        return this.numberOfLoadedAudios == this.numberOfAudios ? true : false;
    }

    play(keyword) {
        this.audios[keyword].play();
    }

    stop(keyword) {
        this.audios[keyword].pause();
        this.audios[keyword].currentTime = 0;
    }
}
