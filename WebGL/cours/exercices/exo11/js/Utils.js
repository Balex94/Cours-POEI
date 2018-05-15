function Utils(){}

Utils.getNormal = function(vec1, vec2)
{
	var x = ( vec1[1] * vec2[2] ) - ( vec1[2] * vec2[1] );
	var y = ( vec1[2] * vec2[0] ) - ( vec1[0] * vec2[2] );
	var z = ( vec1[0] * vec2[1] ) - ( vec1[1] * vec2[0] );
	
	return [x,y,z];
};

Utils.getData	= function(url)
{
	var http = new XMLHttpRequest();
	var obj = null;
	http.open("GET",url, false); // synchronous call
	http.send();
	
	str = http.responseText;
	obj = JSON.parse(str);
	
	return obj;
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

Utils.distanceFromCamera = function(mesh, camera)
{
	var vec1 = [0, 0, 0, 1.0];
	var mat = mat4.create();
	
	mat4.identity(mat);
	mat4.multiply(mat, camera.matrix);
	mat4.multiply(mat, mesh.matrix);
	mat4.multiplyVec4(mat, vec1);
	
	var distX = (mesh.x - vec1[0]) * (mesh.x - vec1[0]);
	var distY = (mesh.y - vec1[1]) * (mesh.y - vec1[1]);
	var distZ = (mesh.z - vec1[2]) * (mesh.z - vec1[2]);
	var segLength = Math.sqrt( distX + distY + distZ);
	
	return segLength;
};
