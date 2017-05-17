(function(exports){
    'use strict';
    function View(template){
        console.log("View Constructor executed");
        this.template = template || {};

        // ul tag
        this.todoTag = document.getElementsByClassName('todo-list');
    }

    View.prototype.render = function(viewCmd, data){

        var viewCommands = {
            'showLists': function(data){
                this._addItemListTag(data);
            }
        }
        viewCommands[viewCmd]();
    }

    View.prototype._addItemListTag = function(data){
        this.todoTag.innerHTML = this.template.makeList(data);
    }
    
    exports.app = exports.app || {};
    exports.app.View = View;
})(this);