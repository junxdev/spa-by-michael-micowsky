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
            anchor_schema_map: { // uri anchor에서 유효성 검사에 사용할 맵
                chat: {open: true, close: true}
            },
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
            chat_retract_height: 15,
            chat_extended_title: 'Click to retract',
            chat_retracted_title: 'Click to extend'
        },
        stateMap = { // 모듈 사이에 공유하는 동적 정보 추가
            container: null,
            anchor_map: {}, // 현재 앵커 값을 저장
            is_chat_retracted : true
        },
        jqueryMap = {}, // jQuery 컬렉션 객체 캐싱
        copyAnchorMap, setJqueryMap, toggleChat, // 선언 먼저, 나중에 대입
        changeAnchorPart, onHashchange,
        onClickChat, initModule; 
    //----------- 모듈 스코프 변수 끝------------

    //----------- 유틸리티 메서드 시작 ------------ 페이지 엘리먼트와 상호작용하지 않는 함수만 보관
    // 연산 부담을 최소화하기 위해 저장된 앵커 맵의 복사본을 반환한다. 
    copyAnchorMap = function() {
        return JSON.parse(JSON.stringify(stateMap.anchor_map)); // deep clone
    };
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
    //      * do_extend - true면 열고, false면 닫는다.
    //      * callback - 애니메이션 종료 시점에 callback 함수를 실행한다.
    // 설정:
    //      * chat_extend_time, chat_retract_time
    //      * chat_extend_height, chat-retract_height
    // 반환값: boolean
    //      * true - 슬라이더 애니메이션이 실행된다.
    //      * false - 슬라이더 애니메이션이 실행되지 않는다.
    // 상태: stateMap.is_caht_retrated 값을 설정한다.
    //      * true - 슬라이더 축소
    //      * false - 슬라이더 확장
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
            jqueryMap.chat.setAttribute('title', configMap.chat_extended_title);
            stateMap.is_chat_retracted = false;
            if(callback) {callback(jqueryMap.chat);}
            return true;
        }
        // 채팅 슬라이더 확장끝

        // 채팅 슬라이더 축소 시작
        jqueryMap.chat.style.transitionDuration = configMap.chat_retract_time + 'ms';
        jqueryMap.chat.style.height = configMap.chat_retract_height + 'px';
        jqueryMap.chat.setAttribute('title', configMap.chat_retracted_title);
        stateMap.is_chat_retracted = true;
        if(callback) {callback(jqueryMap.chat);}
        return true;
        // 채팅 슬라이더 축소 끝
    };
    // DOM 메서드 /toggleChat/ 끝

    // DOM 메서드 /changeAnchorPart/ 시작
    // 목적: URI 앵커 컴포넌트의 일부 영역 변경
    // 인자:
    //      * arg_map - URI 앵커 중 변경할 부분을 나타내는 맵
    // 반환값: boolean
    //      * true - URI의 앵커 부분이 변경됨
    //      * false - URI의 앵커 부분이 변경되지 않음
    // 행동:
    //      현재 앵커는 stateMap.anchoe_map에 저장되어 있다
    //      인코딩 방식은 uriAnchor를 참고하자.
    //      이 메서드는
    //      * copyAnchorMap()을 사용해 이 맵을 복사한다.
    //      * arg_map을 사용해 키와 값을 수정한다.
    //      * 인코딩 과정에서 독립적인 값과 의존적인 값을 서로 구분한다.
    //      * uriAnchor를 활용해 URI 변경을 시도한다.
    //      * 성공 시 true, 실패 시 false를 반환한다.
    // 
    changeAnchorPart = function(arg_map) {
        var
            anchor_map_revise = copyAnchorMap(),
            bool_return = true,
            key_name, key_name_dep;

        // 변경 사항을 앵커 맵으로 합치는 작업 시작
        KEYVAL:
        for(key_name in arg_map) {
            if(arg_map.hasOwnProperty(key_name)) {

                // 반복 과정 중 의존적 키는 건너뜀
                if(key_name.indexOf('_') === 0) {continue KEYVAL;}
                
                // 독립적 키 값을 업데이트
                anchor_map_revise[key_name] = arg_map[key_name];
                
                // 대응되는 의존적 키를 업데이트
                key_name_dep = '_' + key_name;
                if(arg_map[key_name_dep]) {
                    anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
                } else {
                    delete anchor_map_revise[key_name_dep];
                    delete anchor_map_revise['_s' + key_name_dep];
                }
            }
        }
        // 앵커 맵으로 변경 사항 병합 작업 끝

        // URI 업데이트 시도. 작업 실패 시 원래대로 복원
        try {
            $.uriAnchor.setAnchor(anchor_map_revise);
        } catch (error) {
            // URI를 기존 상태로 대체
            $.uriAnchor.setAnchor(stateMap.anchor_map, null, true);
            bool_return = false;
        }
        // URI 업데이트 시도 끝
        return bool_return;
    };
    // DOM 메서드 /changeAnchorPart/ 끝

    //----------- DOM 메서드 끝 -------------

    //----------- 이벤트 핸들러 시작 ------------- jQuery 이벤트 핸들러 함수 영역
    // 이벤트 핸들러 /onHashChange/ 시작
    // 목적: hashcnage 이벤트의 처리
    // 인자:
    //      * event - jQuery 이벤트 객체
    // 설정: 없음
    // 반환값: false
    // 행동:
    //      * URI 앵커 컴포넌트를 파싱
    //      * 새로운 어플리케이션 상태를 현재 상태와 비교
    //      * 현재 상태와 다를 때만 어플리케이션의 상태를 변경
    // 
    onHashchange = function(event) {
        var
            anchor_map_previous = copyAnchorMap(),
            anchor_map_proposed,
            _s_chat_previous, _s_chat_proposed,
            s_chat_proposed;

        // 앵커 파싱을 시도
        try {anchor_map_proposed = $.uriAnchor.makeAnchorMap();}
        catch(error) {
            $.uriAnchor.setAnchor(anchor_map_previous, null, true);
            return false;
        }
        stateMap.anchor_map = anchor_map_proposed;

        // 편의 변수
        _s_chat_previous = anchor_map_previous._s_chat;
        _s_chat_proposed = anchor_map_proposed._s_chat;

        // 변경된 경우 채팅 컴포넌트 조정 시작
        if(!anchor_map_previous || _s_chat_previous !== _s_chat_proposed) {
            s_chat_proposed = anchor_map_proposed.chat;
            switch(s_chat_proposed) {
                case 'open':
                    toggleChat(true);
                    break;
                case 'closed':
                    toggleChat(false);
                    break;
                default:
                    toggleChat(false);
                    delete anchor_map_proposed.chat;
                    $.uriAnchor.setAnchor(anchor_map_proposed, null, true)
            }
        }
        // 변경된 경우 채팅 컴포넌트 조정 끝

        return false;
    }
    // 이벤트 핸들러 /onHashChange/ 끝

    // 이벤트 핸들러 /onClickChat/ 시작 (앵커의 chat 파라미터만 변경하게끔 수정)
    onClickChat = function(event) {
        changeAnchorPart({
            chat: (stateMap.is_chat_retracted ? 'open' : 'closed')
        });
        return false;
    };
    // 이벤트 핸들러 /onClickChat/ 끝
    //----------- 이벤트 핸들러 끝 -------------

    //----------- public 메서드 시작 ------------- 외부로 노출하는 메서드 영역
    // public 메서드/initModule/ 시작
    initModule = function(container) { // 모듈을 초기화하는 메서드
        // HTML을 로드한 후 jQuery 컬렉션 객체를 매핑한다.
        stateMap.container = container;
        container.innerHTML = configMap.main_html;
        setJqueryMap();

        // 채팅 슬라이더 초기화 및 클릭 핸들러 바인딩
        stateMap.is_chat_retracted = true;
        jqueryMap.chat.setAttribute('title', configMap.chat_retracted_title);
        jqueryMap.chat.onclick = onClickChat;

        // 우리 스키마를 사용하게끔 uriAnchor를 변경
        $.uriAnchor.configModule({
            schema_map: configMap.anchor_schema_map
        });
        // URI 앵커 변경 이벤트를 처리
        // 이 작업은 모든 기능 모듈이 설정 및 초기화된 후에 수행한다.
        // 이렇게 하지 않으면 페이지 로드 시점에 앵커를 판단하는 데 사용되는
        // 트리거 이벤트를 모듈에서 처리할 수 없게 된다.
        // 
        $(window)
            .bind('hashchange', onHashchange)
            .trigger('hashchange');
    };
    // public 메서드/initModule/ 끝
    return {initModule: initModule}; // 공개 메서드를 맵에 넣어 반환
    //----------- public 메서드 끝 -------------
}());