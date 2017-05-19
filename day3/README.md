# day3

item 상태 수정하기

1. to do 체크하면
  - 이벤트 바인딩 
  
  Model
  - id값을 기준으로 해당 레코드 상태값 completed로 변경 
  View
  - 취소선
  - checked

2. db에서 showAll() 호출
  - 상태 구분해서 체크,취소선 상태로 dp


### 2.1 to do list 모두 보여주기

```
Model.read 
|-- Controller.showAll 
  |-- Model.read(callback===view.render)
    |-- Storage.findAll, call(view.render)
```



2. 파라미터로 넘겨 받은 data를 템플릿에 삽입하는 메서드 구현


### 2.2

1. template로부터 잔달받는 view를 추가시킬 ul과 input을 캐싱
2. bind 메서드 생성

발생하는 event에 따라 다른 함수를 실행시키게 된다. 
bind의 역할은 `이벤트를 추가하고`, `그 이벤트 핸들러를 실행시키는 역할`을 하게 된다.
Controller로부터 넘겨온 정보를 받고 그대로 수행만 하는 것이다.
Controller에서는 view에게 역할을 전달하기만 하고, 실질적인 이벤트 수행은 view에서 한다.
하지만 view에서의 이벤트 수행은 데이터를 다루는 수행이 아닌, 해당하는 값을 인자로 넘겨준다.
그럼 Controller에서는 넘겨받은 값을 Model 에게 전달하여 직접적인 데이터와의 연산을 위임.



##

## 회고

1. 콜백 헬