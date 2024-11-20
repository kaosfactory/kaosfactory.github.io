(function (window, document, Aeris) {

    var $ = Aeris.utils.$;




    // add a search bloc
    var searchTarget = $('#wxblox-search');
    if (searchTarget.length > 0) {
        var search = new Aeris.wxblox.views.PlaceSearch(searchTarget, {});
        search.on('select', function (e) {
            var p = e.data.place;
            var url = linkPrefix + '/kaos-wx.html?lat=';
            url += p.place.name.toLowerCase() + ',';
            if (p.place.state) {
                url += p.place.state.toLowerCase() + ',';
            }
            url += p.place.country.toLowerCase();

            window.location.href = url;
        });


        $('#wxblox-search form').on('submit', function (e) {
            e.preventDefault();
            return false;
        });


    }





}(window, document, aeris));