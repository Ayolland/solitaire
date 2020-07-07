class TurnManager {
	constructor(player){
		this.player = player;
		this.lastTurnReceived = null;
		this.lastTurnResolved = null;
		this.log = [];
	}

	runTurn(input){
		if(this.lastTurnResolved == this.lastTurnReceived){
			this.lastTurnReceived++;
			console.log(`${this.player.name}: Running turn ${this.lastTurnReceived}`);
			this.player.turnLogic(input);
			return true;
		} else {
			throw `${this.player.name}: Turn ${this.lastTurnReceived} has not been resolved yet.`
		}
	}
}

class Player{
	constructor(name){
		this.name = name || 'Player';
		this.turnManager = new TurnManager(this);
		this.score = 0;
		this.hand = [];
		this.deck = new StandardDeck();
		this.discard = new Pile();
		this.playfield = [];
		for (var i = 0; i < 5; i++) {
			this.playfield.push([]);
		}
	}

	runTurn(input){
		return this.turnManager.runTurn(input);
	}

	turnLogic(input){
		// not real obvs
		let thisPlayer = this;
		setTimeout(function(player){player.turnManager.lastTurnResolved++;},1000,thisPlayer);
	}
}

class Game {
	constructor(){
		this.player = new Player();
	}
}