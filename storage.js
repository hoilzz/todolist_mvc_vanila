/*
    DB와 같은 역할을 한다. (데이터와 직접적인 연산))
    LocalStorage를 사용하여 데이터를 저장하고 읽어보자.
    Model에서 불리는 Callback 함수에 의해 데이터를 출력하고 입력 받는다. 
*/
(function(exports){
    'use strict';
    function Storage(name, callback){
        console.log('store created');
        callback = callback || function(){};

        this._dbName = name;

        if(!localStorage[name]){
            var data = {
                todos:[]
            };
            localStorage[name] = JSON.stringify(data);
        }
    }

    Storage.prototype.findAll = function(callback){
        console.log("Storage.findAll method execute!");
        callback = callback || function(){};
        callback.call(this, JSON.parse(localStorage[this._dbName]).todos);
    }

    Storage.prototype.save = function(updateData, callback, id){
        console.log("Storage.save method execute!");
        var data = JSON.parse(localStorage[this._dbName]);
        var todos = data.todos;

        callback = callback || function(){};

        if(id){
            // update
            for(var i=0; i<todos.length; i++){
                if(todos[i].id === id){
                    for(var key in updateData){
                        todo[i][key] = updateData[key];
                    }
                    break;
                }
            }
            // addNewItem
            localStorage[this._dbName] = JSON.stringify(data);
            callback.call(this, todos);
        } else{
            // 새로운 값 추가
            // Date값으로 id값 부여.
            updateData.id = new Date().getTime();

            todos.push(updateData);
            localStorage[this._dbName] = JSON.stringify(data);
            // input tag의 text 비워주기
            callback.call(this, [updateData]);
        }
    }

    exports.app = exports.app || {};
    exports.app.Storage = Storage;
})(this);