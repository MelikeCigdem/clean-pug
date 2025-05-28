if ($("body").is(".infinite")) {
    var ajaxUrl = $(".infinite-main").data("ajaxurl");
    var type = $(".infinite-main").data("type");
    var category = $(".infinite-main").data("category");
    var preload = $(".infinite-main").data("preload");
    var count = $(".infinite-main").data("count");
    var nextPostUrl = $(".infinite-main").data("nextposturl");
    var totalPage = $(".infinite-item").length;

    var scrollPosition = 0;
    var windowHeight = $(window).height();
    var infiniteMainHeight = 0;
    var offsetTop = [];
    var infiniteOffset = 1000;
    var visible;
    var id = [];
    var fetchProgress = false;

    var analytics = function (url, title) {
        //   ga("send", {
        //     hitType: "pageview",
        //     title: title ? title : document.title,
        //     page: url ? url : location.pathname,
        //     location: location.href,
        //   });
    };

    var offsetFind = function () {
        offsetTop = [];
        $.each($(document).find(".infinite-item"), function () {
            offsetTop.push($(this).offset().top);
        });
    };
    offsetFind();

    var fetchData = function (url, fetchPreload) {
        fetch(url)
            .then(function (response) {
                return response.text();
            })
            .then(function (html) {
                if (html) {
                    $(".infinite-main").append(html);
                    var lazyLoadInstance = new LazyLoad({
                        // Your custom settings go here
                    });
                
                    offsetFind();
                    if (fetchPreload) {
                        var item = $(document).find(".infinite-item").eq(1);
                        analytics(item.data("pageurl"), item.find("h1").text());
                    }
                    $(".loader").css("visibility", "hidden");
                    fetchProgress = false;
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    };


    id.push($(document).find(".infinite-item").eq(0).data("id"));

    if (preload) {
        var item = $(document).find(".infinite-item").eq(0);
        var preloadId = item.data("nextid");
        id.push(item.data("nextid"));
        fetchData(
            ajaxUrl +
            "?type=" +
            type +
            "&category=" +
            category +
            "&id=" +
            preloadId +
            "&index=" +
            1,
            "true"
        );
    }

    $(window).on("scroll", function () {
        if (type == "gallery") {
            offsetFind();
        }
        infiniteMainHeight = $(".infinite-main").height();
        scrollPosition = $(window).scrollTop();
        var visibleValue = [];
        $.each(offsetTop, function (index, item) {
            if (windowHeight + scrollPosition > item + 50) {
                visibleValue.push(item);
            }
        });

        if (visibleValue.length > 0 && scrollPosition > 100) {
            var findVisible = Math.max.apply(null, visibleValue);
            var findIndex = visibleValue.indexOf(findVisible);
        } else {
            var findIndex = 0;
        }

        if (visible != findIndex) {
            visible = findIndex;
            var item = $(document).find(".infinite-item").eq(findIndex);
            var title = "";
            if (type == "news") {
                title = item.find("h1").text();
            } else {
                title = $("h1").text();
            }

            history.replaceState(null, null, item.data("pageurl"));
            if (title) {
                document.title = title;
            }

            if (findIndex != 0) {
                analytics(item.data("pageurl"), title && item.find("h1").text());
                //fetch(item.data("id"));
            }

            if (type == "gallery") {
                if (findIndex == totalPage - 1) {
                    setTimeout(function () {
                        window.location.href = nextPostUrl;
                    }, 10000);
                }
            }
        }


        if (type != "gallery") {
            if (
                windowHeight + scrollPosition + infiniteOffset > infiniteMainHeight &&
                !fetchProgress
            ) {
                var item = $(document).find(".infinite-item");
                var lastId = item.eq(item.length - 1).data("nextid");
                if (id.indexOf(lastId) == -1) {
                    fetchProgress = true;
                    $(".loader").css("visibility", "visible");
                    id.push(lastId);
                    fetchData(
                        ajaxUrl +
                        "?type=" +
                        type +
                        "&category=" +
                        category +
                        "&id=" +
                        lastId +
                        "&index=" +
                        item.length
                    );
                }
            }
        }
    });
}