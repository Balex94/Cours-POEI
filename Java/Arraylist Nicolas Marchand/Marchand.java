package degrossir;

import java.util.ArrayList;

public class Marchand {

	private int or;
	private ArrayList<Item> inventaire;
	
	public Marchand() {
		this.or = 1000;
		this.inventaire = new ArrayList<Item>();
	}
	
	public void deleteItem( Item p_item) {
		this.inventaire.remove(p_item);
	}

	public void addItem( Item p_item ) {

		if( this.inventaire.contains(p_item) == false)
			this.inventaire.add(p_item);
	}
	
	public int getGold() {
		return this.or;
	}
	
	public ArrayList<Item> getInventory() {
		return this.inventaire;
	}
	
	public void vendre( Item p_item ) {
		this.or += p_item.price;
		this.deleteItem(p_item);
	}
	
	public void acheter(Item p_item) {
		this.or -= p_item.price;
		this.addItem(p_item);
	}
	

}
