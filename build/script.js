window.onload=function(){
  let menuicn = document.getElementById("menuicn");
  let nav = document.getElementById("navcontainer");
  menuicn.onclick=function(){
    console.log(nav.classList)
    nav.classList.toggle("navclose");
  }
}