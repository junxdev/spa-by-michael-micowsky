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
            + '<div class="spa-shell-modal"></div>'
        }
        stateMap = {container: null}, // 모듈 사이에 공유하는 동적 정보 추가
        jqueryMap = {}, // jQuery 컬렉션 객체 캐싱
        setJqueryMap, initModule; // 선언 먼저, 나중에 대입
    //----------- 모듈 스코프 변수 끝------------

    //----------- 유틸리티 메서드 시작 ------------ 페이지 엘리먼트와 상호작용하지 않는 함수만 보관
    //----------- 유틸리티 메서드 끝 ------------

    //----------- DOM 메서드 시작 ------------- 페이지 엘리먼트를 생성하고 조작하는 함수 보관
    // DOM 메서드 /setJqueryMap/ 시작
    setJqueryMap = function() { // jQuery 컬렉션 객체 캐싱하는 함수. jQuery의 문서 탐색 횟수를 줄여 성능 개선
        var container = stateMap.container;
        jqueryMap = {container: container};
    };
    // DOM 메서드 /setJqueryMap/ 끝
    //----------- DOM 메서드 끝 -------------

    //----------- 이벤트 핸들러 시작 ------------- jQuery 이벤트 핸들러 함수 영역
    //----------- 이벤트 핸들러 끝 -------------

    //----------- public 메서드 시작 ------------- 외부로 노출하는 메서드 영역
    // public 메서드/initModule/ 시작
    initModule = function(container) { // 모듈을 초기화하는 메서드
        stateMap.container = container;
        container.innerHTML(configMap.main_html);
        setJqueryMap();
    }
    // public 메서드/initModule/ 끝
    return {initModule: initModule}; // 공개 메서드를 맵에 넣어 반환
    //----------- public 메서드 끝 -------------
}());