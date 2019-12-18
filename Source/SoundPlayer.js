

const SoundPlayer = function(audioFiles){
    this.keys = Object.keys(audioFiles);
    this.audioFiles = audioFiles;
}

SoundPlayer.prototype = {
    constructor: SoundPlayer,
    play:function(key){
        if (!this.keys.includes(key)) {
            console.log("no such audio");
        } else {
            this.audioFiles[key].play();
        }
    },
    pause:function(key){
        if (!this.keys.includes(key)) {
            console.log("no such audio");
        } else {
            this.audioFiles[key].pause();
        }
    },
    adjustSpeed:function(key, value){
        if (!this.keys.includes(key)) {
            console.log("no such audio");
        } else {
            this.audioFiles[key].playbackRate = value;
        }
    },
    adjustVolume:function(key, value){
        if (!this.keys.includes(key)) {
            console.log("no such audio");
        } else {
            this.audioFiles[key].volume = value;
        }
    }
}
export default SoundPlayer;