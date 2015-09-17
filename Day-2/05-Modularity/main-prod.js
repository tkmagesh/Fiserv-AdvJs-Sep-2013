require(['jquery','BugsCollection','Bug','BugsCollectionView'], function($, BugsCollection, Bug, BugsCollectionView){
    $(function(){
            window.bugsCollection = new BugsCollection();
            bugsCollection.add(new Bug({id : 1, name : "Stackoverflow error", isClosed : false}));
            bugsCollection.add(new Bug({id : 2, name : "Server communication failure", isClosed : false}));
            bugsCollection.add(new Bug({id : 1, name : "User authentication malfunctions", isClosed : false}));

            var view = new BugsCollectionView(bugsCollection, $(".content"));
            view.render();

        });
});

define('BugsCollectionView', ['jquery','BugsCollection'], function($, BugsCollection){
    function BugsCollectionView(bugsCollection, $root){
        var self = this;
        bugsCollection.onListChange = function(){
            self.render();
        }
        this.render = function(){
            var $bugsList = $root.find("#olBugList");
            $bugsList.html('');
            bugsCollection.forEach(function(bug){
                $("<li>")
                    .html(bug.name)
                    //.click(onBugItemClick)
                    .addClass(bug.isClosed ? "closed" : "")
                    .appendTo($bugsList);
            });
        }
    }
    return BugsCollectionView;
});

define('BugsCollection', ['Bug'], function(Bug){
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

define('Bug', [], function(){
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
