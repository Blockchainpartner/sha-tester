function decypher(){
  var file = document.getElementById("file").files[0];
  if (file) {
      var reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = function (evt) {
          var cypher = evt.target.result;
          document.getElementById("cypher").innerHTML = cypher;
          const digest = crypto.subtle.digest('SHA-256', cypher);
          console.log(digest)
          document.getElementById("digest").innerHTML = digest.toString();
      }
      reader.onerror = function (evt) {
          document.getElementById("cypher").innerHTML = "error reading file";
      }
  }
}
