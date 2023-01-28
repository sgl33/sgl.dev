/* 
 * For slideshow HTML pages
 */




var slideIndex = 1;
showSlides(slideIndex);

window.onload = showSlides(slideIndex);


var viewPopupMsgs = document.getElementsByClassName("view-popup");
for(i=0; i<viewPopupMsgs.length; i++)
{
    viewPopupMsgs[i].innerHTML = "View Original";
}


function openImagePopup(url)
{
    window.open(url, '_blank', 'height=540, width=960');
}

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) 
{
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  
  // Wrap
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
}


