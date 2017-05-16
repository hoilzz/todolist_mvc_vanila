/*
    화면에 데이터를 그리는 역할 수행. 
    Template을 인자로 받아 자신의 프로퍼티에 추가
    생성자 함수에 조작해야 할 Element를 저장해둔다.
    
    그리고 Controller와 binding되어, 레코드의 변경을 바로바로 화면에 렌더링하는 역할을 한다.
    이번에는 controller에 이벤트를 등록하지 않고 view에서 이벤트를 등록할 것이다.
    화면을 구성하고 있는 요소는 view에서 접근할 수 있어야 mvc의 역할 구분이 명확해지기 때문이다.
*/
(function (exports){
    'use strict';
    function View(template){
        console.log('view created');
        this.template = template;
        
        // template로부터 전달받는 view를 추가시킬 ul tag와 값을 입력할 input tag를 caching
        this.$todoList = document.getElementById('todo-list'); // ul tag
        this.$newTodo  = document.getElementById('new-todo'); // input tag
    }

    //
    View.prototype.bind = function(event, handler){
        var self = this;

        // event: newTodo
        // handler: controller.addItem
        if(event === 'newTodo'){
            console.log('View.bind.newTodo execute!');
            var temp = self.$newTodo;
            temp.addEventListener('change', function(){
                handler(self.$newTodo.value); // addItem(self.$newTodo.value);
            });
        }
    };

    /*
        render 메서드는 수많은 함수들이 추가될 것이다.
        그 함수들은 인자로 넘겨받은 viewCmd를 통해서 실행된다.
        render 메서드는 어떠한 함수를 실행시킬 것인가에 대한 값(viewCmd)과, data를 인자로 넘겨받는다.
        이 data 또한 Storage에서 받은 배열 data다.
        showEntries()는 view에 private(실제론 no private)으로 설정된 addItem메서드를 실행
    */
    View.prototype.render = function(viewCmd, data){
        var self = this;
        var viewCommands = {
            // 파라미터의 data : storage에 있는 모든 data. 모든 데이터를 출력하는 메서드
            showEntries: function(){
                console.log('View.render.showentries execute!');
                self._addItem(parameter);
            },
            // 입력을 마치고 나면 input tag 안을 비워주는 역할을 하는 메서드
            clearNewTodo: function(){
                console.log('View.render.clearNewTodo execute!');
                self.$newTodo.value = '';
            }
        };
        viewCommands[viewCmd]();
    };

    // 프린팅 작업
    // innerHTML 메서드를 이용하여 template.js를 통해 data가 삽입된 html 조각 삽입
    View.prototype._addItem = function(id){
        this.$todoList.innerHTML = this.template.insert(id);
    }

    exports.app = exports.app || {};
    exports.app.View = View;
})(this);

