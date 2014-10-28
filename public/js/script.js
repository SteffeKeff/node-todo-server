'use strict';
$(function () {
    var loadItems, addItem,
        items = [];

    addItem = function (itemObj) {
        var listItem = $('<li>'),
            itemSpan = $('<span>'),
            removeButton = $('<span>remove</span>');
        removeButton.addClass('remove');
        removeButton.click(function () {
            $.ajax({
                url: '/items/' + items.indexOf(removeButton.siblings().text()),
                type: 'delete',
                success: function () {
                    //console.log('Deleted');
                },
                error: function (errorThrown) {
                    console.log('Error: ' + errorThrown);
                },
            });
            listItem.remove();
            // 5) Instead of updateItems rerun loadItems
            loadItems();
            $('#itemName').focus();
        });
        itemSpan.text(itemObj);
        listItem.append(itemSpan);
        listItem.append(removeButton);
        $('ul').append(listItem);
        $('#itemName').val('').focus();
    };

    loadItems = function () {
        $('ul').empty();
        items.length = 0;
        // 1) Change this function to get data from the server with ajax instead of localstorage.
        $.ajax({
            url: '/items',
            type: 'get',
            dataType: 'JSON',
            success: function (json) {
                for (var i = 0; i < json.length; i++) {
                    items.push(json[i]);
                    addItem(json[i]);
                }
            },
            error: function (xhr, status, errorThrown) {
                console.log('Error: ' + errorThrown);
                console.log('Status: ' + status);
                console.dir(xhr);
            },
        });
    };

    $('.addItem').click(function () {
        var itemText = $('#itemName').val();
        itemText = $.trim(itemText);
        var jsonObject = {
            item: itemText
        };
        if (itemText !== '') {
            // 2) add the item to the server with ajax
            $.ajax({
                url: '/items',
                type: 'post',
                dataType: 'JSON',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(jsonObject),
                success: function (data) {},
                error: function (xhr, status, errorThrown) {},
            });
            addItem({
                name: itemText
            });
            // 3) if add is successful instead of updateItems run loadItems to load all the items from the server. 
            loadItems();
        }
    });
    loadItems();
});