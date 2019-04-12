function encrypt(){
  var file = document.getElementById("file").files[0];
  var SHA256 = CryptoJS.algo.SHA256.create();
  var counter = 0;
  var self = this;

  loading(file,
   function (data) {
      var wordBuffer = CryptoJS.lib.WordArray.create(data);
      SHA256.update(wordBuffer);
      counter += data.byteLength;
      console.log((( counter / file.size)*100).toFixed(0) + '%');
   }, function (data) {
      console.log('100%');
      var encrypted = SHA256.finalize().toString();
      console.log('encrypted: ' + encrypted);
      document.getElementById("digest").innerHTML = "0x" + encrypted;
   });
}

function loading(file, callbackProgress, callbackFinal) {
   var chunkSize  = 1024*1024; // bytes
   var offset     = 0;
   var size=chunkSize;
   var partial;
   var index = 0;

   if(file.size===0){
      callbackFinal();
   }
   while (offset < file.size) {
      partial = file.slice(offset, offset+size);
      var reader = new FileReader;
      reader.size = chunkSize;
      reader.offset = offset;
      reader.index = index;
      reader.onload = function(evt) {
         callbackRead(this, file, evt, callbackProgress, callbackFinal);
      };
      reader.readAsArrayBuffer(partial);
      offset += chunkSize;
      index += 1;
   }
}

var lastOffset = 0;
function callbackRead(reader, file, evt, callbackProgress, callbackFinal){
   if(lastOffset === reader.offset) {
      // in order chunk
      lastOffset = reader.offset+reader.size;
      callbackProgress(evt.target.result);
      if ( reader.offset + reader.size >= file.size ){
         callbackFinal();
      }
   } else {
      // not in order chunk
      timeout = setTimeout(function () {
         callbackRead(reader,file,evt, callbackProgress, callbackFinal);
      }, 10);
   }
}
