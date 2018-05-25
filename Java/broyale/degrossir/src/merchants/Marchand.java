package merchants;

import degrossir.Factory;
import fighters.ICombattant;
import items.Item;

public class Marchand {

	static private Marchand _instance = null;
	
	static public Marchand getInstance() {
		if( Marchand._instance == null )
			Marchand._instance = new Marchand();
		
		return Marchand._instance;
	}
	
	private Marchand() {}
	
	public Item buy( ICombattant p_buyer, String p_key ) {
		Item current = Factory.getItem(p_key);
		
		if( current == null || p_buyer.getGold() < current.price )
			return null;
		
		p_buyer.setGold( p_buyer.getGold() - current.price );
		return current;
	}
	

}
