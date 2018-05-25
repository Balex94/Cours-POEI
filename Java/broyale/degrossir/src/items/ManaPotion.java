package items;

import fighters.IHealer;
import fighters.IWizard;

public class ManaPotion extends Item {
	public ManaPotion() {
		super( "Mana Potion", 20);
	}
	
	public void use( IWizard p_warrior ) {
		super.use(p_warrior);
		p_warrior.setMana( p_warrior.getMana() + 30);
	}
	
	public void use( IHealer p_warrior ) {
		super.use(p_warrior);
		p_warrior.setMana( p_warrior.getMana() + 30);
	}
}
