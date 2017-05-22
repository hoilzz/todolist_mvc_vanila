# day4

item 내용 수정하기

todo를 `더블클릭`하면 텍스트를 수정할 수 있다.
엔터를 누르거나, `focus out(blur)`되면 가장 마지막에 입력한 텍스트로 수정된다. 

위 2가지 event에 대한 바인딩.

- 텍스트 수정하기

1. todo item `dbclick` -> handler
2. handler는 View 메서드를 통해 해당 item의 값을 가진 input 태그를 생성한다.

- 수정된 텍스트 반영하기

1. `keypress=enter` or `blur` -> handler
2. 해당 엘리먼트에서 `id`와 수정된 `value`를 controller에 전달.
3. controller에서 model.update(id,value) -> Storage.update(id, value)
4. 로컬스토리지에 반영 후, View에서 2가지를 수행한다.
  - 수정 입력을 위해 생성된 input 제거
  - todo item의 텍스트 값을 수정된 value로 변경



## 회고

1. Node와 Element 차이
2. 문자열은 Element가 아니다.

```javascript
var strElement = "<div></div>";
var element    = document.createElement('div');

element instanceof Element // true
strElement instanceof Element // false
```

당연한 거 같지만 막상 엘리먼트가 필요한 함수에 파라미터로 전달 할 때 헷갈렸다..
`document.createElement()`는 Element 객체를 반환한다.

3. event

키보드 입력에 대한 이벤트는 `keypress`다. keyCode로 특정 입력을 찾을 수 있다.
`blur`, `focusout`은 말 그대로 input과 같은 입력 박스에 대한 focus를 잃었을 때 발생한다. 
