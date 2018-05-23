package Base;

public class Employee {
	
	public Employee( 
			String p_name, 
			String p_sex, 
			int p_age, 
			int p_weight
	) {
		this.age 	= p_age;
		this.weight = p_weight;
		this.name 	= p_name;
		this.sex 	= p_sex;
	}
	
	public int getSexValue() {
		
		if( this.sex.equals("F") ) {
			return 0;
		}
		else {
			return 1;
		}
		
	}

	public int age;
	public int weight;
	public String name;
	public String sex; 
	
}
