visualSearch = window.visualSearch || {};
visualSearch.ui = visualSearch.ui || {};

(function (namespace) {
    var unvCollection = {

        "rootUnv": {
            "investments": [
                { "name": "Abc Fund", "dataVendorId": "123", "dataVendorName": "PerTrac" },
                { "name": "123 Fund", "dataVendorId": "1343423", "dataVendorName": "PerTrac" },
                { "name": "Xyz Fund", "dataVendorId": "352", "dataVendorName": "PerTrac" }
            ],

            "displayName": "NEW ROOT UNIVERSE"
        },

        "childUnv1": {
            "investments"
            : [
                { "name": "Abc Fund", "dataVendorId": "123", "dataVendorName": "PerTrac" }               
            ],

            "displayName"
            : "NEW CHILD UNIVERSE",
            
            "parent": "rootUnv"
        },

        "childUnv2": {
            "investments"
            : [
                { "name": "123 Fund", "dataVendorId": "1343423", "dataVendorName": "PerTrac" },
                { "name": "Xyz Fund", "dataVendorId": "352", "dataVendorName": "PerTrac" }
            ],

            "displayName" : "NEW CHILD UNIVERSE 2",

            "parent": "rootUnv"
        }
    };

    namespace.initialize = function () {
        $('.StatBtn').click(toggleFilterMenuHandler);

        $('.ApplyBtn').click(applyFilterBtnClickHandler);

        $('.FilterOption').click(optionSelectedHandler);
    };

    namespace.unvSelectedHandler = function (unv) {
        unv = {};
        unv.unvId = "rootUnv";

        var fundList = unvCollection[unv.unvId].investments;
        var name = unvCollection[unv.unvId].displayName;
        var $unvTitle = $('.SelectedUnvTitle');

        $unvTitle.empty();
        $unvTitle.html(name);

        var $searchList = $('.SearchList');

        $searchList.empty();

        for (var i = 0; i < fundList.length; i++) {
            var searchListItemOpen = "<div class='SearchListItemWrapper'>", divClose = "</div>";

            var currentItem = searchListItemOpen + fundList[i].name + divClose;

            $searchList.append(currentItem);

            currentItem = "";
        }
    };

    var optionSelectedHandler = function () {
        var $this = $(this);

        var id = $this.attr('id');

        $('.FilterOption').removeClass("SelectedOption");

        $this.addClass("SelectedOption");
    };

    var toggleFilterMenuHandler = function () {
        $('.StatisticFilterMenuWrapper').fadeToggle('fast');
    };

    var applyFilterBtnClickHandler = function () {
        var filterConfig = {
            SearchUniverse: "STDDEV",
            filterType: "Greater"           
        };

        $.ajax({

            type: "POST",
            url: "http://someplace.com/api",
            data: {

                "SearchUniverse": {
                    "Investments": [

                        { "name": "Abc Fund", "dataVendorId": "123", "dataVendorName": "PerTrac" },
                        { "name": "123 Fund", "dataVendorId": "1343423", "dataVendorName": "PerTrac" },
                        { "name": "Xyz Fund", "dataVendorId": "352", "dataVendorName": "PerTrac" }

                    ]
                },

                "Stat": "StdDev"
            }

        }).done(searchSuccessCallback);
    };

    var searchSuccessCallback = function (data, textStatus, jqXHR) {
        var results = data.results;
        
        //results should be an array
        $.each(results, function (i, l) {
        });
    };
}(visualSearch.ui));

$(document).ready(function () {
    visualSearch.ui.initialize();
});