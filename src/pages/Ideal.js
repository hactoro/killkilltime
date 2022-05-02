import React, {useEffect, useState} from 'react'
import {Stack, Container, Grid, Typography, Card, CardContent, Link} from '@mui/material';
import {styled} from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import ReactPlayer from 'react-player';
import axios from 'axios';
import IdealCard from '../sections/@dashboard/Ideal/IdealCard';
import Page from '../components/Page';
import ideals from '../_mock/ideal';





const CardMediaStyle = styled('div')({
    position: 'relative',
    paddingTop: 'calc(100% * 3 / 4)'
});
const CoverVideoStyle = styled('div')({
    top: "0",
    position: 'absolute',
    width: "100%",
    height: "100%",
    objectFit: "cover"
});
const TitleStyle = styled(Link)({
    height: 44,
    overflow: 'hidden',
    WebkitLineClamp: 2, // block 안에서 글자 라인을 제한할 수 있음.
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical'

});

export default function Ideal(){
    
    const [raceList, setRaceList] = useState([]);
    // const getRaceList = async () => {
    // }
    
    // getRaceList();
    
    
    useEffect(async()=>{
        try{
            const ret = await axios.get('/admin/contents/race/racelist');
            setRaceList(ret.data.raceList);
        }catch(err){
            alert("시스템에 문제가 있습니다. 나중에 접속해주세요.")
        }
    },[])



    return(
        <Page title="이상형 월드컵">
            <Container>
                <Grid container spacing={1}>
                    {raceList.map((item, index)=>{
                        return(
                            <Grid item xs={12} md={3}>
                                <IdealCard title={item.title} videoSrc={item.src} categoryId={item._id} />
                            </Grid>)
                    })}
                </Grid>
            </Container>
        </Page>
    )
}