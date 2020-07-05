class Deck {
	constructor() {    
		this.cards = [];
	}

	shuffle() {

	}
}

class Card {
	constructor(suit,name,shorthand,value,htmlElement) {    
		this.suit = suit;
		this.name = name;
		this.shorthand = shorthand;
		this.value = value;
		this.htmlElement = htmlElement;
	}
}