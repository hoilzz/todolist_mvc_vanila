# day5

완료된 todo 삭제하기

`clear complete` 버튼을 클릭하면 완료된 todo 모두 삭제한다.

1. 모델에서 완료된 todo 찾기 위해 query 옵션을 인자로 전달하여 Storage 함수 호출
2. Storage에서 query옵션 대로 찾은 배열 반환
3. 반환된 배열에 대해 각각 `Controller.removeItem(id)` 호출
  - `removeItem(id)`은 기존에 `X` 버튼 누를 때 해당 todo 삭제되는 함수


## 회고

1. 조건에 맞는 todo 가져오기

*Model.js*
```javascript
Model.prototype.read = function(callback){
  this.storage.findAll(callback);
}
```

*Storage.js*
```javascript
Storage.prototype.findAll = function(callback){
  callback(JSON.parse(localStorage[this._dbName]).todos);
}
```

완료된 todo를 삭제해야한다. 즉 완료라는 `조건`이 생겼다.
`query`라는 인수를 추가하여 쿼리에 맞는 Storage 함수를 호출하자.

먼저,
`Model`에서 `read(query, callback)`으로 수정한다.
또한, `Storage`의 `find(query, callback)`를 새로 생성한다.
`query`는 다음 조건에 따라 달라진다.

  - `query`가 함수인 경우, 즉 쿼리가 없는 경우(=콜백함수만 있는경우) 기존의 `storage.findAll()`을 호출한다.
  - `query`가 string or number 인경우 id로 인식하여 storage.find({id:id}, callbackFunction)을 호출한다. 
  - 위의 경우가 아닌 경우 `query`는 객체일텐데, 예를 들어 `{completed: 'true'}`다. 

*Model.js*
```javascript
 Model.prototype.read = function(query, callback){
        var queryType = typeof query;
        callback = callback || function(){};
        // query가 함수타입이면 그대로 findAll 이용 후, callback 실행.
        if(queryType === 'function'){
            callback = query;
            return this.storage.findAll(callback);
        } 
        // query가 id면 find(id) 호출 후, callback 실행
        else if(queryType === 'string' || queryType === 'number'){
            query = parseInt(query, 10);
            this.storage.find({id:query}, callback);
        } 
        else {
            this.storage.find(query, callback);
        }
    };
```

`findAll`은 데이터 전부를 요청한다.
`find(query)`는 query에 맞는 데이터만 가져온다.

*Storage.js*
```javascript
Storage.prototype.findAll = function(callback){
      // callback이 없으면 찾은 데이터 return
      if (callback === undefined){
          return JSON.parse(localStorage[this._dbName]).todos;
      } 
      // callback이 있으면 데이터를 콜백 파라미터로 전달.
      else{
          callback(JSON.parse(localStorage[this._dbName]).todos);
      }
  }

  Storage.prototype.find = function(query, callback){
      if(!callback){
          return ;
      }
      var todos = JSON.parse(localStorage[this._dbName]).todos;
      // filter 기준에 맞는 얘만 callback 실행.
      callback.call(this, todos.filter(function(todo){
          for(var q in query){
              if(query[q] !== todo[q]){
                  return false;
              }
          }
          return true;
      }));
  };
```

> `Array.prototype.filter(callback[,thisArg])`는 제공된 callback함수의 테스트를 통과(true)하는 요소들을 가진 새로운 배열을 만든다.

```javascript
var arr = [1,2,50,100];
var new_arr = arr.filter(callback(element, idx){
  if(element > 10) return true;
  else return false;
});

// new_arr = [50,100];
```