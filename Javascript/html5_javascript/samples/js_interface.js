var IPersonnage = {
    sayHello: function(){},
    name: null
};

function Personnage(){}

// emulation d'une implementation d'interface IPersonnage
for( var prop in IPersonnage ){
    Personnage.prototype[prop] = IPersonnage[prop];
}