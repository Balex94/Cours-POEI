function Utils(){}

Utils.getNormal = function(vec1, vec2)
{
	var x = ( vec1[1] * vec2[2] ) - ( vec1[2] * vec2[1] );
	var y = ( vec1[2] * vec2[0] ) - ( vec1[0] * vec2[2] );
	var z = ( vec1[0] * vec2[1] ) - ( vec1[1] * vec2[0] );
	
	return [x,y,z];
};


Utils.normalize = function(vec)
{
	var x = vec[0];
	var y = vec[1];
	var z = vec[2];
	var len = Math.sqrt( (x*x) + (y*y) + (z*z) );
	
	x/=len;
	y/=len;
	z/=len;
	
	return [x,y,z];
};
