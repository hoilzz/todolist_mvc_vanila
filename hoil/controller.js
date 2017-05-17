(function (exports){
    'use strict';
    
    function Controller(model, view){
        console.log("Controller Constructor executred!");

        this.model = model;
        this.view  = view;

        this.showAll();
    }

    Controller.prototype.showAll = function(){
        var self = this;
        this.model.read(function(data){
            this.view.render('showLists', data);
        })
        // 데이터 읽어와서 from Model from Storage
        // 렌더
    }

    exports.app = exports.app || {};
    exports.app.Controller = Controller;
})(this);