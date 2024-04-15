$(document).ready(function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    $('.color-choose input').on('click', function () {
        var ringColor = $(this).attr('data-image');

        $('.color-choose input.active').removeClass('active');
        $('.left-column img.active').removeClass('active');
        $('.left-column img[data-image = ' + ringColor + ']').addClass('active');
        $(this).addClass('active');
    });
    // Choose version and change price only
    $('.version-choose button').on('click', function () {
        var ringPrice = $(this).attr('data-price');
        $('.version-choose button').removeClass('active');
        $('.product-price span').text('$' + ringPrice);
        $(this).addClass('active');
    });

    // Add to cart
    $('.cart-btn').on('click', function () {
        var ringColor = $('.color-choose input:checked').attr('data-image');
        var ringVersion = $('.version-choose button.active').attr('data-version');

        // Check if both color and version are selected
        if (!ringColor || !ringVersion) {
            alert('Please select both color and version before adding to cart.');
            return;
        }

        var price = parseFloat($('.version-choose button.active').attr('data-price')); // Parse price as float

        // Add item to cart
        cart.push({ id: cart.length.toString(), color: ringColor, version: ringVersion, price: price });
        // Print cart items to console
        console.log(cart);
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update cart number in the header
        updateCartNumber();
    });


    // Function to update cart number in the header
    function updateCartNumber() {
        const cartNumberElements = document.querySelectorAll('.cart-number');
        cartNumberElements.forEach(element => {
            element.textContent = cart.length;
        });
    }

    updateCartNumber(); // Initialize cart number on page load

    $('#standard').addClass('active').trigger('click');
});