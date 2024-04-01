/* Functionality includes ability to use left/right arrows to
   skip through images, or any other button to close modal. */

function openModal() {
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}

document.addEventListener("keydown", keyPress, false);

function keyPress(e) {
  var keyCode = e.keyCode //check which key is pressed
  //check if modal is actively displayed
  if(document.getElementById('myModal').style.display == 'block'){ 

    if(keyCode==37) { //left arrow
        plusSlides(-1);
    } else if (keyCode ==39){ //right arrow
        plusSlides(1);
    } else { //any other button
        closeModal() 
    }
  }
}

