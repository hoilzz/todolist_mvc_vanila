# To do List with MVC

## 1. 파일 모듈화, 의존성 관계 확립 

## 2. add item / list 추가하기

- list에 item을 생성해서 input tag에 입력한 값을 넣기
- list를 추가하는 것과 추가한 list를 포함하여 전에 포함된 list까지 보여주기

### 2.1

```
Storage.findAll -> Model.read -> Controller.showAll -> View.render[showEntries]
```

1. list에 추가될 html 코드 조각을 template화하자.

2. 파라미터로 넘겨 받은 data를 템플릿에 삽입하는 메서드 구현

3. 


### 2.2

1. template로부터 잔달받는 view를 추가시킬 ul과 input을 캐싱
2. bind 메서드 생성

발생하는 event에 따라 다른 함수를 실행시키게 된다. 
bind의 역할은 `이벤트를 추가하고`, `그 이벤트 핸들러를 실행시키는 역할`을 하게 된다.
Controller로부터 넘겨온 정보를 받고 그대로 수행만 하는 것이다.
Controller에서는 view에게 역할을 전달하기만 하고, 실질적인 이벤트 수행은 view에서 한다.
하지만 view에서의 이벤트 수행은 데이터를 다루는 수행이 아닌, 해당하는 값을 인자로 넘겨준다.
그럼 Controller에서는 넘겨받은 값을 Model 에게 전달하여 직접적인 데이터와의 연산을 위임.

