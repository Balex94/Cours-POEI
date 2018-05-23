package Base;

import Base.Animal;

public class Main {

	public static void main(String[] args) {
		
		
		Animal[] animaux = {
				new Cacatoes(),
				new Lion(),
				new Lion(),
				new Cat(),
				new Lion(),
				new Cat(),
				new Zigounette()
		};
		
		for( int i = 0; i < animaux.length; i++) {
			animaux[i].doScream();
		}
		
	}
	
	

}
