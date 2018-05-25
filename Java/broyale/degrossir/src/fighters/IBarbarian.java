package fighters;

public interface IBarbarian extends ICombattant{
	public void setStamina(int p_value);
	public int getStamina();
	
	public void cut( ICombattant p_warrior);
}
