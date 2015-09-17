define(['jquery','BugsCollection'], function($, BugsCollection){
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
