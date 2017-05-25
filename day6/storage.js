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
        // callback이 없으면 찾은 데이터 return
        if (callback === undefined){
            return JSON.parse(localStorage[this._dbName]).todos;
        } 
        // callback이 있으면 데이터를 콜백 파라미터로 전달.
        else{
            callback(JSON.parse(localStorage[this._dbName]).todos);
        }
    }

    Storage.prototype.find = function(query, callback){
        if(!callback){
            return ;
        }
        var todos = JSON.parse(localStorage[this._dbName]).todos;
        // filter 기준에 맞는 얘만 callback 실행.
        callback.call(this, todos.filter(function(todo){
            for(var q in query){
                if(query[q] !== todo[q]){
                    return false;
                }
            }
            return true;
        }));
    };


    Storage.prototype.save = function(itemData, callback){

        var data = JSON.parse(localStorage[this._dbName]);
        var todos = data.todos;

        itemData = itemData || '';
        callback = callback || function(){};

        if(itemData.id){
            var itemIndex = this.findById(itemData.id, todos);

            if(itemIndex === false){
                alert("not found item");
            }else {
                for(var key in itemData){              
                    if(key == 'id') continue;
                    todos[itemIndex][key] = itemData[key];
                }
                localStorage[this._dbName] = JSON.stringify(data);
            }
            // callback.call(this,itemData);
            callback(itemData);
        } else{
            itemData.id = new Date().getTime();
            todos.push(itemData);
            localStorage[this._dbName] = JSON.stringify(data);
            callback();
        }
    };

    Storage.prototype.remove = function(id, callback){
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