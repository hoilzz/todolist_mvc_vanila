(function(exports){
    'use strict';
    function Model(storage){
        console.log("Model Constructor executed");
        
        this.storage = storage || {};
    }

    Model.prototype.read = function(callback){
        this.storage.findAll(callback);
    }

    exports.app = exports.app || {};
    exports.app.Model = Model;
})(this);