(function(exports){
    'use strict';
    function View(template){
        console.log("View Constructor executed");
        this.template = template || {};

        // ul tag
        this.todoTag = document.getElementById('todo-list');
        this.todoInputTag = document.getElementById('new-todo');
        this.removeBtnTags = document.getElementsByClassName('destroy');
        console.log("removeBtnTag len " + this.removeBtnTags.length);
    }

    View.prototype.bind = function(event, handler){
        var self = this;
        if(event === 'newTodo'){
            self.todoInputTag.addEventListener('change', function(){
                // handler(self.todoInputTag.value);
                handler(this.value);
            });
        }
        else if(event === 'removeTodo'){
            self._addEventListenerList(self.removeBtnTags, 'click', function(){
                // console.log("you clicked X button");
                // var target = event.target;
                // target.closest(...)
                handler(this.closest('.todo-item').getAttribute('data-id'));
            })
        }
    }

    View.prototype.render = function(viewCmd, data){
        var self = this;
        var viewCommands = {
            showLists: function(){
                // data는 todo list의 배열
                self._addItemListTag(data);
            },
            clearInputTag: function(){
                self.todoInputTag.value = '';
            },
            removeTodo: function(){
                // 여기서 data는 id
                self._removeItemListTag(data);
            }
        }
        viewCommands[viewCmd]();
    }

    View.prototype._addItemListTag = function(data){
        this.todoTag.innerHTML = this.template.makeList(data);
    }

    View.prototype._addEventListenerList = function(lists, event, fn) {
        console.log("_addEventListenerList()'s length ", lists.length);
        for (var i = 0; i < lists.length; i++) {
            console.log(i, " : ",lists[i]);
            lists[i].addEventListener(event, fn, false);
    }

    View.prototype._removeItemListTag = function(id){
        this._findElementById(id).remove();
    }

    View.prototype._findElementById = function(id){
        return document.querySelector("li[data-id='" + id + "']");
    }
}
    
    exports.app = exports.app || {};
    exports.app.View = View;
})(this);