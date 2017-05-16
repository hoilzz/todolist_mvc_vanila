/*
    화면에 데이터를 그리는 역할 수행. 
    Template을 인자로 받아 자신의 프로퍼티에 추가
    생성자 함수에 조작해야 할 Element를 저장해둔다.
    
    그리고 Controller와 binding되어, 레코드의 변경을 바로바로 화면에 렌더링하는 역할을 한다.
    이번에는 controller에 이벤트를 등록하지 않고 view에서 이벤트를 등록할 것이다.
    화면을 구성하고 있는 요소는 view에서 접근할 수 있어야 mvc의 역할 구분이 명확해지기 때문이다.
*/
(function (exports){
    'use strict';
    function View(template){
        console.log('view created');
        this.template = template;
    }
    exports.app = exports.app || {};
    exports.app.View = View;
})(this);

