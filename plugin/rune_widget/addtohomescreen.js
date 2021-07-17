var $H = {
    /*
     * icon image
     */
    sIconImage : '',

    /*
     * naver app url
     */
    sApiUrl : '',

    /*
     * mall name
     */
    sMallName : '',

    /*
     * init
     */
    init : function ()
    {
        // validate
        if (this.validate() === false) return;

        // run
        this.run();
    },

    /*
     * validate
     */
    validate : function ()
    {
        var sAgent = navigator.userAgent,
            sWindowType = "win16|win32|win64|mac";

        try {
            if (sWindowType.indexOf(navigator.platform.toLowerCase()) === -1) {
                if (sAgent.match(/iPhone|iPad/i) !== null) {
                    alert("아이폰, 아이패드는 단말기 제한에 따라 홈 화면에 직접 추가하셔야 합니다.");
                    return false;
                } else if (sAgent.indexOf('Android') == -1) {
                    alert("안드로이드 기기서만 지원되는 기능입니다.");
                    return false;
                }
            } else {
                alert("모바일 기기에서만 지원되는 기능입니다.");
                return false;
            }
        } catch(e) {}

        return true;
    },

    /*
     * set intent
     */
    setIntent : function ()
    {
        var aParam = [],
            aApiParam = [];

        aParam.push('?url=' + encodeURIComponent(this.getRequestUrl()));
        aParam.push('&icon=' + encodeURIComponent(this.sIconImage));
        aParam.push('&title=' + encodeURIComponent(this.sMallName));

        aApiParam.push( 'intent://addshortcut' );
        aApiParam.push( aParam.join('') );
        aApiParam.push( '&serviceCode=nstore&version=7' );
        aApiParam.push( '#Intent;scheme=naversearchapp;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.nhn.android.search;end' );

        this.sApiUrl = aApiParam.join('');
    },

    /*
     * run
     */
    run : function ()
    {
        $H.sIconImage = 'https://atatmall.com/icon.png';
        $H.sMallName = 'SSDAL';
        $H.setIntent();
        $H.linkApp();
    },
    
    /*
     * run
     */
    getRequestUrl : function ()
    {
        var sUrl = location.href.split("//");

        return 'http://' + sUrl[1].substr(0,sUrl[1].indexOf("/"));
    },

    /*
     * link app
     */
    linkApp : function ()
    {
        var bInstall = window.confirm(
            "홈 화면에 아이콘을 추가합니다.\n" +
            "네이버앱이 없는 경우 [확인]버튼을 클릭하면\n" +
            "네이버앱 설치페이지로 이동됩니다."
        );

        if (bInstall === true) { document.location.replace(this.sApiUrl); }
    }
};