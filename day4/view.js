(function(exports){
    'use strict';
    function View(template){
        console.log("View Constructor executed");
        this.template = template || {};
        // ul tag
        this.todoTag = document.getElementById('todo-list');
        this.todoInputTag = document.getElementById('new-todo');
        this.editInputTag;
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
        else if(event === 'readyToModify'){
            // 더블클릭 하면, view.input tag 불러오기
            self.todoTag.addEventListener('dblclick', function(event){
                var target = event.target;
                if(target.getAttribute('class') === 'title'){
                    var parentLiTag = target.closest('.todo-item');
                    parentLiTag.classList.add('editing');

                    self.template.editingTemplate.value = target.innerHTML;
                    parentLiTag.insertBefore(self.template.editingTemplate, null);
                    
                    self.editInputTag = parentLiTag.querySelector('.edit');
                    self.editInputTag.focus();
                    handler();
                }
            });
        }
        else if(event === 'blurModify'){

            var makeOriginDisplay = function(event){
                var target = event.target;
                if(target.getAttribute('class') === 'edit'){
                    var title = target.value || '';
                    var id = self._getItemId(target, 'todo-item') || '';
                    // 자기자신을 삭제해야함.
                    
                    self.editInputTag.removeEventListener('blur', makeOriginDisplay);

                    handler({id:id, title: title});
                }
            }

            self.editInputTag.addEventListener('blur', makeOriginDisplay);
        }
        else if(event === 'focusOutModify'){
            // var modifyInputTag = self.todoTag.querySelector('.edit');
            self.todoTag.addEventListener('focusout', function(event){
                // event.stopPropagation();
                var target = event.target;
                if(target.getAttribute('class') === 'edit'){
                    var title = target.value || '';
                    var id = self._getItemId(target, 'todo-item') || '';
                    handler({id:id, title: title});
                }
            });
        } 
        else if(event === 'completeToModify'){
            self.todoTag.addEventListener('keypress', function(event){
                var target = event.target;
                if(event.keyCode == 13){
                    target.blur();
                    // id값, title 컨텐츠 가져오기
                    // var title = target.value;
                    // var id = self._getItemId(target, 'todo-item') || '';
                    // handler({id:id, title: title});
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
                self._toggleItem(data.id, data.completed);
            },
            completeToUpdate: function(){
                self._updateItem(data.id, data.title);
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

    View.prototype._toggleItem = function(id, completed){
        var todoElement = this._getElementById(id);
        var checkBox    = todoElement.querySelector('.toggle');

        checkBox.checked = completed;

        if(completed === true){
            todoElement.classList.add('completed');
        } else {
            todoElement.classList.remove('completed');
        }
    }
    
    View.prototype._updateItem = function(id, title){
        var todoElement = this._getElementById(id);

        todoElement.classList.remove('editing');
        todoElement.querySelector('input.edit').remove();
        todoElement.querySelector('label.title').innerHTML = title;
    }

    exports.app = exports.app || {};
    exports.app.View = View;
})(this);