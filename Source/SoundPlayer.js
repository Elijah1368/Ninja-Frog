

const SoundPlayer = function(audioFiles){
    this.keys = Object.keys(audioFiles);
    this.audioFiles = audioFiles;
}

SoundPlayer.prototype = {
    constructor: SoundPlayer,
    play:function(key){
        if (this.has(key)) {
            this.audioFiles[key].oncanplay = this.audioFiles[key].play();
        }
    },
    pause:function(key){
        if (this.has(key)) {
            this.audioFiles[key].pause();
        }
    },
    adjustSpeed:function(key, value){
        if (this.has(key)) {
            this.audioFiles[key].playbackRate = value;
        }
    },
    adjustVolume:function(key, value){
        if (this.has(key)) {
            this.audioFiles[key].volume = value;
        }
    }, 
    has:function(key){
        if (!this.keys.includes(key)) {
            console.log("no such audio");
            return false;
        }   return true;
    }
}
export default SoundPlayer;