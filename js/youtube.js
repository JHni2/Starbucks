// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() { //이름 바꾸면 안됨!
  // html에 작성한 <div id="player"></div>
  new YT.Player('player', {
    videoId: 'An6LvWQuj_8', //최초 재생할 유튜브 영상 ID
    playerVars: { //영상 재생을 위한 변수들
      autoplay: true,
      loop: true,
      playlist: 'An6LvWQuj_8' //반복 재생할 유튜브 영상 ID 목록
    },
    events: {
      onReady: function (event) { //동영상 player가 준비되면 함수 실행
        event.target.mute() //음소거
      }
    }
  });
}

