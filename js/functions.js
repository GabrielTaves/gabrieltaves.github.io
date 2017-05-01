//SCROLLED
// Aciona a classe .scrolled ao header após 200px de scroll e a remove abaixo disso
function Scrolled(height){
	$(document).on("scroll", function (e){
	    var scrollPos = $(document).scrollTop();
	    if (scrollPos > height) {
	        $('header').addClass('scrolled');
	    } else if (scrollPos < height) {
	    	if ($('header').hasClass('scrolled')) {
	        	$('header').removeClass('scrolled');	
	    	}
	    }	
    });
}
// ON IMG LOAD
// Verifica se a imagem selecionada já está carregada
// Exemplo de uso:
// onImgLoad('img', function(){
//     console.log ('Imagem Carregada');
// });
var onImgLoad = function(selector, callback){
	$(selector).each(function(){
		if (this.complete || /*for IE 10-*/ $(this).height() > 0) {
			callback.apply(this);
		}
		else {
			$(this).on('load', function(){
					callback.apply(this);
			});
		}
	});
};
// CHECK IF IN VIEW
// Verifica se o elemento está na tela e adiciona a classe .in-view a ele
// Uso: Adicine a classe .animation-element ao elemento a ser animado quando estiver na tela
// e anime ele usando CSS
var $animation_elements = $('.animation-element');
var $window = $(window);
function check_if_in_view() {
	var window_height = $window.height() - 100;
	var window_top_position = $window.scrollTop();
	var window_bottom_position = (window_top_position + window_height);
 
	$.each($animation_elements, function() {
		var $element = $(this);
		var element_height = $element.outerHeight();
		var element_top_position = $element.offset().top;
		var element_bottom_position = (element_top_position + element_height);
 
		//check to see if this current container is within viewport
		if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
			$element.addClass('in-view');
		} else {
			// $element.removeClass('in-view');
		}
	});
}
window.onload = function() {
	$window.on('scroll resize', check_if_in_view);
	$window.trigger('scroll');
};
// ADJUST HEIGHT
// Use para fazer com que imagens como banners fiquem da altura da janela, 
// se a altura da imagem for maior ou igual à altura da janela
// Exemplo de uso:
// adjustHeight('.bx-wrapper img', '.topo');
function adjustHeight(selector, container){
	var window_height = window.innerHeight;

	var img_height = $(selector).height();
	var razao = img_height / window_height;
	function razaoMargin(razao){
		if (razao > 1.5) {
			$(selector).css('margin-top','-15%');       
		} else if(razao > 1.25){
			$(selector).css('margin-top','-10%');       
		} else if(razao > 1.1){
			$(selector).css('margin-top','-5%');          
		} else {
			$(selector).css('margin-top','0');          
		}
	}

	if (window_height < 775 && window_height < img_height) {
		$(container).height(window_height);     
		razaoMargin(razao);
	} else {
		if (window_height > img_height) {
			$(container).height(img_height);
			$(selector).css('margin-top','0');
		} else {
			razaoMargin(razao);
			$(container).height(window_height);
		}     
	}
}
// MAP DISABLE SCROLL
function mapScroll(){
	// Disable scroll zooming and bind back the click event
	var onMapMouseleaveHandler = function (event) {
		var that = $(this);

		that.on('click', onMapClickHandler);
		that.off('mouseleave', onMapMouseleaveHandler);
		that.find('iframe').css("pointer-events", "none");
	}
	var onMapClickHandler = function (event) {
		var that = $(this);

		// Disable the click handler until the user leaves the map area
		that.off('click', onMapClickHandler);

		// Enable scrolling zoom
		that.find('iframe').css("pointer-events", "auto");

		// Handle the mouse leave event
		that.on('mouseleave', onMapMouseleaveHandler);
	}
	// Enable map zooming with mouse scroll when the user clicks the map
	$('.maps.embed-container').on('click', onMapClickHandler);
}