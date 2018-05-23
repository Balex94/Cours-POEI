package degrossir;

import java.lang.System;
import java.util.Scanner;

public class Main {

	public static void main(String[] args) {
		
		int total = 0;
		int[][] mares = {
				{60,0}, 
				{40,0},
				{10,0},
				{20,0},
				{30,0},
				{80,0},
				{60,0},
				{17,0}
		};
		
		int i = 0;
		int grenouilles = 53;
		
	
		
		for ( i = 0; i < grenouilles; i++ ) {
			
			mares = Main.sortMares(mares);
			mares[0][1]++;
			total += mares[0][0] * 2;
			
		}
		
		mares = Main.sortMares(mares);
		
		for ( i = 0; i < mares.length; i++ ) {
			
			System.out.println(mares[i][1] +":"+ mares[i][0]);
			
		}
		
		System.out.println("Haskell a parcouru: " + total + "km");
		
	}
	
	public static int[][] sortMares( int[][] p_mares ){
		
		int i 			= 0;
		int j 			= 0;
		int max 		= p_mares.length - 1;
		int max2 		= p_mares.length - 1;
		
		int[] current 	= null;
		int[] next 		= null;
		
		
		for( i = 0; i < max; i++ ) {
			
			
			for( j = 0; j < max2; j++ ) {
			
			current = p_mares[j];
			next 	= p_mares[j+1];
			
			// si la population de grenouilles est supérieure
			// ou la population est égale mais la distance est supérieure
				if( 
					 ( current[1] > next[1] ) 
					 
					 	||
					 	
					 (		
						current[1] == next[1] && current[0] > next[0] 
					 )
					 
				) 
				{
					
					p_mares[j+1] = current;
					p_mares[j] = next;
					
				}
			}
			
			//max2--;
			
		}
		
		return p_mares;
		
	}

}
