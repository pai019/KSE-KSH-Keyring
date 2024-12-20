const slider = document.querySelector(".slider-container");
const buttons = document.querySelectorAll(".buttons button");
const resultElement = document.getElementById("result");

let currentSlide = 0;
let selectedImages = []; // 선택한 이미지들을 저장하는 배열
let selectedValue = []; // 선택값.


let maxSelectVal; //최대 선택값
let maxSelectIndex =[]; // 최대 선택값 인덱스.

let eyeVal;
let satVal;

let characterContainer;

// 버튼 클릭 시 처리
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const imageUrl = button.getAttribute("data-image");
    let selectVal = button.getAttribute("value");
    selectedImages.push(imageUrl);
    selectedValue.push(selectVal);

    if (currentSlide === 4) eyeVal = selectVal;
    if (currentSlide === 6) satVal = selectVal;

    currentSlide++;
    if (currentSlide < 8) {
      slider.style.transform = `translateX(-${currentSlide * 100}vw)`;
    }

    if (currentSlide === 7) {
      //console.log("eyeVal ====" + eyeVal);
      //console.log("satVal ====" + satVal);
      selectedValue.splice(4,1);
      selectedValue.splice(6,1); 

      maxSelectVal = Math.max.apply(null, selectedValue);
      //console.log("maxSelectVal ====" + maxSelectVal);

      for(let i = 0; i<selectedValue.length; i++)
      {
        if(maxSelectVal == selectedValue[i])
        {
          //console.log("maxValue index==" + i);
          maxSelectIndex.push(i);
          //console.log("maxSelectIndex==" + maxSelectIndex);
        }
      }

      showLoadingScreen(); // 로딩 화면 표시
    }
  });
});


// 로딩 화면을 보여주는 함수
function showLoadingScreen() {
  const loadingSlide = document.getElementById("loading-slide");
  slider.style.transform = `translateX(-${currentSlide * 100}vw)`;

  // 2초 후 결과 화면 표시
  setTimeout(() => {
    currentSlide++;
    slider.style.transform = `translateX(-${currentSlide * 100}vw)`;
    showSelectedImages();
  }, 2000); // 로딩 시간 2초
}

// 선택된 이미지를 결과 화면에 표시하는 함수
// 선택된 이미지를 결과 화면에 표시하는 함수
function showSelectedImages() {
  const resultSlide = document.getElementById("result");
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");

  selectedImages.forEach((imageSrc, index) => {
    // 4번째(인덱스 4)와 6번째(인덱스 6) 이미지를 건너뛴다
    if (index === 4 || index === 6) return;

    const imgElement = document.createElement("img");
    imgElement.src = imageSrc;
    imgElement.alt = "Selected image";

    // 버튼의 value에 따라 이미지 크기 설정
    const value = parseInt(selectedValue[index]); // 선택된 버튼의 value 가져오기
    if (value === 0 || value === 2) {
      imgElement.style.width = "52px";
      imgElement.style.height = "52px";
    } else if (value === 1 || value === 3) {
      imgElement.style.width = "118px";
      imgElement.style.height = "118px";
    }

    if (index === 1) {
      imgElement.style.width = "32px";
      imgElement.style.height = "32px";
    } 

    imgElement.style.objectFit = "cover"; // 잘림 없이 맞춤
    imageContainer.appendChild(imgElement);
  });

  makeCharacter(); // 캐릭터 만들기
  imageContainer.appendChild(characterContainer);

  resultSlide.appendChild(imageContainer);
}

