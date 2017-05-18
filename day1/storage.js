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

    exports.app = exports.app || {};
    exports.app.Storage = Storage;
})(this);