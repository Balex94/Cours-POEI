package Base;

public class Personnage {
	
	protected int or;
	protected String name;
	protected Inventaire inventaire;
	public int life;

	public Personnage(int p_or, String p_name) {
		this.or = p_or;
		this.name = p_name;
		this.inventaire = new Inventaire();
		this.life = 100;
	}

	public void acheter(Object p_object) {
		this.or = this.or - p_object.price;
		this.inventaire.addObject(p_object);
		
	}
	
	public void vendre(Object p_object) {
		this.or = this.or + p_object.price;
		this.inventaire.deleteObject(p_object);
	}

	public int getGold() {
		return this.or;
	}

	public boolean isAlive(Personnage p_perso) {
		return p_perso.life >= 1;
	}
}
