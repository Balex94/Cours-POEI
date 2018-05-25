package degrossir;

import java.util.HashMap;

import items.Item;

public class Factory {

	
	private static HashMap<String, Class> dico = new HashMap<String, Class>();

	
	public Factory() {
		// TODO Auto-generated constructor stub
	}
	
	
	static public void addDefinition( String p_key, Class p_class) {
		Factory.dico.put(p_key, p_class);
	}
	
	static public Item getItem( String p_key ) {
		
		if( Factory.dico.containsKey(p_key) == false )
			return null;
		
		Class dyn = Factory.dico.get(p_key);
		
		try {
			
			return (Item) dyn.newInstance();
			
		}catch(Exception e) {
			return null;
		}
		
	}
	


}
