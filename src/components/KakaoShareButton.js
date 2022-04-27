import React, { useEffect } from 'react'

const KakaoShareButton = ({contentTitle, url, imgSrc}) => {
  useEffect(() => {
    createKakaoButton()
    console.log("카카오버튼")
    console.log(imgSrc);
  }, [])

  const createKakaoButton = () => {
    // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
    if (window.Kakao) {
      const kakao = window.Kakao
      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init(process.env.REACT_APP_KAKAO_KEY)
      }

      kakao.Link.createDefaultButton({
        // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
        container: '#kakao-link-btn',
        objectType: 'feed',
        content: {
          title: contentTitle,
          description: '#이상형월드컵 #카카오 #공유버튼',
          imageUrl: imgSrc, // i.e. process.env.FETCH_URL + '/logo.png'
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        social: {
          likeCount: 77,
          commentCount: 55,
          sharedCount: 333,
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },

        ],
      })
    }
  }

  return (
    <div className="kakao-share-button">
      {/* Kakao share button */}
      <button id="kakao-link-btn">
        <img src={imgSrc} alt="kakao-share-icon" />
      </button>
    </div>
  )
}

export default KakaoShareButton