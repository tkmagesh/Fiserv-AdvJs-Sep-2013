var products = [
    {id : 5, name : "Pen", cost : 60, units : 100, category : 1},
    {id : 8, name : "Hen", cost : 100, units : 20, category : 2},
    {id : 3, name : "Ten", cost : 10, units : 10, category : 1},
    {id : 6, name : "Den", cost : 50, units : 30, category : 2},
    {id : 7, name : "Len", cost : 70, units : 50, category : 1}
];

/*
sort
filter
some
any
min
max
countBy
sum
aggregate
groupBy
*/

function describe(title, fn){
    console.group(title);
    fn();
    console.groupEnd();
}

describe("Default List", function(){
    console.table(products);
});

describe("Sort", function(){
    describe("Default Sort [ products by id ]", function(){
        function sort(){
            for(var i=0; i<products.length-1; i++)
                for(var j=i+1; j<products.length; j++)
                    if (products[i].id > products[j].id){
                        var temp = products[i];
                        products[i] = products[j];
                        products[j] = temp;
                    }
        }
        sort();
        console.table(products);
    });
    describe("Generic Sort [ Any list by any attribute ]", function(){
        function sort(){
            for(var i=0; i<products.length-1; i++)
                for(var j=i+1; j<products.length; j++)
                    if (products[i].id > products[j].id){
                        var temp = products[i];
                        products[i] = products[j];
                        products[j] = temp;
                    }
        }
        describe("Products by cost", function(){
            console.table(products);
        });
        describe("Products by units", function(){
            console.table(products);
        });
    });
});
