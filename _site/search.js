/* global instantsearch */




var search = instantsearch({
  appId: '7K8AZRYX2O',
  apiKey: '403c437db81fa6b9adf92564c8280b9b',
  indexName: 'factopia-model3',
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

var hitTemplate3 =

    '<div class="hit media">'+
        '<div id="qWrap" class="dialog-box">'+
            '<div class="box-a timeline-center">'+
                '<span class="fa-stack fa-lg">'+
                    '<i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-check fa-stack-1x fa-inverse"></i>'+
                '</span>'+
            '</div>'+
            '<h2 class="box-b">{{{_highlightResult.entity.value}}}</h2>'+
            '<h3 class="box-c q-title">' +
                '{{{_highlightResult.question.value}}}'+
                    '<div class="q-variation collapse " id="collapse_{{{_highlightResult.myID.value}}}">'+
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
                        '<a data-toggle="collapse" href="#collapse_{{{_highlightResult.myID.value}}}" aria-expanded="false" aria-controls="collapse_{{{_highlightResult.myID.value}}}">'+
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
            '</h3>'+
        '</div>'+
    '</div>';

var hitTemplate =

    '<div class="hit media">' +
        '<div id="qWrap" class="dialog-box">' +
            '<div class="box-a timeline-center">' +
                '<span class="fa-stack fa-sm">' +
                    '<i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-check fa-stack-1x fa-inverse"></i>' +
                '</span>' +
            '</div>' +
            '<h2 class="box-b">{{{_highlightResult.a1856dae.value}}}</h2>' +
            '<h3 class="box-c q-title">' +
                '{{{_highlightResult.cf32708b.value}}}' +
                // '<div class="q-variation collapse " id="collapse_{{{_highlightResult.myID.value}}}">' +
                //     '<span class="title">Question Variables:</span>' +
                //     '{{#_highlightResult.questionV}}\
                //         {{#eng}}\
                //             <ul>\
                //             {{#.}}\
                //                 <li>\
                //                 {{{ value }}}\
                //                 </li>\
                //             {{/.}}\
                //             </ul>\
                //         {{/eng}}\
                //     {{/_highlightResult.questionV}}' +
                // '</div>' +
                '<div class="box-d">' +
                    '<div class="right">' +
                        '<span class="label label-3">Collab</span>' +
                        '<span class="label label-1">{{{_highlightResult.c5c378b1.value}}}</span>' +
                        '<span class="label label-2">{{{_highlightResult.da6c5796.value}}}</span>' +

                    '</div>' +
                    '<div class="left">' +
                            '<span class="label label-plus">' +
                                '{{{_highlightResult.f32d8ff5.value}}}' +
                            '</span>' +
                    '</div>' +
                '</div>' +
                '<div class="box-e">' +
                    '<div class="q-preview-text">{{{_highlightResult.535e0dde.value}}}</div>' +
                    // '<div class="varia">' +
                    //     '{{#_highlightResult}}<p>{{{_highlightResult.da6c5796.value}}}</p>{{/_highlightResult}}' +
                    // '</div>' +
                '</div>' +
            '</h3>' +
        '</div>' +
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
    attributeName: 'c5c378b1',
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
        attributeName: 'f32d8ff5',
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
        attributeName: 'da6c5796',
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
        container: '#entity',
        attributeName: 'a1856dae',
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

    var handle= params['fR[entity][0]'];
    if(handle){
        $("#currentCity").html(handle);
    }else{

        //CITY
        var city1 = params['fR[f32d8ff5][0]'];
        var city2 = params['fR[f32d8ff5][1]'];
        var city3 = params['fR[f32d8ff5][2]'];
        var city4 = params['fR[f32d8ff5][3]'];

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

    }
    //DOMAIN
    var domain1 = params['fR[c5c378b1][0]'];
    var domain2 = params['fR[c5c378b1][1]'];
    var domain3 = params['fR[c5c378b1][2]'];
    var domain4 = params['fR[c5c378b1][3]'];

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