/*
    DB와 같은 역할을 한다. (데이터와 직접적인 연산))
    LocalStorage를 사용하여 데이터를 저장하고 읽어보자.
    Model에서 불리는 Callback 함수에 의해 데이터를 출력하고 입력 받는다. 
*/
(function(exports){
    'use strict';
    function Storage(){
        console.log('store created');
    }
    exports.app = exports.app || {};
    exports.app.Storage = Storage;
})(this);