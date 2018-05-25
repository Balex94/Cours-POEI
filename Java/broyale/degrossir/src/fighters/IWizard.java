package fighters;

public interface IWizard extends ICombattant {

	public void setMana(int p_value);
	public int getMana();
	
	
	public void spell( ICombattant p_warrior);
}
