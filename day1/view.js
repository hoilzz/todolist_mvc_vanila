(function(exports){
    'use strict';
    function View(template){
        console.log("View Constructor executed");
        this.template = template || {};

        // ul tag
        this.todoTag = document.getElementById('todo-list');
        this.todoInputTag = document.getElementById('new-todo');
    }

    View.prototype.bind = function(event, handler){
        var self = this;
        if(event === 'newTodo'){
            self.todoInputTag.addEventListener('change', function(){
                // handler(self.todoInputTag.value);
                handler(this.value);
            });
        }
    }

    View.prototype.render = function(viewCmd, data){
        var self = this;
        var viewCommands = {
            showLists: function(){
                self._addItemListTag(data);
            },
            clearInputTag: function(){
                self.todoInputTag.value = '';
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