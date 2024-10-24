(function (window, document, Aeris) {

    var $ = Aeris.utils.$;

    // update the links path
    Aeris.wxblox.config.set('links.loc', function (data) {
        var place = data.place;
        return (place.state) ? place.country + '/' + place.state + '/' + place.name : place.country + '/' + place.name;
    });
    Aeris.wxblox.config.set('links.local.main', linkPrefix + '/local/{{loc}}');

    // update some map regions
    Aeris.utils.regions.set('aus', {
        name: 'Australia',
        bounds: {
            north: -0.18,
            west: 107.05 - 360,
            south: -50.01,
            east: 184.22 - 360
        }
    });

    // update some map regions
    Aeris.utils.regions.set('au', {
        name: 'Australia',
        bounds: {
            north: -0.18,
            west: 107.05 - 360,
            south: -50.01,
            east: 184.22 - 360
        }
    });

    // update some map regions
    Aeris.utils.regions.set('nas', {
        name: 'Northern Asia',
        bounds: {
            north: 81.09,
            west: 24.61 - 360,
            south: 22.27,
            east: 189.84 - 360
        }
    });



    // update some map regions
    Aeris.utils.regions.set('asia', {
        name: 'Asia',
        bounds: {
            north: 78.06,
            west: 12.66 - 360,
            south: -14.94,
            east: 206.02 - 360
        }
    });


    // add a search bloc
    var searchTarget = $('#wxblox-search');
    if (searchTarget.length > 0) {
        var search = new Aeris.wxblox.views.PlaceSearch(searchTarget, {});
        search.on('select', function (e) {
            var p = e.data.place;
            var url = linkPrefix + '/local/';
            url += p.place.country.toLowerCase() + '/';
            if (p.place.state) {
                url += p.place.state.toLowerCase() + '/';
            }
            url += p.place.name.toLowerCase();

            window.location.href = url;
        });


        $('#wxblox-search form').on('submit', function (e) {
            e.preventDefault();
            return false;
        });


    }


    // mobile navigation
    var mobileNavTarget = $('.nav-main-mobile select');
    if (mobileNavTarget.length > 0) {
        mobileNavTarget.on('change', function (e) {
            document.location.href = $(this).val();
        });
    }


});