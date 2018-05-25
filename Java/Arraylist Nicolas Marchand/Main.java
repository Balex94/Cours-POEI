package degrossir;

import java.util.ArrayList;

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
	
	public static void printInventory( ArrayList<Item> items) {
		for( int i = 0; i < items.size(); i++ ) {
			
			if( items.get(i) != null ) {
				System.out.println(items.get(i).name);
			}
		}
	}
}
