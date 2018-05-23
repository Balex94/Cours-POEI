package degrossir;

public class Marchand {

	private int or;
	private Item[] inventaire;
	
	public Marchand() {
		this.or = 1000;
		this.inventaire = new Item[50];
	}
	
	public void deleteItem( Item p_item) {
		int i = 0;
		int max = this.inventaire.length;
		
		for( i = 0; i < max; i++ ) {
			if( this.inventaire[i] == p_item ) {
				this.inventaire[i] = null;
			}
		}
	}

	public void addItem( Item p_item ) {
		
		int max = this.inventaire.length - 1;
		
		this.sortInventory();
		
		if( this.inventaire[max] == null ) {
			this.inventaire[max] = p_item;
		}
	}
	
	public int getGold() {
		return this.or;
	}
	
	public Item[] getInventory() {
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
	
	
	private void sortInventory() {
		
		int i 		= 0;
		int j 		= 0;
		int max 	= this.inventaire.length - 1;
		
		for( i = 0; i < max; i++ ) {
			for( j = 0; j < max; j++ ) {
				
				if( this.inventaire[j] == null ) {
					
					this.inventaire[j] = this.inventaire[j+1];
					this.inventaire[j+1] = null;
					
				}
				
			}
		}
	}

}
