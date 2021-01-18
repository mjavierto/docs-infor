(function($) {
    $('html').on('click', '.tabs input', function() {       
        if ($(`input[id='${this.id}']`).attr('previousValue') == 'true') {
            $(`input[id='${this.id}']`).attr('checked', false);
            
            //console.log('T');           
            //console.log($(`input[id='${this.id}']`).attr('previousValue'));
        } else {
            $(`input[id='${this.id}']`).attr('previousValue', false);
            
            //console.log('F');
            //console.log($(`input[id='${this.id}']`).attr('previousValue'));
        }
        $(`input[id='${this.id}']`).attr('previousValue', $(`input[id='${this.id}']`).prop('checked'));
    });
    

    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
    });

})(window.jQuery);
