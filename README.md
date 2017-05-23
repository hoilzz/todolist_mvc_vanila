# To do List with MVC

Javascript 이론 공부 후, MVC 패턴을 이용한 구현 연습에 To Do List 만한게 없다고 생각하여 만들어보았다.

```
npm install -g http-server
http-server -a 0.0.0.0 -p 3000
```

## 전체 구조

`app.js`를 통해 todolist MVC 구조를 나타내는 코드를 통해 구조를 알 수 있다.

*app.js*
```javascript
(function(){
    'use strict';
    function App(){
        this.storage = new app.Storage("test9");
        this.model   = new app.Model(this.storage);
        this.template = new app.Template();
        this.view = new app.View(this.template);
        this.controller = new app.Controller(this.model, this.view);
    }
    var todoListApp = new App();
})();
```

## day1

[item list에 추가하기](https://github.com/seaunseen/todolist_mvc_vanila/tree/master/day1)

## day2

[X버튼 누르면 할 일 삭제하기](https://github.com/seaunseen/todolist_mvc_vanila/tree/master/day2)

## day3

[item 완료 체크 toggle](https://github.com/seaunseen/todolist_mvc_vanila/tree/master/day3)

## day4

[item 내용 수정하기](https://github.com/seaunseen/todolist_mvc_vanila/tree/master/day4)

## day5

완료된 todo 삭제하기


