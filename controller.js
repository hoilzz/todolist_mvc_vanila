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

        var self = this;
        //bind를 통해 레코드 변경을 자동적으로 view에 반영
        this.view.bind('newTodo', function(title){
            self.addItem(title);
        });
        this.showAll();
    }

    /*
        Controller.prototype의 메서드들은 모두 model에 data조작을 위임하는 메서드들이다.
        또한, callback 구조를 통해 변경된 data에 대한 정보를 view에게 전달하여 렌더링하도록 한다.
    */
    

    Controller.prototype.showAll = function(){
        console.log('Controller.showAll method execute!');
        var self = this;
        
        // 데이터 조작 후, callback으로 view에게 변경된 데이터 전달.
        this.model.read(function(data){
            self.view.render('showEntries', data);
        })
    }


    // model에게 data 변경(추가 or 수정)을 요청하고, callback으로 넘어온 값을 view에게 전달
    Controller.prototype.addItem = function(title){
        console.log('Controller.addItem method execute!');
        var self = this;
        // view.bind 로부터 넘어온 title 값이 비어있는지 확인
        // this.showAll()은 추가한 다음 바로 list를 출력하기 위한 메서드다. 
        if(title.trim() === "") {
            return;
        }
        // 값을 저장할 object를 생성
        self.model.create(title, function(){
            // input tag를 비운다.
            self.view.render('clearNewTodo', title);
        });
        // 추가한 다음 바로 list 출력하기
        
        this.showAll();
    }

    exports.app = exports.app || {};
    exports.app.Controller = Controller;
})(this);