/*
 * 2.6.1 함수와 익명 함수
 */

 // 함수 선언
 function prison() {};
 
 // 함수 변수 저장
 var prison = function prison() {};
 
 // 익명 함수를 지역 변수에 저장
 var prison = function() {
     console.log('prison called');
 };
 
 // 호출 방식은 일반 함수와 동일
 prison();
 
 /*
  * 2.6.2 자기 실행 익명 함수
  * 전역에 선언한 함수는 접근이 쉽기 때문에 캡슐화 필요
  */
 
 var myApplication = function() {
     var private_variable = "private";
 }
 
 myApplication();
 
 // console.log(private_variable); is not defined
 
 // self-executing anonymous function
 (function() {
     var private_variable = "private";
 })();
 
 // console.log(private_variable); is not defined
 
 // console.log(local_var); // is not defined
 (function() {
     console.log(local_var); // undefined
     var local_var = 'Local variable!';
     console.log(local_var); // 'Local variable!'
 });
 // console.log(local_var); // is not defined
 
 (function(what_to_eat) {
     var sentence = 'I am going to eat a ' + what_to_eat;
     console.log(sentence);
 })('sandwich');

/*
 * 2.6.3 모듈 패턴 - private 변수 활용
 */

 var prison = (function() {
    var prisoner_name = 'Mike Mikowski',
        jail_term = '20 year term';
        return {
            prisoner: prisoner_name + ' - ' + jail_term,
            sentence: jail_term
        };
    })();
    
    console.log(prison.prisoner_name); // undefined
    console.log(prison.prisoner);
    console.log(prison.sentence);
    
    prison.jail_term = 'Sentence commuted'; // 이미 설정된 변수에 접근할 수 없어 변하지 않음
    console.log(prison.prisoner);
    
 var prison_2 = (function() {
     var prisoner_name = 'Mike Mikowski',
         jail_term = '20 year term';
     return {
         prisoner: function() {
             return prisoner_name + ' - ' + jail_term; // 함수의 사용으로 동적으로 접근 가능하기 때문에 GC가 메모리에서 변수를 제거하지 못함 -> Closer
         },
         setJailTerm: function(term) {
             jail_term = term; // 따라서 변수를 변경할 수 있음
         }
     };
 })();
 
 console.log(prison_2.prisoner());
 prison_2.setJailTerm('Sentence commuted');
 console.log(prison_2.prisoner());
 
 var makePrison = function(prisoner) {
     return function() {
         return prisoner;
     }
 };
 
 // 반환된 익명 함수가 인자를 참조하고 있으므로 클로저가 생성되고 클로저에 변수 저장
 var joshPrison = makePrison('Josh powell');
 var mikePrison = makePrison('Mike Mikowski');
 
 console.log(joshPrison());
 console.log(mikePrison());
 
 var prison_3 = {
     names: 'Mike Mikowsky and Josh Powell',
     who: function() {
         return this.names;
     }
 };
 console.log(prison_3.who);
 
//  var prison_ajax = {
//      names: 'Josh Powell and Mike Mikowsky',
//      who: function() {
//          var that = this;
//          httpRequest = new XMLHttpRequest();
//          httpRequest.onreadystatechange = function(data) {
//              if(httpRequest.readyState === XMLHttpRequest.DONE) {
//                  if(httpRequest.status === 200) {
//                      console.log(that.names); // 클로저 실행: 'Josh Powell and Mike Mikowsky'
//                      console.log(this.names); // undefined: XMLHttpRequest 객체에 없는 변수
//                  }
//              }
//          };
//          httpRequest.open('GET', '', true);
//          httpRequest.send();
//      }
//  };
//  prison_ajax.who(); // 비동기인 ajax의 호출 응답은 최초 실행 컨텍스트 밖에서 발생하므로 who()는 이미 실행을 마침

/*
 * 2.6.4 클로저
 */

 // 2.12 여러 개의 실행 컨텍스트 객체
 var curryLog, logHello, logStayinAlive, logGoodbye;
 curryLog = function(arg_text) {
     var log_it = function() {console.log(arg_text);}
     return log_it;
 };

 // 실행 컨텍스트에 대한 참조 생성
 logHello = curryLog('hello');
 logStayinAlive = curryLog('stayin alive!');
 logGoodbye = curryLog('goodbye');

 // 참조 없는 실행 컨텍스트 객체는 GC에 의해 제거될 수 있음
 curryLog('fred');

 logHello();
 logStayinAlive();
 logGoodbye();

 // 실행 컨텍스트 객체 삭제
 delete global.logHello;

 logHello();