require.config({
    baseUrl: base_url,
    paths: {
        'jquery': '/mkdocs/js/jquery-1.10.2.min',
        'bootstrap': '/mkdocs/js/bootstrap-3.0.3.min',
        'mustache': '/mkdocs/js/mustache.min',
        'prettyprint': '/mkdocs/js/prettify-1.0.min',
        'highlight': '/mkdocs/js/highlight.pack',
        'base': '/mkdocs/js/base',
        'lunr': '/mkdocs/js/lunr-0.5.12.min',
	'text': '/mkdocs/js/text',
    },
    shim: {
        "bootstrap" : {
            deps : ["jquery"]
        },
        "base" : {
            deps : ["jquery"]
        }
    }
});

require(['jquery','mustache','lunr','text!search-results-template.mustache','text!../search_index.json','text','bootstrap', 'prettyprint', 'highlight', 'base'], function($, Mustache, lunr, results_template, data) {
    "use strict";

    function getSearchTerm()
    {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++)
        {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == 'q')
            {
                return decodeURIComponent(sParameterName[1].replace(/\+/g, '%20'));
            }
        }
    }

    var index = lunr(function () {
        this.field('title', {boost: 10});
        this.field('text');
        this.ref('location');
    });

    data = JSON.parse(data);
    var documents = {};

    for (var i=0; i < data.docs.length; i++){
        var doc = data.docs[i];
        doc.location = base_url + doc.location;
        index.add(doc);
        documents[doc.location] = doc;
    }

    var search = function(){

        var query = document.getElementById('mkdocs-search-query').value;
        var search_results = document.getElementById("mkdocs-search-results");
        while (search_results.firstChild) {
            search_results.removeChild(search_results.firstChild);
        }

        if(query === ''){
            return;
        }

        var results = index.search(query);

        if (results.length > 0){
            for (var i=0; i < results.length; i++){
                var result = results[i];
                doc = documents[result.ref];
                doc.base_url = base_url;
                doc.summary = doc.text.substring(0, 200);
                var html = Mustache.to_html(results_template, doc);
                search_results.insertAdjacentHTML('beforeend', html);
                jQuery('#mkdocs-search-results').show();
                jQuery('#conent').hide();
            }
        } else {
            search_results.insertAdjacentHTML('beforeend', "<p>No results found</p>");
        }

        if(jQuery){
            /*
             * We currently only automatically hide bootstrap models. This
             * requires jQuery to work.
             */
            jQuery('#mkdocs_search_modal a').click(function(){
                jQuery('#mkdocs_search_modal').modal('hide');
            })
        }

    };

    var search_input = document.getElementById('mkdocs-search-query');

    var term = getSearchTerm();
    if (term){
        search_input.value = term;
        search();
    }

    search_input.addEventListener("keyup", search);

});
