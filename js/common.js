var header = $('.header')
var sectionRoute = $('.js-section-animate');
var drpdwnList = $('.js-dropdown-list');
var msgBlock = $('.js-msg-block')
var blockScroll = localStorage.getItem('blockScroll') || true
var coordArray = {
    'cinema' : [[37.561526, 55.690643], [37.532196, 55.722355], [37.574615, 55.742494], [37.545716, 55.760520], [37.608652, 55.765716], [37.602139, 55.752369], [37.607718, 55.767220]],
    'literature' : [[37.624096, 55.735541], [37.627923, 55.737786], [37.608827, 55.752253], [37.607047, 55.763077], [37.626978, 55.772770], [37.689716, 55.779626], [37.619953, 55.829997]],
    'wish' : [[37.587254, 55.757460], [37.614410, 55.768076], [37.602023, 55.777155], [37.664464, 55.758934], [37.624957, 55.760135], [37.598564, 55.748584], [37.623986, 55.712289]],
    'music' : [[37.652732, 55.820845], [37.583329, 55.806737], [37.599786, 55.774477], [37.660620, 55.766795], [37.640821, 55.756726], [37.635979, 55.762237], [37.596687, 55.762991]],
    'art' : [[37.752580, 55.793374], [37.564805, 55.792690], [37.570276, 55.780370], [37.626079, 55.776730], [37.583535, 55.740694], [37.605768, 55.734643], [37.645708, 55.759157]],
    'nature' : [[37.531190, 55.667107], [37.487487, 55.745569], [37.431717, 55.777518], [37.630811, 55.832955], [37.763324, 55.792250], [37.633410, 55.729255], [37.625963, 55.736939]],
}

var map;

var slickOption = {
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
};


if (sectionRoute.length) {
    var sectionRouteTop = sectionRoute.offset().top;
    var sectionRouteHeight = sectionRoute.height();
    var isAnimated = false;
    var scrollNumEvent = false;
    var showMsgLength = 0;
}


function hideDrpdwnList() {
    drpdwnList.removeClass('opened').fadeOut(800)
    return
}

function showMsg() {
    var msgShowInterval = setInterval(() => {
        if (showMsgLength < messages.length) {
            msgBlock.append(messages[showMsgLength].html)
            showMsgLength++
        } else {
            var _rect = $('.s-bot__message-audio svg rect')
            var _num = 0
            var audioInterval = setInterval(() => {
                if (_num < _rect.length){
                    $(_rect[_num]).css({'opacity' : '1'})
                    _num++
                } else {
                    clearInterval(audioInterval)
                }
            }, 80)

            clearInterval(msgShowInterval)

        }
    }, 800);
}

function closeFaqBody(blockParent, blockBody, blockSlider) {
    blockBody.slideUp(800, function() {
        blockSlider.slick('unslick')
        var scrollTop = blockParent.offset().top - header.height();
        $('html, body').stop().animate({
            scrollTop: scrollTop
        }, 800, 'swing' )
        blockParent.removeClass('opened')
    })
}

function renderCard(blockParent) {
    var mapContainer = blockParent.find('.map-container')
    var _pageName = $('.s-faq').data('page');
    var _coordArray = coordArray[`${_pageName}`]
    var idx = blockParent.index()

    mapContainer.attr('id', `map${idx}`)

    map = new mapgl.Map(`map${idx}`, {
        center: _coordArray[idx],
        styleZoom: 16,
        key: '43468e9c-7a7d-4a11-8cd7-9147ef1b59d7',
        style: 'fc1f8993-f3d1-48ac-bc4a-01453d82ef4c',
    });

    marker = new mapgl.Marker(map, {
        coordinates: _coordArray[idx],
        icon: './images/icons/marker.png',
        size: [36, 45.5]
    });

   

}

function destroyMap() {
    map.destroy();
}

