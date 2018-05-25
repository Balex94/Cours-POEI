package items;

import fighters.IThief;

public class AgilityPotion extends Item {
	
	public AgilityPotion() {
		super( "Agility Potion", 20);
	}
	
	public void use( IThief p_warrior ) {
		super.use(p_warrior);
		p_warrior.setAgility(p_warrior.getAgility() + 30);
	}
}
