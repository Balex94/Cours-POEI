package fighters;

import java.util.ArrayList;

public interface ICombattant {

	public void doAction();
	
	public void attaquer( ICombattant p_opponent );
	public void recevoirDegats( int p_degats );
	
	public int getLife();
	public void setLife(int p_value);
	
	public int getGold();
	public void setGold(int p_value);
	
	public String getName();
	public void setName( String p_value);
	
	public ArrayList<ICombattant> getOpponents();
	
	
}
