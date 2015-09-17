define([], function(){
    function Bug(defaults){
        this.id = defaults.id || 0;
        this.name = defaults.name || '';
        this.isClosed = defaults.isClosed || false;
    }

    Bug.prototype.toggle = function(){
        this.isClosed = !this.isClosed;
    }
    return Bug;
});
