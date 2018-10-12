function setRem(){
    var clientWidth = document.documentElement.clientWidth;
    if(clientWidth >= 750){
        clientWidth = 750;
    }

    document.getElementsByTagName('html')[0].style.fontSize = clientWidth / 750 * 200 + 'px';
}

setRem();
window.onresize = function(){
    setRem();
}