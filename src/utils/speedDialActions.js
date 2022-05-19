export function sendKakaoShare({contentTitle, desc, imgSrc, url}){
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

export async function copyAddress({url}){
    
    if(typeof navigator.clipboard === 'undefined') {

        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position="fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
    
        try {
            const successful = document.execCommand('copy');
            const msg = successful ? 'successful' : 'unsuccessful';
           
        } catch (err) {
            alert(err.message);
        }
    
        document.body.removeChild(textArea)
        
        
        return;
    }

    await navigator.clipboard.writeText(url);

}

export function returnToIdealMain({redirectPage}){
    window.location.href = `${window.location.origin}${redirectPage}`;
    
}

export function returnTo({redirectPage}){
    window.location.href = `${window.location.origin}${redirectPage}`;
}
