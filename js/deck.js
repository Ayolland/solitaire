class Suit {
	constructor(name,symbol,value) {
		this.name = name;
		this.symbol = symbol;
		this.value = value;
	}
}

class Card {
	constructor(suit,name,fullName,shortName,value) {    
		this.suit = suit;
		this.name = name;
		this.fullName = fullName;
		this.shortName = shortName;
		this.value = value;
	}

	generateElement(){
		let element = document.createElement("div");
		element.classList.add('card',this.suit.name,this.name);
		let inner = document.createElement("div");
		inner.classList.add('card-inner');
		element.appendChild(inner);
		let front = document.createElement("div");
		front.classList.add('card-front');
		inner.appendChild(front);
		let innerText = document.createTextNode(this.shortName);
		front.appendChild(innerText);
		let back = document.createElement("div");
		back.classList.add('card-back');
		inner.appendChild(back);
		this.HTMLElement = element;
		return element;
	}
}

class Pile {
	constructor(cards) {
		this.cards = cards || [];
	}

	sort(){
		this.cards.sort(function(cardA,cardB){
			let sortOrderA = cardA.value + (cardA.suit.value * 1000);
			let sortOrderB = cardB.value + (cardB.suit.value * 1000);
			return sortOrderB-sortOrderA;
		});
		return this.cards;
	}

	shuffle(seed) {
		seed = seed || Date.now();
		let pileRng = new Math.seedrandom(seed);
		this.sort();
		for (let i = this.cards.length - 1; i > 0; i--) {
			let testRandom = pileRng();
        	const j = Math.floor(testRandom * (i + 1));
        	[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    	}
		return this.cards;
	}

	remove(number,fromTop) {
		fromTop = (fromTop == false) ? false : true;
		let removedCards = [];
		for (var i = 0; i < number; i++) {
			let topCard = fromTop ? this.cards.shift() : this.cards.pop();
			removedCards.push(topCard);
		}
		return removedCards;
	}

	add(cards,toTop){
		toTop = (toTop == false) ? false : true;
		if (!(Array.isArray(cards))){
			cards = [cards];
		}
		for (var i = 0; i <= cards.length - 1; i++) {
			if (!(cards[i] instanceof Card)){
				throw 'Attempted to add a non-Card element to Pile!';
			}
			if (toTop){
				this.cards.unshift(cards[i]);
			} else {
				this.cards.push(cards[i]);
			}
		}
		return this.cards;
	}

	draw(number){
		return this.remove(number);
	}
}

class StandardDeck extends Pile{
	constructor(seed) { 
		let cards = [];
		let standardSuits = [
			new Suit('spades','♠','4'),
			new Suit('hearts','♥','3'),
			new Suit('clubs','♣','2'),
			new Suit('diamonds','♦','1')
		];
		let standardNames = [
			"ace","two","three","four","five","six","seven","eight","nine","ten","jack","queen","king"
		];
		for (var i = 0; i <= standardSuits.length - 1; i++) {
			for (var j = 0; j <= standardNames.length - 1; j++) {
				let newCard = new Card(
					standardSuits[i],
					standardNames[j],
					`${standardNames[j].capitalize()} of ${standardSuits[i].name.capitalize()}`,
					`${j>0&&j<10?j+1:standardNames[j].charAt(0).toUpperCase()}${standardSuits[i].symbol}`,
					j+1
				);
				cards.push(newCard);
			}
		}
		super(cards);
		seed == undefined ? this.sort() : this.shuffle(seed);
	}
}

