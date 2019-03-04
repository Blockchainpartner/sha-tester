var file = document.getElementById("file").files[0];
if (file) {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
        var cypher = evt.target.result;
        document.getElementById("cypher").innerHTML = cypher;
        const digest = crypto.subtle.digest('SHA-256', cypher);
        document.getElementById("digest").innerHTML = digest;
    }
    reader.onerror = function (evt) {
        document.getElementById("cypher").innerHTML = "error reading file";
    }
}