function makeCharacter() {
  const eyeImg = ["eye0.png", "eye1.png", "eye2.png"];
  const eye = "img/" + eyeImg[eyeVal];
  
  // 랜덤으로 이미지 선택 (값이 없을 경우 기본 이미지 사용)
  const getRandomImage = () => selectedImages[Math.floor(Math.random() * selectedImages.length)] || "img/02-D.png";

  // 가장 높은 value를 가진 것들 중 랜덤으로 body 선택
  const bodyCandidates = maxSelectIndex.map(index => selectedImages[index]);
  const body = bodyCandidates[Math.floor(Math.random() * bodyCandidates.length)] || "img/02-D.png";

  const hat = getRandomImage();
  const nose = getRandomImage();
  const ear = getRandomImage();
  const mouse = getRandomImage();

  characterContainer = document.createElement("div");
  const bodySize = Math.random() * (250 - 196) + 196;
  characterContainer.style.width = bodySize + "px";
  characterContainer.style.height = bodySize + "px";
  characterContainer.classList.add("characterBox");

  const bodyElement = document.createElement("img");
  bodyElement.src = body;
  bodyElement.style.width = bodySize + "px";
  bodyElement.style.position = "absolute";
  characterContainer.appendChild(bodyElement);

  const eyeElement = document.createElement("img");
  eyeElement.src = eye;
  eyeElement.style.width = bodySize * 0.7 + "px";
  eyeElement.style.position = "absolute";
  const eyePos = Math.random() * (80 - 60) + 60;
  eyeElement.style.marginTop = eyePos + "px";

  const noseElement = document.createElement("img");
  noseElement.src = nose;
  noseElement.style.width = bodySize * 0.2 + "px";
  noseElement.style.position = "absolute";
  const nosePos = eyePos + Math.random() * (30 - 20) + 20;
  noseElement.style.marginTop = nosePos + "px";

  const hatElement = document.createElement("img");
  hatElement.src = hat;
  hatElement.style.width = bodySize * 0.4 + "px";
  hatElement.style.position = "absolute";
  const hatPos = eyePos - Math.random() * 10 - 90; // eyePos보다 위쪽
  hatElement.style.marginTop = hatPos + "px";

  const mouseElement = document.createElement("img");
  mouseElement.src = mouse;
  mouseElement.style.width = bodySize * 0.15 + "px";
  mouseElement.style.position = "absolute";
  const mousePos = eyePos + Math.random() * (70 - 60) + 60;
  mouseElement.style.marginTop = mousePos + "px";

  const earElementLeft = document.createElement("img");
  earElementLeft.src = ear;
  earElementLeft.style.width = bodySize * 0.3 + "px";
  earElementLeft.style.position = "absolute";
  earElementLeft.style.marginLeft = -bodySize * 0.6 + "px"; // 왼쪽으로 배치
  earElementLeft.style.marginTop = eyePos - 20 + "px";

  const earElementRight = document.createElement("img");
  earElementRight.src = ear;
  earElementRight.style.width = bodySize * 0.3 + "px";
  earElementRight.style.position = "absolute";
  earElementRight.style.marginLeft = bodySize * 0.6 + "px"; // 오른쪽으로 배치
  earElementRight.style.marginTop = eyePos - 20 + "px";

  characterContainer.appendChild(earElementLeft);
  characterContainer.appendChild(earElementRight);
  characterContainer.appendChild(noseElement);
  characterContainer.appendChild(eyeElement);
  characterContainer.appendChild(hatElement);
  characterContainer.appendChild(mouseElement);
}


const nameRules = {
  q1: ["여유킹", "여유킹", "콩비지", "콩비지"],
  q2: ["아싸", "아싸", "인싸", "인싸"],
  q3: ["쭈꾸미", "쭈꾸미", "추구미", "추구미"],
  q4: ["벼락쟁이", "벼락쟁이", "예습쟁이", "예습쟁이"],
  q6: ["과탑", "과탑", "낭만러", "낭만러"]
};

const selections = {};

document.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", () => {
    const question = button.getAttribute("data-q");
    const value = parseInt(button.getAttribute("value"), 10);

    selections[question] = value;
    updateResult();
  });
});

function updateResult() {
  const nameParts = [];

  for (const [question, values] of Object.entries(nameRules)) {
    if (selections[question] !== undefined) {
      nameParts.push(values[selections[question]]);
    }
  }

  const resultElement = document.querySelector("#txt-big p");
  resultElement.textContent = nameParts.join(" ");
}

document.querySelectorAll(".image-container img").forEach((img) => {
  const randomDirection = Math.random() > 0.5 ? 1 : -1; // 랜덤 방향 (1은 시계방향, -1은 반시계방향)
  const randomDuration = Math.random() * 4 + 2; // 애니메이션 시간 (2초 ~ 6초 사이)
  
  img.style.animation = `rotateAnimation ${randomDuration}s ${randomDirection === 1 ? 'normal' : 'reverse'} infinite linear`;
});

document.addEventListener("DOMContentLoaded", () => {
  const downloadBtn = document.getElementById("downloadBtn");
  const result = document.getElementById("result");

  downloadBtn.addEventListener("click", () => {
    html2canvas(result).then((canvas) => {
      // 캔버스를 이미지 데이터로 변환
      const imgData = canvas.toDataURL("image/png");

      // 다운로드 링크 생성
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "result.png"; // 저장될 이미지 파일명
      link.click();
    });
  });
})

function adjustSliderWidth() {
  const slideWidth = window.innerWidth; // 현재 화면 너비
  slider.style.width = `${slideWidth * 8}px`; // 슬라이드 개수(8)에 맞게 조정
  document.querySelectorAll(".slide").forEach((slide) => {
    slide.style.width = `${slideWidth}px`;
  });
}

const slides = document.querySelectorAll('.slide');

// 슬라이드 활성화 함수
function activateSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('active'); // 현재 슬라이드 활성화
    } else {
      slide.classList.remove('active'); // 나머지는 비활성화
    }
  });
}

// 초기 슬라이드 활성화
activateSlide(currentSlide);

// 버튼 클릭으로 슬라이드 이동
document.querySelector('.buttons').addEventListener('click', (e) => {
  if (e.target.dataset.action === 'next') {
    currentSlide = (currentSlide + 1) % slides.length; // 다음 슬라이드
  } else if (e.target.dataset.action === 'prev') {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length; // 이전 슬라이드
  }
  activateSlide(currentSlide);
});


// 초기화 및 리사이즈 이벤트 처리
adjustSliderWidth();
window.addEventListener("resize", adjustSliderWidth);