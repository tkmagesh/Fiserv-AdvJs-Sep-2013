define(['Bug'], function(Bug){
    function BugsCollection(){
        var bugs = [];

        this.onListChange = null;

        this.add = function(bug){
            bugs.push(bug);
            if (this.onListChange) this.onListChange();
        };

        this.removeClosed = function(){
            for(var i = bugs.length-1; i >=0; i--){
                if (bugs[i].isClosed)
                    bugs.splice(i,1);
            }
            if (this.onListChange) this.onListChange();
        };

        this.forEach = function(fn){
            for(var i=0; i<bugs.length; i++)
                fn(bugs[i]);
        };
    }
    return BugsCollection;
});
