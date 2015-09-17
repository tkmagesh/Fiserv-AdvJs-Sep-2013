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