$(function() {
    MobNav.init({
        openBtn: '.js-open-menu',
        headerId: 'header',
        closeLink: 'a.js-anchor, a.js-open-popup'
    });
   
    try {
        Anchor.init('.js-anchor', 800, 0);
    } catch (error) {
        console.log(error);
    }

    try {
        Share.init('.js-share-btn');
    } catch (error) {
        console.log(error);
    }

   

    $('body')
        .on('click', function(event) {
            var _target = event.target
            var _parentTarget = $(_target).parents('.js-dropdown-block')

            !_parentTarget.length ? hideDrpdwnList() : false
        })
        .on('click', '.js-dropdown-btn', function() {
            if (drpdwnList.hasClass('opened')) {
                hideDrpdwnList()
            } else {
                drpdwnList.addClass('opened').fadeIn(600).css({'display':'flex'})
            }
        })
        .on('click', '.js-faq-item', function() {
            var _blockItem = $(this);
            var _blockBody = _blockItem.find('.js-faq-body')
            var _blockSlider = _blockItem.find('.js-slider');

            var openedBlocks = $('.js-faq-item.opened');
            var openedBlocksBody = openedBlocks.find('.js-faq-body');
            var openedBlocksSlider = openedBlocks.find('.js-slider');

            if (_blockItem.hasClass('opened')) {
                return
            } 

            if (openedBlocks.length) {
                openedBlocks.removeClass('opened')
                openedBlocksBody.slideUp(800)
                openedBlocksSlider.slick('unslick')
                destroyMap()
                
            }

            _blockItem.addClass('opened')
            _blockSlider.slick(slickOption)


            _blockBody.slideDown(800, function() {
                var scrollTop = _blockItem.offset().top - header.height();
                $('html, body').stop().animate({
                    scrollTop: scrollTop
                }, 800, 'swing' )
                renderCard(_blockItem)
            })
        })
        .on('click', '.js-faq-header', function() {
            var _blockHeader = $(this);
            var _blockParent = _blockHeader.parents('.js-faq-item');
            var _blockBody = _blockParent.find('.js-faq-body');
            var _blockSlider = _blockParent.find('.js-slider');

            if (!_blockParent.hasClass('opened')) {
                return
            } 
            destroyMap()
            closeFaqBody(_blockParent, _blockBody, _blockSlider)

        })
        .on('click', '.js-close-item', function() {
            var _closeBtn = $(this);
            var _blockParent = _closeBtn.parents('.js-faq-item');
            var _blockBody = _blockParent.find('.js-faq-body');
            var _blockSlider = _blockParent.find('.js-slider');

            destroyMap()
            closeFaqBody(_blockParent, _blockBody, _blockSlider)
        })
        .on('click', '.js-nav-point', function() {
            var _pointName = $(this)
            var _pointMarker = _pointName.parents('.js-marker')
            var _idx = _pointMarker.index()
            var _faqItem;
            var _slider;
            var scrollTop;

            $('.js-faq-item').removeClass('opened')
            $('.js-faq-body').hide()
            $('.slick-initialized').slick('unslick')

            if (_pointMarker.hasClass('s-points__flag')) {
                var _faqItem = $($('.js-faq-item').last())
            } else {
                var _faqItem = $($('.js-faq-item')[_idx])
            }
            
            scrollTop =_faqItem.offset().top - header.height();
            _faqItem.addClass('opened')
            _faqItem.find('.js-faq-body').slideDown()
            

            _slider = _faqItem.find('.js-slider')
            _slider.slick(slickOption)
            renderCard(_faqItem)


            $('html, body').stop().animate({
                scrollTop: scrollTop
            }, 400, 'swing' )
            
        })


    if (!isAnimated) {
        $(window).on('load scroll', function() {
            var offsetForStart = Math.floor(sectionRouteTop - (sectionRouteHeight/2))
            if (pageYOffset > offsetForStart) {
                sectionRoute.addClass('animated')
                isAnimated = true
                
                if (sectionRoute.attr('id') === 'bot-anchor' && !scrollNumEvent) {
                    scrollNumEvent = true
                    setTimeout(showMsg, 800)
                }
            }
            hideDrpdwnList()
        })
    } else {
        $('.js-section-animate').addClass('animated')
    }

    if ($('.js-faq-item').length) {
        var _firstBlockItem = $('.js-faq-item').first()
        var _bodyFirstBlockItem = _firstBlockItem.find('.js-faq-body')
        var _sliderFirstBlockItem = _firstBlockItem.find('.js-slider');

        _firstBlockItem.addClass('opened')
        _bodyFirstBlockItem.show()
        renderCard(_firstBlockItem)
        
        _sliderFirstBlockItem.slick({
            dots: false,
            arrows: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
        })
    }

    var pages = ['art', 'cinema', 'literature', 'music', 'nature', 'wish']
    function randomIntFunc(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    var randomInt = randomIntFunc(0, pages.length - 1);

   $('.js-random-link').attr('href', `https://citygid-template.demolucky.ru/${pages[randomInt]}.html`)


})
