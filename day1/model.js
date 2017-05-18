(function(exports){
    'use strict';
    function Model(storage){
        console.log("Model Constructor executed");
        
        this.storage = storage || {};
    }

    Model.prototype.read = function(callback){
        this.storage.findAll(callback);
    }

    Model.prototype.create = function(title, callback){

        title = title || "";
        callback = callback || function(){};

        var newItem = {
            title: title.trim(),
            completed: false
        }
        this.storage.save(newItem, callback);
    }

    exports.app = exports.app || {};
    exports.app.Model = Model;
})(this);