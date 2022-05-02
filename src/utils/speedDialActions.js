export function sendKakaoShare(contentTitle, desc, imgSrc, url){
    if(window.Kakao){
        const kakao = window.Kakao;
        if(!kakao.isInitialized()){
            kakao.init(process.env.REACT_APP_KAKAO_KEY)
        }
        
        kakao.Link.sendDefault({
            // container: '#kakao-link-btn',
            objectType: 'feed',
            content: {
                title: contentTitle,
                description: desc,
                imageUrl: imgSrc,
                link: {
                    mobileWebUrl: url,
                    webUrl: url
                },
            },
            buttons: [
                {
                    title: '웹으로 보기',
                    link: {
                        mobileWebUrl: url,
                        webUrl: url
                    }
                }
            ]
        })
    }
}

