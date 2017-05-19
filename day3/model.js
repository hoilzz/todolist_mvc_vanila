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

    Model.prototype.update = function(data, callback){
        callback = callback || function(){};
        data = data || {};
        
        this.storage.save(data, callback);
    }

    Model.prototype.remove = function(id, callback){
        id = id || "";
        callback = callback || function(){};

        this.storage.remove(id, callback);
    }

    exports.app = exports.app || {};
    exports.app.Model = Model;
})(this);