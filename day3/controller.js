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
        });

        this.view.bind('removeTodo', function(id){
            self.removeItem(id);
        });

        this.view.bind('toggleTodo', function(data){
            self.toggleItem(data.id, data.completed);
        })

        this.showAll();
    }

    Controller.prototype.showAll = function(){
        var self = this;
        this.model.read(function(data){
            // this.view.render('showLists', data);
            // 여기서 위 코드로 실행시 this undefined..
            self.view.render('showLists', data);
        });
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

    Controller.prototype.removeItem = function(id){
        var self = this;
        // 익명함수의 매개변수인 id가 가장 바깥쪽 매개변수인 id값을 받을까?
        // 익명함수 선언문이라 안받을듯.
        this.model.remove(id, function(id){
            self.view.render('removeTodo', id);
        });
    }

    Controller.prototype.toggleItem = function(id, completed){
        var self = this;
        this.model.update({id: id, completed:completed}, function(data){
            self.view.render('toggleTodo', data);
        });
    }

    exports.app = exports.app || {};
    exports.app.Controller = Controller;
})(this);