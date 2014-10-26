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
            // 4) Delete the item from the server itemObj.id
            // delete http://127.0.0.1:8001/items/itemObj.id
            $.ajax({
                //url: 'http://127.0.0.1:8001/items/' + items.indexOf(removeButton.siblings().text()),
                url: 'http://83.251.232.254:8001/items/' + items.indexOf(removeButton.siblings().text()),
                type: 'delete',
                success: function () {
                    //console.log('Deleted');
                },
                error: function (errorThrown) {
                    console.log('Error: ' + errorThrown);
                },
                complete: function () {
                    console.log('The delete request is complete');
                }

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
        // get http://127.0.0.1:8001/items
        $.ajax({
            //url: 'http://127.0.0.1:8001/items',
            url: 'http://83.251.232.254:8001/items',
            type: 'get',
            dataType: 'JSON',
            success: function (json) {
                //onödigt med 2 for loopar?
                // for (var key in json) {
                //     items.push(json[key]);
                // }
                //for (var i = 0; i < items.length; i = i + 1) {
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
            complete: function () {
                console.log('Loading items is complete');
            }

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
            // post http://127.0.0.1:8001/items
            $.ajax({
                //url: 'http://127.0.0.1:8001/items',
                url: 'http://83.251.232.254:8001/items',
                type: 'post',
                dataType: 'JSON',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(jsonObject),
                success: function (data) {
                    //console.log('success');
                },
                error: function (xhr, status, errorThrown) {
                    //console.log('some weird error');
                    //console.log('Error: ' + errorThrown);
                    //console.log('Status: ' + status);
                    //console.dir(xhr);
                },
                complete: function () {
                    console.log('New item is added to the list');
                }

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