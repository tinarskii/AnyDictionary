var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
	var currentScrollPos = window.pageYOffset;
	if (prevScrollpos > currentScrollPos) {
		document.querySelector('.navbar').style.transform = 'translate(0px, 0px)';
	} else if (prevScrollpos < currentScrollPos) {
		document.querySelector('.navbar').style.transform =
			'translate(0px, -100px)';
	}
	console.log(prevScrollpos > currentScrollPos);
	prevScrollpos = currentScrollPos;
};
