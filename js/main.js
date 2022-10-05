//클래스가 search인 요소를 css 선택자로 찾아서 searchEl에 할당한다
const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

//search라는 클래스를 가지는 div 요소를 클릭하면 검색 부분에 포커스를 하는 함수가 실행된다 -> 돋보기를 눌러도 검색창이 늘어난다
searchEl.addEventListener('click', function () {
  searchInputEl.focus();
});

//input요소가 실제로 focus되면 focused라는 클래스를 추가한다 + html 속성인 placeholder을 추가한다
searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색'); //검색창의 힌트 부분
});

//input요소가 실제로 blur(focus 해제)되면 focused를 제거한다 + placeholder도 비어있는 상태가 된다
searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', ''); //검색창의 힌트 부분
});


//배너 스크롤, 하단 버튼 클릭 처리
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

//lodash JS 라이브러리를 설치해 _.throttle 메소드를 사용할 수 o
window.addEventListener('scroll', _.throttle(function () {
  // console.log(window.scrollY);
  if (window.scrollY > 500) { //배지 숨기기
    //gsap.to(요소, 지속시간(S), 옵션)
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    });
    gsap.to(toTopEl, .2, { //버튼 보이기
      x: 0
    })
  } else { //배지 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    gsap.to(toTopEl, .2, { //버튼 숨기기
      x: 100
    })
  }
}, 300));
// 메소드 _.throttle(함수, 시간(ms))
//시간(0.3초)단위로 부하를 줘서 함수가 우루루 실행되는 것을 방지한다

toTopEl.addEventListener('click', function () { //클릭했을 때
  gsap.to(window, .7, { //0.7초 동안
    scrollTo: 0 //뷰포트 0 지점(맨 위)으로 스크롤한다
  });
})


//fade-in 처리
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
  gsap.to(fadeEl, 1, { //gsap.to(요소, 지속시간(s), {옵션})
    delay: (index + 1) * .7, //0.7, 1.4, 2.1, 2.7초 뒤에 순차적으로 동작한다
    opacity: 1
  });
});


//new Swiper('선택자', {옵션})
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true
});

new Swiper('.promotion .swiper-container', {
  slidesPerView: 3, //한번에 보여주는 슬라이드 개수
  spaceBetween: 10, //슬라이드 사이의 여백
  centeredSlides: true, //1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    delay: 5000 //5초
  },
  pagination: {
    el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자
    clickable: true //사용자의 페이지 번호 요소 제어
  },
  navigation: {
    prevEl: '.promotion .swiper-prev', //이전 버튼
    nextEl: '.promotion .swiper-next' //다음 버튼
  }
});


new Swiper('.awards .swiper-container', { //클래스 awards를 가지고 그 내부의 클래스 swiper-container를 가진 요소를 찾아 slide 기능을 추가한다
  autoplay: true,
  loop: true,
  spaceBetween: 30, //사이 여백
  slidesPerView: 5, //하나의 화면에 5개의 슬라이드 출력
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});


const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion
  if (isHidePromotion) {
    promotionEl.classList.add('hide'); //숨김 처리
  } else {
    promotionEl.classList.remove('hide'); //보임 처리
  }
})


// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
  //gsap.to(요소, 시간, 옵션);
  gsap.to(selector, random(1.5, 2.5), { //(선택자, 애니메이션 동작 시간, {옵션})
    y: size,
    repeat: -1, //무한 반복
    yoyo: true, //한번 재생된 애니메이션을 뒤로 재생 (다시 올라감)
    ease: Power1.easeInOut, //움직임을 부드럽게 제어
    delay: random(0, delay) //n초 뒤에 애니메이션 실행
  });
}
floatingObject('.floating1', 1, 15); //1초 지연, 위아래 15px만큼의 움직임 범위
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);


const spyEls = document.querySelectorAll('section.scroll-spy')
spyEls.forEach(function (spyEl) {
  new ScrollMagic //Scene: 특정 요소를 감시하는 옵션을 지정하는 메소드
    .Scene({
      triggerElement: spyEl, //보여짐 여부를 감시할 요소 지정
      triggerHook: .8 //뷰포트 0~1 구간중 0.8 지점에서 setClassToggle을 실행
    })
    .setClassToggle(spyEl, 'show') //setClassToggle: 클래스 속성을 넣었다 뺐다 제어
    .addTo(new ScrollMagic.Controller()); //addTo: JS라이브러리 ScrollMagic에 필요한 컨트롤러 개념을 추가
})


const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); //올해 년도 출력