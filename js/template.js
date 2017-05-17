// Template 파일은 생성자 함수에 html 코드 조각을 담고 있을 것이다.
// View가 렌더링할 때 넘겨 받은 data인자로 html 코드 조각의 일부를 치환하여,
// 우리가 원하는 형식으로 입력한 데이터를 출력하는 일종의 템플릿 엔진을 수행.

(function(exports){
    'use strict';
    function Template(){
        console.log('template created');
        this.defaultTemplate = 
            '<li data-id="{{id}}" class="{{completed}}">' +
                '<div class="view">' +
                    '<input class="toggle" type="checkbox" {{checked}}>' +
                    '<label>{{title}}</label>' +
                    '<button class="destroy"></button>' +
                '</div>' +
            '</li>';
    }

    // data를 템플릿에 삽입할 메서드
    Template.prototype.insert = function(data){
        console.log('Template.insert method execute!');
        var view = '';
        for(var i=0; i<data.length; i++){
            var template = this.defaultTemplate;
            var completed = '';
            var checked = '';

            // data[i].complelted의 기본 값은 false다.
            if(data[i].completed){
                completed = 'completed';
                checked = 'che3cked';
            }

            template = template.replace('{{id}}', data[i].id);
            template = template.replace('{{title}}', data[i].title);
            template = template.replace('{{completed}}', completed);
            template = template.replace('{{checked}}', checked);

            view = view + template;
        }
        return view;
    }

    // exports 변수를 통해 외부로 노출시킨다.
    // 노출 시킬 때도 app이라는 namespace 안에 노출시킨다.
    exports.app = exports.app || {};
    exports.app.Template = Template;
})(this);


