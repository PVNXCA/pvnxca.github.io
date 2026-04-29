// Change the orientation css class

let CurrentHtml = document.querySelector('html');
let LgWarContent = document.querySelector('.alliance-war');
function setOrientationClass() {
	if (LgWarContent !== null) {
		if (window.innerWidth > window.innerHeight) {
			CurrentHtml.classList.add('html--horizontal');
			CurrentHtml.classList.remove('html--vertical');
			if (window.innerHeight / window.innerWidth <= 0.5) {
				CurrentHtml.classList.add('html--ratio-by-height');
				CurrentHtml.classList.remove('html--ratio-by-width');
				LgWarContent.classList.add('alliance-war--ratio-by-height');
				LgWarContent.classList.remove('alliance-war--ratio-by-width');
			} else {
				CurrentHtml.classList.add('html--ratio-by-width');
				CurrentHtml.classList.remove('html--ratio-by-height');
				LgWarContent.classList.add('alliance-war--ratio-by-width');
				LgWarContent.classList.remove('alliance-war--ratio-by-height');
			}
		} else {
			CurrentHtml.classList.add('html--vertical');
			CurrentHtml.classList.remove('html--horizontal');
			if (window.innerWidth / window.innerHeight <= 0.5) {
				CurrentHtml.classList.add('html--ratio-by-height');
				CurrentHtml.classList.remove('html--ratio-by-width');
				LgWarContent.classList.add('alliance-war--ratio-by-height');
				LgWarContent.classList.remove('alliance-war--ratio-by-width');
			} else {
				CurrentHtml.classList.add('html--ratio-by-width');
				CurrentHtml.classList.remove('html--ratio-by-height');
				LgWarContent.classList.add('alliance-war--ratio-by-width');
				LgWarContent.classList.remove('alliance-war--ratio-by-height');
			}
		}
	}
}
setOrientationClass();

window.onresize = function() {
	setOrientationClass();
}

// Get the colors order by url parameters

let ColorArray = [
	{name:'Frenchy', backgroundColor:'#1e981c', borderColor:'#04de00'},
	{name:'Turquoise', backgroundColor:'#129b90', borderColor:'#d6dee3'}, // 00897f
	{name:'Bleu clair', backgroundColor:'#447ab1', borderColor:'#d6dee3'}, // 386ea5
	{name:'Bleu foncé', backgroundColor:'#2c29b1', borderColor:'#d6dee3'}, // 312ec4
	{name:'Rose', backgroundColor:'#c63fa7', borderColor:'#d6dee3'}, // b3008c
	{name:'Rouge', backgroundColor:'#8e0000', borderColor:'#d6dee3'},
	{name:'Orange', backgroundColor:'#8f5514', borderColor:'#d6dee3'},
	{name:'Jaune', backgroundColor:'#917b12', borderColor:'#d6dee3'},
	{name:'Marron', backgroundColor:'#522605', borderColor:'#d6dee3'},
	{name:'Violet', backgroundColor:'#612461', borderColor:'#d6dee3'},
	{name:'Vert', backgroundColor:'#006f48', borderColor:'#d6dee3'}, // 00935e
];

let CurrentParameters = new URLSearchParams(window.location.search);
if (CurrentParameters == '') {
	window.location.replace(window.location.href + '?frenchy=0');
}

let frenchyNumber;
if (CurrentParameters.get('frenchy')) {
	frenchyNumber = Number(CurrentParameters.get('frenchy'));
	if (frenchyNumber > 0) {
		ColorArray[frenchyNumber] = ColorArray[0];
	}
}

let CurrentHead = document.querySelector('head');
let GeneratedStyle = document.createElement('style');
GeneratedStyle.id = 'generated';
CurrentHead.appendChild(GeneratedStyle);

GeneratedStyle.textContent += ''
+ '\n'
	+ ':root {'
;

let menuButton;
for (let i = 1; i < 11; i++) {
	menuButton = document.querySelector('.alliance-war__menu__button--' + i);
	menuButton.addEventListener('click', function() {
		this.classList.toggle('alliance-war__menu__button--on');
		this.classList.toggle('alliance-war__menu__button--off');
		document.querySelectorAll('.alliance-war__grid__edge__sector__team--' + i).forEach(function(item) {
			item.classList.toggle('alliance-war__grid__edge__sector__team--off');
		});
	});
	
	if (frenchyNumber === undefined) {
		if (CurrentParameters.get('color' + i) == 'frenchy') {
			frenchyNumber = i;
			ColorArray[i] = ColorArray[0];
		}
	} else if (frenchyNumber == i) {
		LgWarContent.classList.add('alliance-war-' + i);
		
		document.querySelectorAll('.alliance-war__grid__edge__sector__team--' + i).forEach(function(item) {
			item.parentNode.insertAdjacentHTML('beforeEnd', ''
				+ '<div class="alliance-war__grid__edge__sector__frenchy"></div>'
			);
		});
	}
	
	GeneratedStyle.textContent += ''
		+ '\n'
			+ '	/* Color ' + i + ' */'
		+ '\n'
			+ '	--team-' + i + '-background-color: ' + ColorArray[i]['backgroundColor'] + ';'
		+ '\n'
			+ '	--team-' + i + '-border-color: ' + ColorArray[i]['borderColor'] + ';'
	;
	menuButton.innerHTML = ColorArray[i]['name'];
}

GeneratedStyle.textContent += ''
	+ '\n'
	+ '}'
;
