/* 
    컨트롤러의 역할은 모델과 뷰를 연결하는 것
    모델과 뷰에 접근해야 하므로, 두 가지를 인자로 넘겨 받아 자신의 프로퍼티에 추가하였다.
    모든 바인딩이 컨트롤러에서 이루어지며, 사용자의 요청을 받는 부분이 컨트롤러다.
*/
(function(exports){
    'use strict';
    function Controller(model, view){
        console.log('controller created');
        this.model = model;
        this.view = view;
    }
    exports.app = exports.app || {};
    exports.app.Controller = Controller;
})(this);