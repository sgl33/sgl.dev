
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
/**
 * @returns {Boolean} true if the user is on a mobile device
 */
function isMobile() 
{
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}


/**
 * Enables id with fade in animation
 * @param {*} id element to be enabled
 */
function openMenu(id)
{
    var box = $('#' + id);

    box.fadeIn(200);
    
    closeSideMenu();
}
/**
 * Enables id with fade in animation
 * @param {*} id element to be enabled
 */
function openMenuAndCollapseSideMenu(id)
{
    openMenu(id);
}
/**
 * Disables id with fade in animation
 * @param {*} id element to be disabled
 */
function closeMenu(id)
{
    var box = $('#' + id);

    box.fadeOut(200);
}

/**
 * Navigates the info box to the specified id
 * @param {*} id of the element to be shown
 */
function resumeNavigate(id)
{
    var contentIds = ['r-default', 'r-bio', 'r-education', 'r-skills', 
        'r-awards', 'r-links', 'r-resume'];

    if(document.getElementById(id).style.display === 'block') 
    {
        document.getElementById(id).style.display = 'none';
        document.getElementById('r-default').style.display = 'block';
    }
    else
    {
        for(i=0; i<contentIds.length; i++)
        {
            if(contentIds[i] === id)
                document.getElementById(contentIds[i]).style.display = 'block';
            else
                document.getElementById(contentIds[i]).style.display = 'none';
        }
    }

    parent.resizeIframe(this.frameElement); 
}

/**
 * Opens side menu
 */
function openSideMenu()
{
    if(!isMobile()) // PC or tablet
    {
        var menuWidth = "250px";
        document.getElementById("p-sidemenu").style.width = menuWidth;
        document.getElementById("main").style.marginRight = menuWidth;
        
        var x = document.getElementsByClassName("side-menu-close");
        for(var i=0; i<x.length; i++)
            x[i].style.display = "block";
        
        var y = document.getElementsByClassName("menu-item");
        for(var i=0; i<y.length; i++)
            y[i].style.display = "inline-block";
    }
    else // Mobile
    {
        var menuHeight = "296px";
        document.getElementById("p-sidemenu-mobile").style.height = menuHeight;
        document.getElementById("p-sidemenu-mobile").style.maxHeight = menuHeight;
        document.getElementById("main").style.marginTop = menuHeight;
        
        var x = document.getElementsByClassName("side-menu-close");
        for(var i=0; i<x.length; i++)
            x[i].style.display = "block";
        
        var y = document.getElementsByClassName("menu-item");
        for(var i=0; i<y.length; i++)
            y[i].style.display = "inline-block";
    }
}

/**
 * Closes side menu
 */
function closeSideMenu()
{
    if(!isMobile()) // PC or tablet
    {
        document.getElementById("p-sidemenu").style.width = "0";
        document.getElementById("main").style.marginRight = "0";
        
        var x = document.getElementsByClassName("side-menu-close");
        for(var i=0; i<x.length; i++)
            x[i].style.display = "none";
        
        var y = document.getElementsByClassName("menu-item");
        for(var i=0; i<y.length; i++)
            y[i].style.display = "none";
    }
    else // Mobile
    {
        document.getElementById("p-sidemenu-mobile").style.height = "0";
        document.getElementById("main").style.marginTop = "0";
        
        var x = document.getElementsByClassName("side-menu-close");
        for(var i=0; i<x.length; i++)
            x[i].style.display = "none";
        
        var y = document.getElementsByClassName("menu-item");
        for(var i=0; i<y.length; i++)
            y[i].style.display = "none";
    }
}

closeSideMenu(); // init
detectMobileDevice();
