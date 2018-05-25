package items;

import fighters.ICombattant;

public class LifePotion extends Item {
	public LifePotion() {
		super( "Life Potion", 20);
	}
	
	public void use( ICombattant p_warrior ) {
		super.use(p_warrior);
		p_warrior.setLife( p_warrior.getLife() + 30);
	}
}
