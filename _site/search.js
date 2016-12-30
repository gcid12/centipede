/* global instantsearch */

var search = instantsearch({
  appId: 'L2FA7ZC6MO',
  apiKey: '3637c90fe243b0ab50187eb3243437c6',
  indexName: 'faq_entities',
  urlSync: {}
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#q'
  })
);

search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats'
  })
);

var hitTemplate2 =
  '<div class="hit media">' +
    '<div class="media-left">' +
      '<div class="media-object" style="background-image: url(\'{{image}}\');"></div>' +
    '</div>' +
    '<div class="media-body">' +
      '<h4 class="media-heading">{{{_highlightResult.name.value}}} {{#stars}}<span class="ais-star-rating--star{{^.}}__empty{{/.}}"></span>{{/stars}}</h4>' +
      '<p class="year">{{year}}</p><p class="genre">{{#genre}}<span class="badge">{{.}}</span> {{/genre}}</p>' +
    '</div>' +
  '</div>';

var hitTemplate =
    '<div class="hit media">'+
        '<div id="qWrap" class="dialog-box">'+
            '<div class="box-a timeline-center">'+
                '<span class="fa-stack fa-lg">'+
                    '<i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-map-marker fa-stack-1x fa-inverse"></i>'+
                '</span>'+
            '</div>'+
            '<div class="box-b">{{{_highlightResult.entity.value}}}</div>'+
            '<div class="box-c q-title">' +
                '{{{_highlightResult.question.value}}}'+
                    '<div class="q-variation collapse " id="collapseExample">'+
                        '<span class="title">Question Variables:</span>'+
                        '{{#_highlightResult.questionV}}\
                            {{#eng}}\
                                <ul>\
                                {{#.}}\
                                    <li>\
                                    {{{ value }}}\
                                    </li>\
                                {{/.}}\
                                </ul>\
                            {{/eng}}\
                        {{/_highlightResult.questionV}}'+
                    '</div>'+
                '<div class="box-d">'+
                    '<div class="right">'+
                        '<span class="label label-1">2</span>'+
                        '<span class="label label-2">5</span>'+
                        '<span class="label label-3">16</span>'+
                    '</div>'+
                    '<div class="left">'+
                        '<a data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">'+
                            '<span class="label label-plus">'+
                                'more'+
                            '</span>'+
                        '</a>'+
                    '</div>'+
                '</div>'+
                '<div class="box-e">'+
                    '<div class="q-preview-text">{{{_highlightResult.answer.value}}}</div>'+
                    '<div class="varia">'+
                    '{{#_highlightResult}}<p>{{{_highlightResult.lang.value}}}</p>{{/_highlightResult}}'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>';

var noResultsTemplate =
  '<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';


search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 10,
    templates: {
      empty: noResultsTemplate,
      item: hitTemplate
    },
    transformData: function(hit) {
      hit.stars = [];
      for (var i = 1; i <= 5; ++i) {
        hit.stars.push(i <= hit.rating);
      }
      return hit;
    }
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
    cssClasses: {
      root: 'pagination',
      active: 'active'
    }
  })
);



search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#domains',
    attributeName: 'domains',
    operator: 'and',
    limit: 10,
    cssClasses: {
      list: 'nav nav-list',
      count: 'badge pull-right',
      active: 'active'
    }
  })
);

search.addWidget(
    instantsearch.widgets.refinementList({
        container: '#city',
        attributeName: 'city',
        operator: 'and',
        limit: 10,
        cssClasses: {
            list: 'nav nav-list',
            count: 'badge pull-right',
            active: 'active'
        }
    })
);

search.addWidget(
    instantsearch.widgets.refinementList({
        container: '#lang',
        attributeName: 'lang',
        operator: 'and',
        limit: 10,
        cssClasses: {
            list: 'nav nav-list',
            count: 'badge pull-right',
            active: 'active'
        }
    })
);


// search.addWidget(
//     instantsearch.widgets.menu({
//         container: '#lang',
//         attributeName: 'lang',
//         limit: 10
//     })
// );


//
// search.addWidget(
//   instantsearch.widgets.starRating({
//     container: '#ratings',
//     attributeName: 'rating',
//     cssClasses: {
//       list: 'nav',
//       count: 'badge pull-right'
//     }
//   })
// );

search.start();



$(document).ready(function(){

    //TODO: Replace this for event trigger
    updateCurrent(); // This will run on page load
    setInterval(function(){
        updateCurrent() // this will run after every 5 seconds
    }, 1000);


    // updateCurrent(); // This will run on page load
    // $( ".updateme" ).on( "click", function() {
    //     updateCurrent();
    // });


});







function updateCurrent() {

    var get_params = function (search_string) {

        var parse = function (params, pairs) {
            var pair = pairs[0];
            var parts = pair.split('=');
            var key = decodeURIComponent(parts[0]);
            var value = decodeURIComponent(parts.slice(1).join('='));

            // Handle multiple parameters of the same name
            if (typeof params[key] === "undefined") {
                params[key] = value;
            } else {
                params[key] = [].concat(params[key], value);
            }

            return pairs.length == 1 ? params : parse(params, pairs.slice(1))
        }

        // Get rid of leading ?
        return search_string.length == 0 ? {} : parse({}, search_string.substr(1).split('&'));
    }

    //HEADER UPDATE
    var params = get_params(location.search);

    //CITY
    var city1 = params['fR[city][0]'];
    var city2 = params['fR[city][1]'];
    var city3 = params['fR[city][2]'];
    var city4 = params['fR[city][3]'];

    var cities;
    if (!city1) {
        cities = "Q&A";
    } else {
        cities = city1 +
            ( city2 ? " + " + city2 : "" ) +
            ( city3 ? " + " + city3 : "") +
            ( city4 ? " + " + city4 + "..." : "");
    }


    $(this).ready(function(){
        //console.log(cities);
        $("#currentCity").html(cities);
    });


    //DOMAIN
    var domain1 = params['fR[domains][0]'];
    var domain2 = params['fR[domains][1]'];
    var domain3 = params['fR[domains][2]'];
    var domain4 = params['fR[domains][3]'];

    var domains;
    if (!domain1) {
        domains = "general";
    } else {
        domains = domain1 +
            ( domain2 ? " + " + domain2 : "" ) +
            ( domain3 ? " + " + domain3 : "" ) +
            ( domain4 ? " + " + domain4 + "..." : "");

    }
    $(this).ready(function(){
        //console.log(domains);
        $("#currentDomain").fadeIn().html(domains);
    });



}