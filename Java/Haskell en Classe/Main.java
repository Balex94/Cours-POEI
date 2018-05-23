package Base;

import java.lang.System;
import Base.Frog;
import Base.Haskell;
import Base.Mare;


public class Main {

	public static void main(String[] args) {
		
		Mare[] mares = {
				
				new Mare(60,0),
				new Mare(40,0),
				new Mare(10,0),
				new Mare(20,0),
				new Mare(30,0),
				new Mare(80,0),
				new Mare(60,0),
				new Mare(17,0)
				
		};
		
		Frog frogs = new Frog(53);
		
		Haskell haskell = new Haskell(0);
		
		for (int i = 0; i < frogs.nbFrog; i++) {
			mares = Main.sortMares(mares);
			mares[0].nbGrenouille++;
			haskell.distanceParcourue = mares[0].distance * 2 + haskell.distanceParcourue;
			
		}
		
		mares = Main.sortMares(mares);
		
		
		
		}
	 
	public static Mare[] sortMares(Mare[] p_mares) {
		
		int i 			= 0;
		int j 			= 0;
		int max 		= p_mares.length - 1;
		int max2 		= p_mares.length - 1;
		
		Mare current 	= null;
		Mare next 		= null;
		
		
		for( i = 0; i < max; i++ ) {
			
			
			for( j = 0; j < max2; j++ ) {
			
			current = p_mares[j];
			next 	= p_mares[j+1];
			
			// si la population de grenouilles est supérieure
			// ou la population est égale mais la distance est supérieure
				if( 
					 ( current.nbGrenouille > next.nbGrenouille ) 
					 
					 	||
					 	
					 (		
							 current.nbGrenouille == next.nbGrenouille && current.distance > next.distance
					 )
					 
				) 
				{
					
					p_mares[j+1] = current;
					p_mares[j] = next;
					
				}
			}
		}
		return p_mares;
	}


}
	
