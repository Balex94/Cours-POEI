var files = event.target.files;
var i = files.length;
var myfile = null;

while (--i > -1) {
    myfile = files[i];
    // affichage des informations concernant le fichier
    console.log(myfile.name, myfile.size, myfile.tyoe);
}