/* global $ */
$(document).ready(function () {
    var $searchWidget = $('#search_widget');
    var $searchBox    = $searchWidget.find('input[type=text]');
    var searchURL     = $searchWidget.attr('data-search-controller-url');

    $searchBox.autoComplete({
        minChars: 2,
        source: function (query, response) {
            $.post(searchURL, {
                s: query,
                resultsPerPage: 10
            }, null, 'json')
            .then(function (resp) {
                response(resp.products);
            })
            .fail(response);
        },
        renderItem: function (product, search) {
            console.log(search);
            return '<div class="autocomplete-suggestion" data-url="' + product.url + '">' +
            '<span class="category">' + product.category_name + '</span>' +
            '<span class="separator"> > </span>' +
            '<span class="product">' + product.name + '</span>' +
            '</div>';
        },
        onSelect: function (e, term, item) {
            var url = item.data('url');
            window.location.href = url;
        }
    });
});
