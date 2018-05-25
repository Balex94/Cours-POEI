package Base;

import java.util.ArrayList;
import java.util.Comparator;

public class Inventaire {
	
	public Inventaire() {
		this.inventaire = new ArrayList<Object>();
		}
	
	public boolean deleteObject(Object p_object) {
		return this.inventaire.remove(p_object);
	}
	
	public boolean addObject(Object p_object) {
		if(inventaire.size() < 50) {
			this.inventaire.add(p_object);
			return true;		
		}
		else
		{
			return false;
		}
	}
	
	public ArrayList<Object> getInventory() {
		return this.inventaire;
	}
	
	public void sortByPrice(Inventaire p_inventaire){
		
		this.inventaire.sort( 
				
				new Comparator<Object>() {
				
					public int compare( Object a , Object b) {
						if( a.price > b.price ) {
							return 1;
						}
						else if( a.price == b.price ) {
							return 0;
						}
						else {
							return -1;
						}
					}
				
				}
			);
	}
	
	public boolean replaceObject( Object p_objectOld, Object p_objectNew ) {
		if(this.inventaire.contains(p_objectOld)== false) {
			return false;
		}
		else
		{
			int index = this.inventaire.indexOf(p_objectOld);
			this.inventaire.set(index, p_objectNew);
			return true;
		}
	}
	
	public boolean has(Object p_object)
	{
		return this.inventaire.contains(p_object);
	}
	
	protected ArrayList<Object> inventaire;
	
	

}
