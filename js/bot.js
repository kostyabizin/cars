var showLoading = localStorage.getItem('showLoading') || true
var robotWrap = $('.js-bot-wrap');
var robotSpeach = $('.js-bot-speach');
var robotWait = robotWrap.find('[class*="wait_"]');
var robotTalk = robotWrap.find('[class*="talk_"]');
var robotThink = robotWrap.find('[class*="think_"]');
var robotSmile = robotWrap.find('[class*="smile_"]');
var robotLove = robotWrap.find('[class*="love_"]');
var robotLol = robotWrap.find('[class*="lol_"]');
var robotHello = robotWrap.find('[class*="hello_"]');
var robotLoad = robotWrap.find('[class*="load_"]');
var robotStandby = robotWrap.find('[class*="standby_"]');

if ($('.s-bot').length) {
var sBotTop = Math.round(Math.floor($('.s-bot').offset().top / 100)*100)
}

robotWrap.addClass('loaded')

function robotLoding() {
    var num = 0
    if (showLoading === true) {
        robotLoad.css({'opacity': '1'})
        var _interval = setInterval(function(){
            if (num > robotLoad.length) {
                clearInterval(_interval)
                robotGreeting()
                localStorage.setItem('showLoading', false)
                return
            }
            $(robotLoad[num]).css({'opacity': '0'})
            num++
        }, 200) 
    } else {
        robotStandbying()
    }
  
}

function robotGreeting() {
    var num = robotHello.length
    var _interval = setInterval(function(){
        if (num < 0) {
            clearInterval(_interval)
            setTimeout(robotStandbying, 200)
            return
        }
        $(robotHello[num]).css({'opacity': '1'})
        num--
    }, 300)
}

function robotStandbying() {
    $(robotHello).css({'opacity': '0'})
    robotStandby.css({'opacity': '1'})
}

function robotsAction(action, timing, delay) {
    robotStandby.css({'opacity': '0'})
    var num = action.length - 1
    var _numPrev = num
    var actionName = action.parents('.js-action-wrap').data('action')

    robotStandby.css({'opacity': '0'})
    $(action[num]).css({'opacity': '1'})

    robotSpeach.fadeIn(200)

    var _interval = setInterval(function(){
        if (num < 0) {
            clearInterval(_interval)
            robotStandbying()
            $(action).css({'opacity': '0'})
            return
        }
        if( num != _numPrev) {
            $(action[_numPrev]).css({'opacity': '0'})
        }

        $(action[num]).css({'opacity': '1'})
        _numPrev = num
        num--

       
    }, timing)

    if (actionName === 'wait') {
        setTimeout(() => {
            robotsAction(robotTalk, 200)
        }, 4500)
    } else if (actionName === 'talk') {
        setTimeout(() => {
            robotsAction(robotThink, 1200)
        }, 4000)
    } else if (actionName === 'think') {
        setTimeout(() => {
            robotsAction(robotSmile, 1200)
        }, 3750)
    } else if (actionName === 'smile') {
        setTimeout(() => {
            robotsAction(robotLove, 1200)
        }, 3750)
    } else if (actionName === 'love') {
        setTimeout(() => {
            robotsAction(robotLol, 1200)
        }, 3750)
    } else if (actionName === 'lol') {
        setTimeout(() => {
            robotsAction(robotWait, 200)
        }, 4500)
    }
}



$(function() {
    robotLoding()
    if (showLoading === true) {
        setTimeout(() => {
            robotsAction(robotWait, 200)
        }, 7000)
    } else {
        setTimeout(() => {
            robotsAction(robotWait, 200)
        }, 1500)
    }

})
