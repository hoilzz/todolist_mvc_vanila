(function(exports){
    'use strict';
    function Model(storage){
        console.log("Model Constructor executed");
        
        this.storage = storage || {};
    }

   

    Model.prototype.read = function(query, callback){
        var queryType = typeof query;
        callback = callback || function(){};
        // query가 함수타입이면 그대로 findAll 이용 후, callback 실행.
        if(queryType === 'function'){
            callback = query;
            return this.storage.findAll(callback);
        } 
        // query가 id면 find(id) 호출 후, callback 실행
        else if( 'string' || queryType === 'number'){
            query = parseInt(query, 10);
            this.storage.find({id:query}, callback);
        } 
        else {
            this.storage.find(query, callback);
        }
    };

    Model.prototype.create = function(title, callback){
        title = title || "";
        callback = callback || function(){};

        var newItem = {
            title: title.trim(),
            completed: false
        }
        this.storage.save(newItem, callback);
    }

    Model.prototype.update = function(data, callback){
        callback = callback || function(){};
        data = data || {};
        
        this.storage.save(data, callback);
    }

    Model.prototype.remove = function(id, callback){
        id = id || "";
        callback = callback || function(){};

        this.storage.remove(id, callback);
    }

    Model.prototype.getCount = function(callback){
        var todoItems = this.storage.findAll();
        var todos = {
            completed: 0,
            active: 0,
            total: 0
        }
        todoItems.forEach(function(item, index){
            if(item.completed) {
                todos.completed += 1;
            } else{
                todos.active += 1;
            }
            todos.total += 1;
        });
        callback(todos);
    }

    exports.app = exports.app || {};
    exports.app.Model = Model;
})(this);