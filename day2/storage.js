(function(exports){
    'use strict';
    function Storage(name){
        console.log("Storage Constructor executed");
        this._dbName = name;

        if(!localStorage[name]){
            var data = {
                todos:[]
            };
            localStorage[name] = JSON.stringify(data);
        }
    }

    Storage.prototype.findAll = function(callback){
        // callback은 렌더 함수.
        callback = callback || function(){};
        // callback.call(this, JSON.parse(localStorage[this._dbName]).todos);
        callback.call(this, JSON.parse(localStorage[this._dbName]).todos);
    }

    Storage.prototype.save = function(item, callback){

        var data = JSON.parse(localStorage[this._dbName]);
        var todos = data.todos;

        item = item || '';
        callback = callback || function(){};

        item.id = new Date().getTime();
        todos.push(item);
        localStorage[this._dbName] = JSON.stringify(data);

        callback();
    }

    Storage.prototype.remove = function(id, callback){
        // var todos = JSON.parse(localStorage[this._dbname]).data;
        var data = JSON.parse(localStorage[this._dbName]);
        var todos = data.todos;

        var itemIndex = this.findById(id, todos);
        
        if(itemIndex === false){
            alert("not found item");
        } else{
            todos.splice(itemIndex,1);
        }

        localStorage[this._dbName] = JSON.stringify(data);
        callback(id);
        
    }

    // idx값 리턴
    Storage.prototype.findById = function(id, data){
        data = data || [];
        
        if(id){ 
            id = Number(id);
        } else {
            id = 0;
        }

        for(var i=0; i<data.length; i++){
            if(data[i].id === id){
                return i;
            }
        }
        return false;
    }

    exports.app = exports.app || {};
    exports.app.Storage = Storage;
})(this);