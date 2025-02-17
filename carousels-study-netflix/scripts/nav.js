/*
const nav = document.getElementsByTagName("nav")[0];

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    nav.classList.add("nav-dark");
  } else {
    nav.classList.remove("nav-dark");
  }
});
*/
$('.slider').slick({
  inifinite: true,
  slidesToShow: 5,
  slidesToScroll: 5,
});
