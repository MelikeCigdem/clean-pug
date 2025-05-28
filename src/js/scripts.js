$(() => {
    $('.news-side').width($('.news-side-wrapper').width());
    $(window).on('resize', function () {
        $('.news-side').width($('.news-side-wrapper').width());
        $(window).trigger('scroll');
    });
    $(window).trigger('resize');
    var scrolOld = $(window).scrollTop();

    $(window).on('scroll', function () {
        var scrlTop = $(window).scrollTop();

        var scrlBottom = scrlTop + $(window).height();

        if (scrlTop > 60) {
            $('.side-adverse-wrapper').css('top', 15);
        } else {
            $('.side-adverse-wrapper').css('top', 116 - scrlTop);
        }

        if (scrlTop == 0 || $('.news-side').length <= 0) {
            return;
        }

        $('.news-content').each(function (a, item) {
            var newsSide = $(item).find('.news-side');
            var newsTop = $(item).find('.news-detail').offset().top;
            var newsBot = $(item).find('.news-detail').offset().top + $(item).find('.news-detail').outerHeight();
            var newsHeight = $(item).find('.news-detail').height();
            var sideHeight = newsSide.height();
            var sideTop = newsSide.offset().top;
            var sideBottom = newsSide.offset().top + newsSide.height();
            if (sideHeight > newsHeight - 10) {
                return;
            }

            if (scrlTop < newsTop) {
                newsSide.css('top', '');
                newsSide.css('bottom', '');
                newsSide.css('position', 'relative');
                return;
            }
            if (scrlBottom > newsBot) {
                newsSide.css('top', ((newsBot - sideHeight) - $(item).find('.news-side-wrapper').offset().top));
                newsSide.css('bottom', '');
                newsSide.css('position', 'relative');
                return;
            }

            var t = true;
            if (scrlBottom + 5 > sideBottom && scrolOld < scrlTop) {
                newsSide.css('position', 'fixed');
                newsSide.css('bottom', 15);
                newsSide.css('top', '');
                t = false;
            }

            if (scrlTop - 5 < sideTop && scrolOld > scrlTop) {
                newsSide.css('position', 'fixed');
                newsSide.css('bottom', '');
                newsSide.css('top', 0);
                t = false;
            }


            if (t) {
                if (newsSide.css('position') != "relative") {
                    var top = newsSide.offset().top - $(item).find('.news-side-wrapper').offset().top;
                    newsSide.css('top', top);
                    newsSide.css('position', 'relative');
                }
            }
        });
        scrolOld = scrlTop;
    });
    $(window).trigger('scroll');


    var menuBusy = false;
    $('.mobile-close,.main-wrapper').on('click', function (e) {
        if ($('.mobile-menu-wrapper').hasClass('d-none')) {
            return;
        }
        e.preventDefault();
        if ($(e.target).hasClass('icon-hamburger') || $(e.target).hasClass('nav-hmb-menu') || menuBusy) {
            return;
        }
        menuBusy = true;
        $('.mobile-menu-wrapper').css('transform', 'translateX(-100%)');
        $('.mobile-menu-wrapper').css('opacity', '0');
        setTimeout(() => {
            $('.mobile-menu-wrapper').addClass('d-none');
            $('.main-wrapper').removeClass('body-blured');
            menuBusy = false;
        }, 500);
    });

    $('.nav-hmb-menu').on('click', function () {
        if (menuBusy) {
            return;
        }
        menuBusy = true;
        $('.main-wrapper').addClass('body-blured');
        $('.mobile-menu-wrapper').removeClass('d-none');
        setTimeout(() => {
            $('.mobile-menu-wrapper').css('opacity', '1');
            $('.mobile-menu-wrapper').css('transform', 'translateX(0)');
            menuBusy = false;
        }, 25);
    });

    new Swiper('.slider-top-home', {
        //effect: 'fade',
        speed: 1,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            // renderBullet: function (index, className) {
            //     return '<span class="' + className + '">' + (index + 1) + "</span>";
            // }
        },
        navigation: {
            nextEl: ".slider-top-home .icon-chevron-compact-right",
            prevEl: ".slider-top-home .icon-chevron-compact-left"
        }
    });
    const currencySlider = new Swiper('.info-bar-currency', {
        direction: "vertical",
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        }
    });
    currencySlider.on('slideChange', function (a) {
        if (a.realIndex >= Math.ceil((a.slides.length - 1) / Math.floor($('.info-bar-currency').width() / $('.currency-bar').outerWidth()))) {
            a.slideTo(0);
        }
    });


    $(".slider-top-home .swiper-pagination span").on('mouseenter', function () {
        var swiper = $(this).parents('.swiper')[0].swiper;
        var e = $(this).index();
        swiper.slideTo(e + 1);
    });


    $(".slider-top-home .swiper-paginationHome li").on('mouseenter', function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    
        var swiper = $(this).parents('.swiper')[0].swiper;
        var e = $(this).index();
        swiper.slideTo(e + 1);
    });




    new Swiper('.sliderCenterHome', {
        //effect: 'fade',
        speed: 1,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            // renderBullet: function (index, className) {
            //     return '<span class="' + className + '">' + (index + 1) + "</span>";
            // }
        },
        navigation: {
            nextEl: ".sliderCenterHome .icon-chevron-compact-right",
            prevEl: ".sliderCenterHome .icon-chevron-compact-left"
        }
    });
   
    $(".sliderCenterHome .swiper-pagination span").on('mouseenter', function () {
        var swiper = $(this).parents('.swiper')[0].swiper;
        var e = $(this).index();
        swiper.slideTo(e + 1);
    });


    $(".sliderCenterHome .swiper-paginationHome li").on('mouseenter', function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    
        var swiper = $(this).parents('.swiper')[0].swiper;
        var e = $(this).index();
        swiper.slideTo(e + 1);
    });


    new Swiper('.slider-category-home', {
        //effect: 'fade',
        speed: 1,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + "</span>";
            }
        },
        navigation: {
            nextEl: ".slider-category-home .icon-chevron-compact-right",
            prevEl: ".slider-category-home .icon-chevron-compact-left"
        }
    });



    $(".slider-category-home .swiper-pagination span").on('mouseenter', function () {
        var swiper = $(this).parents('.swiper')[0].swiper;
        var e = $(this).index();
        swiper.slideTo(e + 1);
    });




    

    new Swiper('.slider-top-right', {
        //effect: 'fade',
        speed: 1,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            // renderBullet: function (index, className) {
            //     return '<span class="' + className + '">' + (index + 1) + "</span>";
            // }
        },
        navigation: {
            nextEl: ".slider-top-right .icon-chevron-compact-right",
            prevEl: ".slider-top-right .icon-chevron-compact-left"
        }
    });



    var countdown = new Date('0 ' + $('#countTime').html());
    setInterval(() => {
        countdown = new Date(countdown - 1000);
        $('#countTime').text(("0" + countdown.getHours()).slice(-2) + ":"
            + ("0" + countdown.getMinutes()).slice(-2) + ":"
            + ("0" + countdown.getSeconds()).slice(-2));
    }, 1000);


    $('body').on('click', function (e) {
        if ($(e.target).hasClass('search-btn') && $('#serachInput').val().length > 0)
            $('#searchForm').trigger('submit');

        if ($(e.target).parents('.search-area').length == 0)
            $('.search-input').removeClass('active');
    });

    $('.search-btn').on('click', function () {
        $('.search-input').toggleClass('active');
    });

    var lazyLoadInstance = new LazyLoad({});

    if (typeof Typed != "undefined" && $('.hotnews-data .hotnews-item').length > 0) {

        var items = [];
        $('.hotnews-data .hotnews-item').each(function (a, item) {
            items.push($(item).html());
        });

        new Typed('.hotnews-content', {
            strings: items,
            typeSpeed: 15,
            backSpeed: 5,
            loop: true,
            backDelay: 3000
        });

    }

});


