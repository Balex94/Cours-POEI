function RenderTask(program,material,translucent)
{
	this.init(program,material,translucent);
}

RenderTask.prototype.id			= 0;
RenderTask.prototype.program 	= null;
RenderTask.prototype.material 	= null;
RenderTask.prototype.meshes 	= null;
RenderTask.prototype.translucent= false;

RenderTask.prototype.init = function(program,material,translucent)
{
	this.meshes 		= new Array();
	this.program 		= program;
	this.material 		= material;
	this.translucent 	= translucent;
};

RenderTask.prototype.clean = function()
{
	this.meshes = new Array();
};


RenderTask._tasks = new Array();


RenderTask.clean = function()
{
	var task = null;
	var tab = RenderTask._tasks;
	var i = tab.length;
	
	while( --i > -1 )
	{
		task = tab[i];
		task.clean();
	}
};


RenderTask.getOpaques = function()
{
	var task = null;
	var tab = RenderTask._tasks;
	var result = new Array();
	var i = tab.length;
	
	while( --i > -1 )
	{
		if( tab[i].translucent === false )
		{
			result.push(tab[i]);
		}
	}
	
	return result;
};

RenderTask.getTranslucents = function()
{
	var task = null;
	var tab = RenderTask._tasks;
	var result = new Array();
	var i = tab.length;
	
	while( --i > -1 )
	{
		if( tab[i].translucent === true )
		{
			result.push(tab[i]);
		}
	}
	
	return result;
};

RenderTask.getAllTasks = function()
{
	return RenderTask._tasks;
};

RenderTask.getTask = function(program,material,translucent)
{
	var task = null;
	var tab = RenderTask._tasks;
	var i = tab.length;
	
	while( --i > -1 )
	{
		if( tab[i].program.id == program.id &&
			tab[i].material.id == material.id &&
			tab[i].translucent === translucent )
		{
			return tab[i];
		}
	}
	
	task = new RenderTask(program, material, translucent);
	tab.push(task);
	return task;
};
