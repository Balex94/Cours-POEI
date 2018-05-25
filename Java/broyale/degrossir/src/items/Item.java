package items;

import fighters.ICombattant;

public class Item{

	public int price;
	public String name;
	
	public Item( String p_name, int p_price) {
		this.name = p_name;
		this.price = p_price;
	}
	
	public void use( ICombattant p_warrior) {
		System.out.println(p_warrior.getName() + " use item: " + this.name);
	}
	
	

}
