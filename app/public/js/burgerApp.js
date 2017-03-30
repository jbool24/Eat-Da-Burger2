$(document).ready(function() {
    var baseUrl = window.location.origin;
    var url = `${baseUrl}/api/burgers/devoured`;

    // Get Burgers on load
    $.get(url, null, (burgers) => {
        var ul = $(".burgers-eaten");
        burgers.forEach((burger) => {
            var eaten = $(`<li><i class='fa fa-trash'> ${burger.burger_name}</i></li>`);
            ul.append(eaten);
        });
    });

    // Eat Button Click Listener
    $(".order-window").on('click', "button", () => {
        var burgerID = $(this.activeElement).attr('data-id');
        $.post(`${baseUrl}/api/burger/${burgerID}?_method=PUT`).done((response) => {
            refreshOrders();
        });
    });

    function refreshOrders() {
        // Refresh burger list
        $.get(`${baseUrl}/api/burgers`).done((burgers) => {
            var orders = $(".burger-list");
            orders.empty();
            burgers.forEach((burger) => {
                var list = $("<ul>");
                var eatBtn = $("<button>");
                eatBtn.attr('data-id', burger.id);
                list.append(`<li>${burger.burger_name}${eatBtn}<li>`)
            });
        });

        // Refresh burgers eaten
        $.get(`${baseUrl}/api/burgers/devoured`).done((burgerList) => {
            var list = $(".burgers-eaten");
            list.empty();
            burgerList.forEach((burger) => {
                list.append(`<li><i class='fa fa-trash'> ${burger.burger_name}</i><li>`);
            });
        });
    }

});
