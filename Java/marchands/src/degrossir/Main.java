package degrossir;

import degrossir.*;

public class Main {

	public static void main(String[] args) {
		Marchand alibaba = new Marchand();
		Marchand venec = new Marchand();
		
		Item vin = new Item("vin", 20);
		venec.addItem(vin);
		
		venec.vendre(vin);
		alibaba.acheter(vin);
		
		Main.printInventory(alibaba.getInventory());
		
		System.out.println(alibaba.getGold());
		System.out.println(venec.getGold());
		
	}
	
	public static void printInventory( Item[] items) {
		for( int i = 0; i < items.length; i++ ) {
			
			if( items[i] != null ) {
				System.out.println(items[i].name);
			}
		}
	}
}
