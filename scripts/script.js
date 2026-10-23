const intro = document.getElementById("intro");
const video = document.getElementById("introVideo");
const soundButton = document.getElementById("introSound");
const skipButton = document.getElementById("introSkip");
const preloader = document.getElementById("preloader");

document.documentElement.classList.add("no-scroll");
document.body.classList.add("no-scroll");

let introClosed = false;
let introTimer = null;
let videoStarted = false;

function updateSoundButton() {
  if (!soundButton) return;

  if (!videoStarted) soundButton.textContent = "Запустить видео";
  // soundButton.textContent = videoStarted ? "Включить звук" : "Запустить видео";
}

function closeIntro() {
  if (introClosed) return;

  introClosed = true;
  clearTimeout(introTimer);

  intro.classList.add("intro--hidden");
  video.pause();

  document.documentElement.classList.remove("no-scroll");
  document.body.classList.remove("no-scroll");

  setTimeout(() => intro.remove(), 800);
}

async function startIntro() {
  const minLoadingTime = new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });

  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();

  const videoReady = new Promise((resolve) => {
    if (video.readyState >= 3 || video.error) {
      resolve();
      return;
    }

    video.addEventListener("canplay", resolve, { once: true });
    video.addEventListener("error", resolve, { once: true });
  });

  video.pause();

  await Promise.all([minLoadingTime, fontsReady, videoReady]);

  if (introClosed) return;

  preloader.classList.add("preloader--hidden");

  try {
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    await video.play();

    videoStarted = !video.paused && !video.ended;
  } catch (error) {
    videoStarted = false;
    console.log("Автозапуск видео не удался:", error);
  }

  updateSoundButton();

  setTimeout(() => {
    preloader.remove();
  }, 600);

  if (video.error && !introTimer) {
    introTimer = setTimeout(closeIntro, 5000);
  }
}

video.addEventListener("playing", () => {
  videoStarted = true;
  updateSoundButton();
});

video.addEventListener("pause", () => {
  if (!video.ended) {
    videoStarted = false;
    updateSoundButton();
  }
});

video.addEventListener("ended", () => {
  videoStarted = false;
  closeIntro();
});

soundButton.addEventListener("click", async () => {
  try {
    video.muted = false;
    video.removeAttribute("muted");

    if (!videoStarted || video.paused) {
      await video.play();
    }

    videoStarted = !video.paused;

    if (videoStarted) {
      soundButton.remove();
    }
  } catch (error) {
    console.error("Не удалось запустить видео со звуком:", error);
  }
});

skipButton.addEventListener("click", closeIntro);

video.addEventListener("error", () => {
  if (!introClosed && !introTimer) {
    introTimer = setTimeout(closeIntro, 5000);
  }
});

startIntro();

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
