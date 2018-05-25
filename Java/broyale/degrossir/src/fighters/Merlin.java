package fighters;

import java.util.ArrayList;

public class Merlin implements IBarbarian, IHealer, IThief  {
	
	private int gold;
	private int life;
	private int stamina;
	private int mana;
	private int agility;
	public String name;
	
	public Merlin() {
		this.setName("Merlin");
		this.setLife(200);
		this.setStamina(200);
		this.setAgility(200);
		this.setMana(200);
		this.setGold(500);
	}
	
	
	
	public void cut(ICombattant p_warrior) {
		
		double max = 30;
		
		if( p_warrior.getLife() < 30 ) {
			max = p_warrior.getLife();
		}
		
		if( this.stamina < max * 2 ) {
			max = this.stamina / 2;
		}
		
		p_warrior.recevoirDegats( (int)(max) );
		this.setStamina( (int)(this.stamina - (max * 2)) );	
	}

	
	public void doAction() {
		
	}		
	
	public ArrayList<ICombattant> getOpponents() {
		return null;
	}		
	
	public void dodge() {
		
	}	
	
	public void heal(ICombattant p_opponent) {
		
	}
	
	public void attaquer(ICombattant p_opponent) {
		p_opponent.recevoirDegats(10);
	}

	
	public void recevoirDegats(int p_degats) {
		this.life = ( this.life - p_degats < 0 ) ? 0 : this.life - p_degats;		
	}


	public int getLife() {
		return this.life;
	}


	public void setLife(int p_value) {
		this.life = ( this.life + p_value > 200 ) ? 200 : this.life + p_value;
	}


	public int getGold() {
		// TODO Auto-generated method stub
		return this.gold;
	}


	public void setGold(int p_value) {
		this.gold = ( this.gold + p_value > 500 ) ? 500 : this.gold + p_value;
		
	}


	public String getName() {
		return this.name;
	}


	public void setName(String p_value) {
		this.name = p_value;
	}


	public void setStamina(int p_value) {
		this.stamina = ( this.stamina + p_value > 200 ) ? 200 : this.stamina + p_value;
	}


	public int getStamina() {
		return this.stamina;
	}
	

	public void setAgility(int p_value) {
		this.agility = ( this.agility + p_value > 200 ) ? 200 : this.agility + p_value;
	}


	public int getAgility() {
		return this.agility;
	}
	

	public void setMana(int p_value) {
		this.mana = ( this.mana + p_value > 200 ) ? 200 : this.mana + p_value;
	}


	public int getMana() {
		return this.mana;
	}


}
