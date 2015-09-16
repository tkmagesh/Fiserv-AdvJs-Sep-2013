var calculator = (function(){
    var result = 0;
    return {
        add : function(x){
            result += x;
        },
        subtract : function(x){
            result -= x;
        },
        multiply : function(x){
            result *= x;
        },
        divide : function(x){
            result /= x;
        },
        getResult : function(){
            return result;
        }
    }
})();

calculator.add(100);
calculator.subtract(50);
calculator.multiply(10);
calculator.divide(2);
calculator.getResult() //-> 250

