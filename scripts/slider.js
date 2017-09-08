var slider = {};

slider.init = function() {
	this.slider 		= document.querySelector('.slider');
	this.sliderList = document.querySelector('.slider__list');
	this.leftNav 		= document.querySelector('.js-slider-left-nav');
	this.rightNav 	= document.querySelector('.js-slider-right-nav');
	this.sliderItem = document.querySelector('.slider__item');

	this.eventHandlers();
};

slider.eventHandlers = function() {
	this.leftNav.addEventListener('click', this.updateSlider.bind(this));
	this.rightNav.addEventListener('click', this.updateSlider.bind(this));
};

slider.updateSlider = function() {
	var direction 		= event.target.dataset.direction;
	var sliderOffset 	= window.getComputedStyle(this.sliderList, null).transform.split(',')[4] || '0';
	var slideCount 		= document.querySelectorAll('.slider__item').length;
	var slideWidth 		= parseInt(this.sliderItem.getBoundingClientRect().width);
	var currentOffset = parseInt(sliderOffset.trim());

	if ('right' === direction) {
		var newOffset = currentOffset - slideWidth;
	} else if ('left' === direction) {
		var newOffset = currentOffset + slideWidth;
	}

	console.log('newOffset', newOffset,  -(slideCount * slideWidth), newOffset > -(slideCount * slideWidth))

	if (newOffset > 0 || newOffset <= -(slideCount * slideWidth)) {
		newOffset = 'translateX(0px)';
	} else if (newOffset > -(slideCount * slideWidth)) {
		newOffset = 'translateX(' + newOffset + 'px)';
	}

	this.slide(newOffset);
};

slider.slide = function(offset) {
	console.log(offset);
	this.sliderList.style.webkitTransform = offset;
	this.sliderList.style.MozTransform = offset;
	this.sliderList.style.msTransform = offset;
	this.sliderList.style.OTransform = offset;
	this.sliderList.style.transform = offset;
};

// Kickoff when DOM content has loaded.
document.addEventListener('DOMContentLoaded', slider.init.bind(slider));
