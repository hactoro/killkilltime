
import React, {useEffect} from 'react';
import {Icon} from '@mui/material';

export default function KakaoIcon({contentTitle, imgSrc, url, desc}){

    useEffect(()=>{
        createKakaoShare();
    }, [])

    // const {title, imgSrc, url, desc} = props;
    const createKakaoShare = () =>{
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
    return (
        <Icon style={{width:'100%', height: '100%'}} onClick={createKakaoShare}>
            <img src={'/img/kakaotalk_square.png'}  alt='' style={{borderRadius:'50%'}}/>
        </Icon>
        
    )
}