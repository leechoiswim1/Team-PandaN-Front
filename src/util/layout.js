window.addEventListener("DOMContentLoaded", runFunction);

// * == Run!!!! ======== * //
function runFunction(){
  // mainHeight();
  sidebar();
  resizingTimeoutFunction();
  // readDeviceOrientation();
}

// * == (Read device orientation) ======== * //
// function readDeviceOrientation() {
//   window.addEventListener("orientationchange", function() {
//     setTimeOutF(mainHeight);
//   }, false);
// }

// * == (Resizing) ======== * //
function resizingTimeoutFunction(){
  setTimeOutF(resizing);

  function resizing(){
    window.onresize = sidebar;
  }
}

// function resizeAll(){
//   // mainHeight();
//   sidebar();
// }

// * == (SetTimeOut) ======== * //
function setTimeOutF(rsto){
  var resizingTimeout;

  clearTimeout(resizingTimeout);
  resizingTimeout = setTimeout(rsto, 300);
}

// * == (Detect main height) ======== * //
// function mainHeight(){
//   const header           = document.getElementById("header");
//   const main             = document.getElementById("content");
//   const sidebar          = document.getElementById("sidebar");

//   const headerH          = header.getBoundingClientRect().height || 0;
//   const mainH            = main.getBoundingClientRect().height || 0;
//   const windowH          = window.innerHeight ||
//                           document.documentElement.clientHeight ||
//                           document.body.clientHeight;

//   const mainMinH         = windowH - headerH;

//   main.style.minHeight = mainMinH + "px";
//   sidebar.style.minHeight = mainMinH + "px";

//   if (mainH < mainMinH) {
//     main.style.minHeight = mainMinH + "px";
//   }
// }

// * == (Mobile sidebar) ======== * //
function sidebar(){
  const body           = document.getElementsByTagName("body")[0];
  const btnHamburger   = document.getElementById("btn-hamburger");
  const btnClose       = document.getElementById("btn-close-sidebar");

  const windowW          = window.innerWidth ||
                          document.documentElement.clientWidth ||
                          document.body.clientWidth;

  const screenLg = 1200;
  const screenSm = 768;

  btnClose.onclick = function(){
    body.classList.remove("sidebar-active");
  }

  btnHamburger.onclick = function(){
    body.classList.toggle("sidebar-active");
  }
  
  if(windowW >= screenLg){
    // 1200px ~
    body.classList.remove(...body.classList);
    body.classList.add("screen-lg");
    body.classList.add("sidebar-active");

  } 
  else if(windowW >= screenSm && windowW < screenLg){
    // 768px ~ 1200px
    body.classList.remove(...body.classList);
    body.classList.add("screen-md");
  } 
  else if(windowW < screenSm){
    // ~767px
    body.classList.remove(...body.classList);
    body.classList.add("screen-sm");
  }
}
