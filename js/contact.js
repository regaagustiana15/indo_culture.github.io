function emailSend(){

   var userName = document.getElementById('name').value;
   var email = document.getElementById('email').value;
   var phone = document.getElementById('nomor').value;
   var descripsi = document.getElementById('keterangan').value;

   var messageBody = "Name " + userName +
   "<br/> Email " + email +
   "<br/> Phone " + phone +
   "<br/> Keterangan " + descripsi;
   Email.send({
   Host : "smtp.elasticemail.com",
   Username : "regaagustiana15@gmail.com",
   Password : "59B25CDDA21A6A79D465CC5F753F46EDC447",
   To : '234260022.mhs@stmikjabar.ac.id',
   From : "regaagustiana15@gmail.com",
   Subject : "This is the subject",
   Body : messageBody
}).then(
 message => {
     if(message=='OK'){
         swal("Successful", "You clicked the button!", "success");
     }
     else{
         swal("Error", "You clicked the button!", "error");
     }
 }
);
}

