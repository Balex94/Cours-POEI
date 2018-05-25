package items;

import fighters.IBarbarian;

public class StamPotion extends Item {
	public StamPotion() {
		super( "Stamina Potion", 20);
	}
	
	public void use( IBarbarian p_warrior ) {
		super.use(p_warrior);
		p_warrior.setStamina( p_warrior.getStamina() + 30);
	}
}
