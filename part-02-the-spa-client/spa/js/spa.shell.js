/*
 * spa.shell.js
 * SPA용 셸 모듈
 */

/*jslint            browser : true, continue  : true,
  devel   : true,   indent  : 2,    maxerr    : 50,
  newcap  : true,   nomen   : true, plusplus  : true,
  regexp  : true,   sloppy  : true, vars      : false,
  white   : true
*/
/* 전역 변수, spa */

spa.shell = (function() {
    //--------------- 모듈 스코프 변수 시작 ------------------ spa.shell 전역에서 사용할 변수 선언
    var
        configMap = { // 정적 설정 값 추가
            main_html: String()
            + '<div class="spa-shell-head">'
                + '<div class="spa-shell-head-logo"></div>'
                + '<div class="spa-shell-head-acct"></div>'
                + '<div class="spa-shell-head-search"></div>'
            + '</div>'
            + '<div class="spa-shell-main">'
                + '<div class="spa-shell-main-nav"></div>'
                + '<div class="spa-shell-main-content"></div>'
            + '</div>'
            + '<div class="spa-shell-font"></div>'
            + '<div class="spa-shell-chat"></div>'
            + '<div class="spa-shell-modal"></div>',
            chat_extend_time: 1000,
            chat_retract_time: 300,
            chat_extend_height: 450,
            chat_retract_height: 15
        },
        stateMap = {container: null}, // 모듈 사이에 공유하는 동적 정보 추가
        jqueryMap = {}, // jQuery 컬렉션 객체 캐싱
        setJqueryMap, toggleChat, initModule; // 선언 먼저, 나중에 대입
    //----------- 모듈 스코프 변수 끝------------

    //----------- 유틸리티 메서드 시작 ------------ 페이지 엘리먼트와 상호작용하지 않는 함수만 보관
    //----------- 유틸리티 메서드 끝 ------------

    //----------- DOM 메서드 시작 ------------- 페이지 엘리먼트를 생성하고 조작하는 함수 보관
    // DOM 메서드 /setJqueryMap/ 시작
    setJqueryMap = function() { // jQuery 컬렉션 객체 캐싱하는 함수. jQuery의 문서 탐색 횟수를 줄여 성능 개선
        var container = stateMap.container;
        jqueryMap = {
            container: container,
            chat: container.querySelector('.spa-shell-chat')
        };
    };
    // DOM 메서드 /setJqueryMap/ 끝
    // DOM 메서드 /toggleChat/ 시작
    // 목적: 채팅 슬라이더영역을 열고 닫는다.
    // 인자:
    //  * do_extend - true면 열고, false면 닫는다.
    //  * callback - 애니메이션 종료 시점에 callback 함수를 실행한다.
    // 설정:
    //  * chat_extend_time, chat_retract_time
    //  * chat_extend_height, chat-retract_height
    // 반환값: boolean
    //  * true - 슬라이더 애니메이션이 실행된다.
    //  * false - 슬라이더 애니메이션이 실행되지 않는다.
    toggleChat = function(do_extend, callback) {
        var
            px_chat_ht = jqueryMap.chat.offsetHeight,
            is_open     = px_chat_ht === configMap.chat_extend_height,
            is_closed   = px_chat_ht === configMap.chat_retract_height,
            is_sliding  = ! is_open && ! is_closed;

        if(is_sliding) { // 슬라이드 중에는 함수를 종료
            return false;
        }

        // 채팅 슬라이더 확장 시작
        if(do_extend) {
            jqueryMap.chat.style.transitionDuration = configMap.chat_extend_time + 'ms';
            jqueryMap.chat.style.height = configMap.chat_extend_height + 'px';
            if(callback) {callback(jqueryMap.chat);}
            return true;
        }
        // 채팅 슬라이더 확장끝

        // 채팅 슬라이더 축소 시작
        jqueryMap.chat.style.transitionDuration = configMap.chat_retract_time + 'ms';
        jqueryMap.chat.style.height = configMap.chat_retract_height + 'px';
        if(callback) {callback(jqueryMap.chat);}
        return true;
        // 채팅 슬라이더 축소 끝
    };
    // DOM 메서드 /toggleChat/ 끝
    //----------- DOM 메서드 끝 -------------

    //----------- 이벤트 핸들러 시작 ------------- jQuery 이벤트 핸들러 함수 영역
    //----------- 이벤트 핸들러 끝 -------------

    //----------- public 메서드 시작 ------------- 외부로 노출하는 메서드 영역
    // public 메서드/initModule/ 시작
    initModule = function(container) { // 모듈을 초기화하는 메서드
        // HTML을 로드한 후 jQuery 컬렉션 객체를 매핑한다.
        stateMap.container = container;
        container.innerHTML = configMap.main_html;
        setJqueryMap();

        // 토글 테스트
        setTimeout(function() {toggleChat(true);}, 3000);
        setTimeout(function() {toggleChat(false);}, 8000);
    };
    // public 메서드/initModule/ 끝
    return {initModule: initModule}; // 공개 메서드를 맵에 넣어 반환
    //----------- public 메서드 끝 -------------
}());