function startUp (evt) {
  /*if(SWGetCookie('sw_javascriptauth_password') != 'aiueo'){
    $('#jMenu').find('.test').css('visibility', 'hidden');
  }*/
}
function SWGetCookie(name){
  var cookie = document.cookie;

  if(cookie && cookie.length > 0){
    var offset = cookie.indexOf(name + '=');
    var end;
    if(offset != -1){
      offset += name.length + 1;
      end = cookie.indexOf(';',offset);
      if(end == -1){
        end = cookie.length;
      }
      return unescape(cookie.substring(offset,end));
    }
  }
  return "";
}