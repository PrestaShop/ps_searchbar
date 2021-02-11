/* global $ */
$(document).ready(function () {
    var $searchWidget = $('#search_widget');
    var $searchBox    = $searchWidget.find('input[type=text]');
    var searchURL     = $searchWidget.attr('data-search-controller-url');
    var $clearButton  = $searchWidget.find('i.clear');

    $.widget('prestashop.psBlockSearchAutocomplete', $.ui.autocomplete, {
        _renderItem: function (ul, product) {
            if (product.show_price) {
                return $("<li>")
    .append($("<img>").attr("src",product.cover.bySize.home_default.url).addClass("product-img"))
                    .append($("<a>")
                        .append($("<span>").html(product.category_name).addClass("category"))
                        .append($("<span>").html(' > ').addClass("separator"))
                        .append($("<span>").html(product.name).addClass("product"))
    .append($("<span>").html(product.price).addClass("price"))
                    ).appendTo(ul)
                ;
            } else {
                return $("<li>")
                    .append($("<img>").attr("src",product.cover.bySize.home_default.url).addClass("product-img"))
                    .append($("<a>")
                        .append($("<span>").html(product.category_name).addClass("category"))
                        .append($("<span>").html(' > ').addClass("separator"))
                        .append($("<span>").html(product.name).addClass("product"))
                    ).appendTo(ul)
                ;
            }
        }
    });

    var isMobile = function() {
        return $(window).width() < 768;
    };
    var autocompletePosition = function() {
      return {
        my: 'right top',
        at: 'right bottom',
        of: isMobile() ? '.header-top' : '#search_widget',
      };
    };

    $searchBox.psBlockSearchAutocomplete({
        position: autocompletePosition(),
        source: function (query, response) {
            $.post(searchURL, {
                s: query.term,
                resultsPerPage: 10
            }, null, 'json')
            .then(function (resp) {
                response(resp.products);
            })
            .fail(response);
        },
        select: function (event, ui) {
            var url = ui.item.url;
            window.location.href = url;
        },
    }).psBlockSearchAutocomplete("widget").addClass('searchbar-autocomplete');

    $(window).resize(function() {
      $searchBox.psBlockSearchAutocomplete({
        position: autocompletePosition(),
      });
      $searchBox.keyup();
    });

    $clearButton.click(function() {
        $searchBox.val("");
        $clearButton.hide();
    });

    $searchBox.keyup(function() {
        $clearButton.toggle($searchBox.val() !== "" && isMobile());
    });
});
