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
        });
        
        // 새로운 input.edit 엘리먼트에 대해 다음과 같이 이벤트 추가하면 
        // 더블 클릭할 때마다 이벤트 생성된다.
        this.view.bind('readyToModify', function(){
            self.view.bind('blurModify', function(data){
                self.modifyTitle(data.id, data.title);
            })
        });
        // this.view.bind('focusOutModify', function(data){
        //     self.modifyTitle(data.id, data.title);
        // });
        this.view.bind('completeToModify', function(data){
            self.modifyTitle(data.id, data.title);
        });

        this.showAll();
    }

    Controller.prototype.showAll = function(){
        var self = this;
        this.model.read(function(data){
            self.view.render('showLists', data);
        });
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

    Controller.prototype.modifyTitle = function(id, title){
        var self = this;
        this.model.update({id: id, title:title}, function(data){
            self.view.render('completeToUpdate', data);
        });
    }

    exports.app = exports.app || {};
    exports.app.Controller = Controller;
})(this);