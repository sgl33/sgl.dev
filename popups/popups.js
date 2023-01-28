/**
 * Detects if the user is on a mobile device and if so, changes the height 
 * of the slideshow boxes
 */
function detectMobileDevice()
{
    if(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    {
        var slideshows = document.getElementsByClassName("slideshow-box");

        for(i=0; i<slideshows.length; i++) {
            slideshows[i].style.height = '285px';
        }
    }
}

detectMobileDevice();