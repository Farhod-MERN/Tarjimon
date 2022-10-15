const fromText = document.querySelector(".from-text"),
  toText = document.querySelector(".to-text"),
  exchageIcon = document.querySelector(".exchange"),
  selectTag = document.querySelectorAll("select"),
  icons = document.querySelectorAll(".row i");
(translateBtn = document.querySelector(".tarjima")),
  selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
      let selected =
        id == 0
          ? country_code == "uz-UZ"
            ? "selected"
            : ""
          : country_code == "en-GB"
          ? "selected"
          : "";
      let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
      tag.insertAdjacentHTML("beforeend", option);
    }
  });

exchageIcon.addEventListener("click", () => {
  let tempText = fromText.value,
    tempLang = selectTag[0].value;
  fromText.value = toText.value;
  toText.value = tempText;
  selectTag[0].value = selectTag[1].value;
  selectTag[1].value = tempLang;
});

fromText.addEventListener("keyup", () => {
  if (!fromText.value) {
    toText.value = "";
  }
});

translateBtn.addEventListener("click", () => {
  let text = fromText.value.trim(),
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
  if (!text) return;
  toText.setAttribute("placeholder", "Translating...");
  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      toText.value = data.responseData.translatedText;
      data.matches.forEach((data) => {
        if (data.id === 0) {
          toText.value = data.translation;
        }
      });
      toText.setAttribute("placeholder", "Translation");
    });
});

icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    if (!fromText.value || !toText.value) return;
    if (target.classList.contains("fa-copy")) {
      if (target.id == "from") {
        navigator.clipboard.writeText(fromText.value);
      } else {
        navigator.clipboard.writeText(toText.value);
      }
    } else {
      let utterance;
      if (target.id == "from") {
        utterance = new SpeechSynthesisUtterance(fromText.value);
        utterance.lang = selectTag[0].value;
      } else {
        utterance = new SpeechSynthesisUtterance(toText.value);
        utterance.lang = selectTag[1].value;
      }
      speechSynthesis.speak(utterance);
    }
  });
});
const btnOpen = document.querySelector(".btnOpen")
const btnClose = document.querySelector(".btnClose")
const title = document.querySelector(".title")
const inner = document.querySelector(".inner")

btnOpen.addEventListener("click", ()=> {
  title.style.opacity = "0"
  inner.style.left = "0"
})

btnClose.addEventListener("click", ()=>{
  title.style.opacity = "1"
  inner.style.left = "-300%"
})

const about = document.querySelector(".about")
const tarjomon = document.querySelector(".tarjimon")
const code = document.querySelector(".code")
const first = document.querySelector(".first")
const second = document.querySelector(".second")
const third = document.querySelector(".third")

third.addEventListener("click" , () => {
  third.classList.add("active")
  first.classList.remove("active")
  second.classList.remove("active")
  tarjomon.style.display = "none"
  code.style.display = "none"
  about.style.display = "block"


})

first.addEventListener("click" , () => {
  first.classList.add("active")
  third.classList.remove("active")
  second.classList.remove("active")
  tarjomon.style.display = "block"
  code.style.display = "none"
  about.style.display = "none"


})
