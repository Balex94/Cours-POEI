var sith_lord = {
    name: "Dark Vador",
    whoIsTheSithLord: function () {
        console.log(this.name);
    }
};

// affiche Dark Vador
sith_lord.whoIsTheSithLord();

// affiche undefined, this vaut window ici...
var func = sith_lord.whoIsTheSithLord;
func();

// affiche Dark Vador car le contexte (this) est lié à sith_lord
func = sith_lord.whoIsTheSithLord.bind(sith_lord);
func();