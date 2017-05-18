(function (exports){
    'use strict';
    
    function Controller(model, view){
        console.log("Controller Constructor executred!");

        this.model = model;
        this.view  = view;

        // event와 핸들러를 전달해주자.

        var self = this;

        this.view.bind('newTodo', function(title){
            self.addItem(title);
        })

        this.showAll();
    }

    Controller.prototype.showAll = function(){
        var self = this;
        this.model.read(function(data){
            // this.view.render('showLists', data);
            // 여기서 위 코드로 실행시 this undefined..
            self.view.render('showLists', data);
        })
        // 데이터 읽어와서 from Model from Storage
        // 렌더
    }

    Controller.prototype.addItem = function(title){
        var self = this;
        this.model.create(title, function(){
            self.view.render('clearInputTag');
        });
        this.showAll();
    }

    exports.app = exports.app || {};
    exports.app.Controller = Controller;
})(this);