// Change the orientation css class

let CurrentHtml = document.querySelector('html');
let LgWarContent = document.querySelector('.alliance-wars');
function setOrientationClass() {
	if (LgWarContent !== null) {
		if (window.innerWidth > window.innerHeight) {
			LgWarContent.classList.add('alliance-wars--horizontal');
			LgWarContent.classList.remove('alliance-wars--vertical');
			if (window.innerHeight / window.innerWidth <= 0.5) {
				CurrentHtml.classList.add('ratio-by-height');
				CurrentHtml.classList.remove('ratio-by-width');
				LgWarContent.classList.add('alliance-wars--ratio-by-height');
				LgWarContent.classList.remove('alliance-wars--ratio-by-width');
			} else {
				CurrentHtml.classList.add('ratio-by-width');
				CurrentHtml.classList.remove('ratio-by-height');
				LgWarContent.classList.add('alliance-wars--ratio-by-width');
				LgWarContent.classList.remove('alliance-wars--ratio-by-height');
			}
		} else {
			LgWarContent.classList.add('alliance-wars--vertical');
			LgWarContent.classList.remove('alliance-wars--horizontal');
		}
	}
}
setOrientationClass();

window.onresize = function() {
	setOrientationClass();
}

// Get the colors order by url parameters

let ColorObject = {
	turquoise: {name:'Turquoise', backgroundColor:'#129b90', borderColor:'#d6dee3'}, // 00897f
	lightblue: {name:'Bleu clair', backgroundColor:'#447ab1', borderColor:'#d6dee3'}, // 386ea5
	darkblue: {name:'Bleu foncé', backgroundColor:'#2c29b1', borderColor:'#d6dee3'}, // 312ec4
	pink: {name:'Rose', backgroundColor:'#c63fa7', borderColor:'#d6dee3'}, // b3008c
	red: {name:'Rouge', backgroundColor:'#8e0000', borderColor:'#d6dee3'},
	orange: {name:'Orange', backgroundColor:'#8f5514', borderColor:'#d6dee3'},
	yellow: {name:'Jaune', backgroundColor:'#917b12', borderColor:'#d6dee3'},
	brown: {name:'Marron', backgroundColor:'#522605', borderColor:'#d6dee3'},
	purple: {name:'Violet', backgroundColor:'#612461', borderColor:'#d6dee3'},
	green: {name:'Vert', backgroundColor:'#006f48', borderColor:'#d6dee3'}, // 00935e
	frenchy: {name:'Frenchy', backgroundColor:'#1e981c', borderColor:'#04de00'}
};

let CurrentHead = document.querySelector('head');
let GeneratedStyle = document.createElement('style');
GeneratedStyle.id = 'generated';
CurrentHead.appendChild(GeneratedStyle);

GeneratedStyle.textContent += ''
+ '\n'
	+ ':root {'
;

let CurrentParameters = new URLSearchParams(window.location.search);
if (CurrentParameters == '') {
	window.location.replace(window.location.href + '?color1=turquoise&color2=lightblue&color3=darkblue&color4=pink&color5=red&color6=orange&color7=yellow&color8=brown&color9=purple&color10=green');
}
let menuButton;
for (let i = 1; i < 11; i++) {
	menuButton = document.querySelector('.alliance-wars__menu__button--' + i);
	menuButton.addEventListener('click', function() {
		this.classList.toggle('alliance-wars__menu__button--on');
		this.classList.toggle('alliance-wars__menu__button--off');
		document.querySelectorAll('.alliance-wars__grid__edge__sector__team--' + i).forEach(function(item) {
			item.classList.toggle('alliance-wars__grid__edge__sector__team--off');
		});
	});
	if (CurrentParameters.get('color' + i)) {
		GeneratedStyle.textContent += ''
			+ '\n'
				+ '	/* Color ' + i + ' */'
			+ '\n'
				+ '	--team-' + i + '-background-color: ' + ColorObject[CurrentParameters.get('color' + i)]['backgroundColor'] + ';'
			+ '\n'
				+ '	--team-' + i + '-border-color: ' + ColorObject[CurrentParameters.get('color' + i)]['borderColor'] + ';'
		;
		menuButton.innerHTML = ColorObject[CurrentParameters.get('color' + i)]['name'];
		
		if (CurrentParameters.get('color' + i) == 'frenchy') {
			LgWarContent.classList.add('alliance-wars-' + i);
			
			document.querySelectorAll('.alliance-wars__grid__edge__sector__team--' + i).forEach(function(item) {
				item.parentNode.insertAdjacentHTML('beforeEnd', ''
					+ '<div class="alliance-wars__grid__edge__sector__frenchy"></div>'
				);
			});
		}
	}
}

GeneratedStyle.textContent += ''
	+ '\n'
	+ '}'
;
