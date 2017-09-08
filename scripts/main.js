var slider = {};
var nav = {};

// Slider initialize.
slider.init = function() {
	this.slider 		= document.querySelector('.slider');
	this.sliderList = document.querySelector('.slider__list');
	this.leftNav 		= document.querySelector('.js-slider-left-nav');
	this.rightNav 	= document.querySelector('.js-slider-right-nav');
	this.sliderItem = document.querySelector('.slider__item');

	this.eventHandlers();
};

// Slider event handlers.
slider.eventHandlers = function() {
	this.leftNav.addEventListener('click', this.updateSlider.bind(this));
	this.rightNav.addEventListener('click', this.updateSlider.bind(this));
};

// Calculate the translateX value to slide the slider left or right.
slider.updateSlider = function(event) {
	var direction 		= event.target.dataset.direction;
	var sliderOffset 	= window.getComputedStyle(this.sliderList, null).transform.split(',')[4] || '0';
	var slideCount 		= document.querySelectorAll('.slider__item').length;
	var slideWidth 		= parseInt(this.sliderItem.getBoundingClientRect().width);
	var currentOffset = parseInt(sliderOffset.trim());

	var newOffset = 'right' === direction ?
		currentOffset - slideWidth :
		currentOffset + slideWidth ;

	if (newOffset > 0 || newOffset <= -(slideCount * slideWidth)) {
		newOffset = 'translateX(0px)';
		this.leftNav.style.display = 'none';
	} else if (newOffset > -(slideCount * slideWidth)) {
		newOffset = 'translateX(' + newOffset + 'px)';
		this.leftNav.style.display = 'block';
	}

	this.slide(newOffset);
};

// Update the translateX postion of slider.
slider.slide = function(offset) {
	this.sliderList.style.webkitTransform = offset;
	this.sliderList.style.MozTransform = offset;
	this.sliderList.style.msTransform = offset;
	this.sliderList.style.OTransform = offset;
	this.sliderList.style.transform = offset;
};

// Navigation initialize.
nav.init = function() {
	this.navBar 	= document.querySelector('.js-nav-bar');
	this.navItems = document.querySelectorAll('.js-nav-item');
	this.navLogo 	= document.querySelector('.js-nav-logo');

	this.eventHandlers();
};

// Navigation event handlers.
nav.eventHandlers = function() {
	window.addEventListener('scroll', nav.stickToTop.bind(this));

	for(var i = 0; i < this.navItems.length; i++) {
		this.navItems[i].addEventListener('click', this.scrollTo.bind(this))
	}
};

// Applies a class to the nav to make it sticky.
nav.stickToTop = function() {
	var logoHeight = this.navLogo.getBoundingClientRect().height;

	if (window.pageYOffset > logoHeight) {
		this.navBar.classList.add('nav__bar--stuck');
	} else {
		this.navBar.classList.remove('nav__bar--stuck');
	}
};

// Scroll the page to a certian section.
nav.scrollTo = function(event) {
	var linkSection = event.target.dataset.section;
	var section = document.querySelector('#' + linkSection);
	if (section) {
		section.scrollIntoView({block: 'start', behavior: 'smooth'});
	}
};

// Kickoff when DOM content has loaded.
document.addEventListener('DOMContentLoaded', slider.init.bind(slider));
document.addEventListener('DOMContentLoaded', nav.init.bind(nav));
