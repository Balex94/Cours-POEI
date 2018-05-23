var i = 0, prop = null, obj = {"name":"Dark Vador", "job":"Sith Lord" };
// boucle for
for (i = 0; i < 10; i++) {
    console.log(i);
}

// boucle while
i = 0;
while (i < 10) {
    console.log(i++);
}

// boucle do while
i = 0;
do {
    console.log(i++);
}
while (i < 10)

//boucle for in
for (prop in obj) {
    console.log(prop, obj[prop]);
}

