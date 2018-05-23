package Base;

abstract public class Animal {
	
	
	protected String name;
	protected String scream;
	
	
	public Animal( String p_name, String p_scream ) {
		this.name = p_name;
		this.scream = p_scream;
	}
	
	abstract public void doScream();

}

