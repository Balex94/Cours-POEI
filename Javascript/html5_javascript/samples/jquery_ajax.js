function whoIsTheSiteLord(data, status){
    console.log(data, status);
}

$.ajax({
    url: 'http://monsite.com/service.php',
    type: 'GET',
    success: whoIsTheSiteLord
});