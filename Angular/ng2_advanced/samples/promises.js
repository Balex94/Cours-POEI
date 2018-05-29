new Promise((resolve, reject) => {
    const xhr = new XmlHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
});

function resolve(p_msg){
    console.log("resolve: ", p_msg);
}

function reject(p_msg){
    console.log("reject: ", p_msg);
}