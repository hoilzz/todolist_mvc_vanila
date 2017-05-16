/*
    모델은 데이터와 직접적으로 관련된 역할을 수행 
    Storage와 소통하기 위해 storage를 인자로 넘겨받아, 자신의 프로퍼티에 추가.
    데이터를 create, read, update, delete 하는 역할을 수행
*/

(function(exports){
    'use strict';
    function Model(storage){
        console.log('Model created');
        this.storage = storage;
    }

    // 새로운 객체 생성. 이 객체는 storage로 전달, data[] 배열에 추가
    // 완료/미완료 상태를 나타내기 위해 completed를 객체에 추가
    // storage에게 callback function으로 self.view.render 함수 저장.
    Model.prototype.create = function(title, callback){
        console.log('Model.create method execute!');
        title = title || '';
        callback = callback || function(){};

        var newItem = {
            title: title.trim(),
            completed: false
        };
        this.storage.save(newItem, callback);
    }

    Model.prototype.read = function(callback){
        this.storage.findAll(callback);
    };
    
    exports.app = exports.app || {};
    exports.app.Model = Model;
})(this);