var products = [
    {id : 5, name : "Pen", cost : 60, units : 100, category : "c1"},
    {id : 8, name : "Hen", cost : 100, units : 20, category : "c2"},
    {id : 3, name : "Ten", cost : 10, units : 10, category : "c1"},
    {id : 6, name : "Den", cost : 50, units : 30, category : "c2"},
    {id : 7, name : "Len", cost : 70, units : 50, category : "c1"}
];

/*
sort
filter
some
all
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
        function sort(list, attrName){
            for(var i=0; i<list.length-1; i++)
                for(var j=i+1; j<list.length; j++)
                    if (list[i][attrName] > list[j][attrName]){
                        var temp = list[i];
                        list[i] = list[j];
                        list[j] = temp;
                    }
        }
        describe("Products by cost", function(){
            sort(products, "cost");
            console.table(products);
        });
        describe("Products by units", function(){
            sort(products, "units");
            console.table(products);
        });
    });
    describe("Generic Sort [ Any list by any comparer ]", function(){
        function sort(list, comparerFn){
            for(var i=0; i<list.length-1; i++)
                for(var j=i+1; j<list.length; j++)
                    if (comparerFn(list[i], list[j]) > 0){
                        var temp = list[i];
                        list[i] = list[j];
                        list[j] = temp;
                    }
        }
        describe("Products by cost", function(){
            var productComparerByValue = function(p1, p2){
                var p1Value = p1.cost * p1.units,
                    p2Value = p2.cost * p2.units;
                if (p1Value > p2Value) return 1;
                if (p1Value < p2Value) return -1;
                return 0;
            }
            sort(products, productComparerByValue);
            console.table(products);
        });
    });
});

describe("Filter", function(){
    function filter(list, predicate){
        var result = [];
        for(var i=0; i<list.length; i++)
            if (predicate(list[i]))
                result.push(list[i]);
        return result;
    }
    function negate(predicate){
        return function(){
            return !predicate.apply(this,arguments);
        };
    }
    var costlyProductPredicate = function(product){
        return product.cost > 50;
    };
    describe("All costly products [ cost > 50 ]", function(){

        var costlyProducts = filter(products, costlyProductPredicate);
        console.table(costlyProducts);
    });
    describe("All affordable products [ cost <= 50 ]", function(){
        var affordableProductPredicate = negate(costlyProductPredicate);

        var affordableProducts = filter(products, affordableProductPredicate);
        console.table(affordableProducts);
    });
    var overstockedProductPredicate = function(product){
        return product.units > 70;
    };
    describe("All over stocked products [ units > 70 ]", function(){
        var overStockedProducts = filter(products, overstockedProductPredicate);
        console.table(overStockedProducts);
    });
    describe("All well stocked products [ units <= 70 ]", function(){
        var wellStockedProductPredicate = negate(overstockedProductPredicate);
        var wellStockedproducts = filter(products, wellStockedProductPredicate);
        console.table(wellStockedproducts);
    });


});

describe("Some", function(){
    function some(list, predicate){
        for(var i=0; i<list.length; i++)
            if (predicate(list[i])) return true;
        return false;
    }
    describe("Are there any costly products", function(){
        var costlyProductPredicate = function(product){
            return product.cost > 50;
        };
        var result = some(products, costlyProductPredicate);
        console.log(result);
    });
});

describe("All", function(){
    function all(list, predicate){
        for(var i=0; i<list.length; i++)
            if (!predicate(list[i])) return false;
        return true;
    }
    describe("Are all products costly?", function(){
        var costlyProductPredicate = function(product){
            return product.cost > 50;
        };
        var result = all(products, costlyProductPredicate);
        console.log(result);
    });
});

describe("Min", function(){
    function min(list, valueSelector){
        var result = Number.MAX_VALUE;
        for(var i=0; i<list.length; i++){
            var value = valueSelector(list[i]);
            if (value < result) result = value;
        }
        return result;
    }
    describe("Minimum cost ", function(){
        var costValueSelector = function(product){
            return product.cost;
        };
        var minCost = min(products, costValueSelector);
        console.log(minCost);
    });
});

describe("Max", function(){
    function max(list, valueSelector){
        var result = Number.MIN_VALUE;
        for(var i=0; i<list.length; i++){
            var value = valueSelector(list[i]);
            if (value > result) result = value;
        }
        return result;
    }
    describe("Maximum cost ", function(){
        var costValueSelector = function(product){
            return product.cost;
        };
        var maxCost = max(products, costValueSelector);
        console.log(maxCost);
    });
});

describe("Aggregate", function(){
    function aggregate(list, aggregator, seed){
        var result = seed;
        for(var i=0; i<list.length; i++)
            result = aggregator(result, list[i]);
        return result;
    }

    describe("Sum of product values [aggregate(units * cost)]", function(){
        var totalProductValue = aggregate(products, function(seed, product){
            return seed + (product.cost * product.units);
        }, 0);
        console.log(totalProductValue);
    });
});

describe("GroupBy", function(){
   function groupBy(list, keySelector){
       var result = {};
       for(var i=0; i < list.length; i++){
           var key = keySelector(list[i]);
           result[key] = result[key] || [];
           result[key].push(list[i]);
       }
       return result;
   };
   describe("By category", function(){
       var productsByCategory = groupBy(products, function(p){ return p.category;});
       for(var key in productsByCategory){
           describe("Key - " + key, function(){
               console.table(productsByCategory[key]);
           });
       }
   });

   describe("By cost", function(){
       var productsByCost = groupBy(products, function(product){
           return product.cost > 50 ? "costly" : "affordable";
       });
       for(var key in productsByCost){
           describe("Key - " + key, function(){
               console.table(productsByCost[key]);
           });
       }
   });
});
