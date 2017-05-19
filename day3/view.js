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
        else if(event === 'removeTodo'){
            self.todoTag.addEventListener('click', function(event){
                var target = event.target;
                
                if(target.getAttribute('class') === 'destroy'){
                    var id = self._getItemId(target, 'todo-item') || '';
                    handler(id);
                } 
            });
        }
        else if(event === 'toggleTodo'){
            self.todoTag.addEventListener('click', function(event){
                var target = event.target;    
                if(target.getAttribute('class') === 'toggle'){
                    var id = self._getItemId(target, 'todo-item') || '';
                    var checked = target.checked;
                    handler({id:id, completed: checked});
                }
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
            },
            toggleTodo: function(){
                self._toggleItem(data);
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
    }

    View.prototype._removeItemListTag = function(id){
        this._getElementById(id).remove();
    }

    View.prototype._getElementById = function(id){
        return document.querySelector("li[data-id='" + id + "']");
    }

    View.prototype._getItemId = function(element, className){
        //this.closest('.todo-item').getAttribute('data-id')
        var targetElement = element.closest('.' + className);
        return targetElement.dataset.id;
    }

    View.prototype._toggleItem = function(data){
        var todoElement = this._getElementById(data.id);
        var checkBox    = todoElement.querySelector('.toggle');
        if(data.completed === true){
            todoElement.classList.add('completed');
            checkBox.checked = data.completed;
        } else {
            todoElement.classList.remove('completed');
            checkBox.checked = data.completed;
        }
    }

    exports.app = exports.app || {};
    exports.app.View = View;
})(this);