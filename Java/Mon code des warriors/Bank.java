package Base;

import java.util.ArrayList;

public class Bank {
	
	static private Bank maBanque = null;
	
	static public Bank getInstance() {
		if( Bank.maBanque == null ) {
			Bank.maBanque = new Bank();
		}

		
		return Bank.maBanque;
	}
	
	

	private int gold;
	static private ArrayList<BankAccount> bankAccount;
	
	private Bank() {
		this.gold = 0;
		this.bankAccount = new ArrayList<BankAccount>();
	}
	
	public void setGold(int p_value) {
		if( p_value > 0 ) {
			this.gold = p_value;
		}
	}
	
	public int getGold() {
		return this.gold;
	}
	
}
