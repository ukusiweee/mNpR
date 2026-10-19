function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
      duration: 1000,
    });
  }
}

// function scrollToTop() {
//   window.scrollTo({
//     top: 0,
//     behavior: "smooth",
//   });
// }

// // Показать/скрыть кнопку "Наверх" при прокрутке
// window.onscroll = function () {
//   var backToTopButton = document.getElementById("back-to-top");
//   if (document.documentElement.scrollTop > 100) {
//     backToTopButton.style.display = "block";
//   } else {
//     backToTopButton.style.display = "none";
//   }
// };
