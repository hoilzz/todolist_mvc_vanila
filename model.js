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
    exports.app = exports.app || {};
    exports.app.Model = Model;
})(this);