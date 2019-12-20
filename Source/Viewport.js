const Viewport = function(x, y, rightBoundary, bottomBoundary, width = 960, height = 720){
    
    this.rightBoundary = rightBoundary;
    this.bottomBoundary = bottomBoundary;
    this.width = width;
    this.height = height;
    this.defaultWidth = 960;
    this.defaultHeight = 720;
    this.setCenterX(x);
    this.setCenterY(y);
    this.resize();
}

Viewport.prototype = {
    constructor: Viewport,
    getLeft:function(){
        return this.x - (this.width / 2);
    },
    getRight:function(){
        return this.x + (this.width / 2);
    },
    getTop:function(){
        return this.y - (this.height / 2);
    },
    getBottom:function(){
        return this.y + (this.height / 2);
    },

    setCenterX: function(x) { 
        let left = x - this.width * .5;
        let right = x + this.width * .5;
        if(right > this.rightBoundary){
            this.x = x - (right - this.rightBoundary);
        } else if (left < 0){
            this.x = x - left;
        } else {
            this.x = x;
        }
    },

    setCenterY: function(y) { 
        let top = y - this.height * .5;
        let bottom = y + this.height * .5;
        if(bottom > this.bottomBoundary){
            this.y = y - (bottom - this.bottomBoundary);
        } else if (top < 0){
            this.y = y - top;
        } else {
            this.y = y;
        }
    },
    setBoundaries:function(right, bottom){
        this.rightBoundary = right;
        this.bottomBoundary = bottom;
        this.resize();
    },

    resize:function(){

        let widthRatio =  this.rightBoundary / this.defaultWidth;
        let heightRatio = this.bottomBoundary / this.defaultHeight;
        if (widthRatio < 1 || heightRatio < 1){
            this.width = this.defaultWidth * Math.min(widthRatio, heightRatio);
            this.height = this.defaultHeight * Math.min(widthRatio, heightRatio);
        } else {
            this.width = this.defaultWidth;
            this.height = this.defaultHeight;
        }
        
    },

    setup:function(x, y, rightBoundary, bottomBoundary){
        this.x = x;
        this.y = y;
        this.setBoundaries(rightBoundary, bottomBoundary);
    }
}
export default Viewport;