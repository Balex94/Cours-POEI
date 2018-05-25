package Base;

public class Warrior extends Personnage {

	public Warrior(int p_or, String p_name) {
		super(p_or, p_name);
	}
	
	public void vendre(Object p_object) {
		super.vendre(p_object);
	}
	
	public void acheter(Object p_object) {
		super.acheter(p_object);
	}
	
	public boolean attack(Personnage p_perso) {
			if(p_perso.life > 0) {
				System.out.println(this.name+" attaque "+p_perso.name);
				p_perso.life = p_perso.life - 40;		
				if(p_perso.life < 0) {
					p_perso.life = 0;
				}
			}
			return isAlive(p_perso);
	}
	
	public boolean isAlive(Personnage p_perso) {
		return super.isAlive(p_perso);
	}
	
	public void drinkPotion(Object p_potion) {
		if(this.inventaire.has(p_potion)== true && p_potion.name == "Potion de vie") {
			this.life = this.life + 50;
			this.inventaire.deleteObject(p_potion);
		}
		
		if(this.life > 100) {
			this.life = 100;
		}
	}
	
	
}