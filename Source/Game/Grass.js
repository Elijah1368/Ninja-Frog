import Animator from './Animator.js';

const Grass = function(x, y) {
    Animator.call(this, Grass.prototype.frame_sets["wave"], 25);

    this.x = x;
    this.y = y;

    };
    Grass.prototype = {

    frame_sets: {

        "wave":[14, 15, 16, 15]

    }

    };
Object.assign(Grass.prototype, Animator.prototype);
export default Grass;