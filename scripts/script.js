function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);

  if (section) {
    const startPosition = window.scrollY;
    const targetPosition = section.getBoundingClientRect().top + window.scrollY;

    const duration = 1000;
    const startTime = performance.now();

    function animateScroll(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      window.scrollTo(
        0,
        startPosition + (targetPosition - startPosition) * ease,
      );

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }

    requestAnimationFrame(animateScroll);
  }
}

document.getElementById("price-button").addEventListener("click", function () {
  window.open("src/Прайс-лист_от_21.10.2026.pdf", "_blank");
});

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
