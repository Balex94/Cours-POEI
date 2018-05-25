package Base;

import java.util.ArrayList;


public class Main {

	public static void main(String[] args) {
		
		Bank banquePostale = Bank.getInstance();
		
		Marchand venec = new Marchand(1000, "Venec");
		Warrior arthur = new Warrior(1000, "Arthur");
		Magician merlin = new Magician(1000, "Merlin");
		
		
		
		Object lifePotion = new Object(100, "Potion de vie");
		Object manaPotion = new Object(100, "Potion de mana");
		
		

		
		
	}
	
	public static void printInventory( ArrayList<Object> objet) {
		
		for( int i = 0; i < objet.size(); i++ ) {
			if( objet.get(i) != null ) {
				System.out.println(objet.get(i).name+" "+ objet.get(i).price);
			}
		}
	}
	
	public static void printState(Warrior p_warrior) {
		System.out.println(p_warrior.name+" a "+p_warrior.life+" points de vie");
	}
	
	public static void printState(Magician p_magician) {
		System.out.println(p_magician.name+" a "+p_magician.life+" points de vie et "+p_magician.mana+" de mana");
	}
}