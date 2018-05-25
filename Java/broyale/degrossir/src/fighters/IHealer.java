package fighters;

public interface IHealer extends ICombattant{
	
	public void setMana(int p_value);
	public int getMana();
	
	public void heal( ICombattant p_warrior);
	
}
