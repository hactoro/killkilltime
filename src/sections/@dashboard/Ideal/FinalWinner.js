import React, {useEffect, useState} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';
import {Container, Typography, Stack, Box, Card, CardContent, CardActions} from '@mui/material';
import {styled} from '@mui/material/styles';
import axios from 'axios';
import ReactPlayer from 'react-player';


export default function FinalWinner(){
    const {id} = useParams(); // id
    const [searchParams, setSearchParams] = useSearchParams(); // title

    const [winnerInfo, setWinnerInfo] = useState({});
    const [winInfo, setWinInfo] = useState({
        finalWin: 0,
        win: 0,
        lose: 0
    })
    const [topList, setTopList] = useState([]);

    const setWinner = async (id) => {
        try{
            const winner = await axios.get(`/admin/contents/race/player/${id}`);
            const {finalWin, win, lose} = winner.data.player.statics;
            setWinInfo({
                finalWin, 
                win, 
                lose
            });
            console.log("helloooo");
            console.log(finalWin, win, lose);
            console.log(winner.data.player);
            setWinnerInfo(winner.data.player);

        }catch(err){
            console.log(err)
        }
    }

    const TitleStyle = styled('div')({
        textAlign: 'center'
    })

    useEffect(()=>{
        console.log("hello?")
        console.log(winInfo.finalWin, winInfo.win, winInfo.lose);
    },[winInfo])

    useEffect(()=>{
        // const {finalWin, win, lose} = winnerInfo.statics;
        // console.log(finalWin);
    }, [winnerInfo])

    useEffect(()=>{
        setWinner(id);
    }, [])
    

    return(
        <Container>
        
      

                    
            <Typography>
                {searchParams.get('title')}
            </Typography> 
            
            {winnerInfo.name}

            <Stack alignItems="center" justifyContent="center">

                <Card sx={{width:"50%"}}>

                        <ReactPlayer
                            url={winnerInfo.src}
                            width="100%"
                            height="100%"
                            muted 
                            playing
                            playsinline
                            loop
                        />  

                    <CardContent>
                        <TitleStyle >                            
                            {winnerInfo.name}{winnerInfo.group ? `(${winnerInfo.group})`: ''}
                        </TitleStyle>
                    </CardContent>
                    <CardActions sx={{direction:"row", alignItems:"center", justifyContent:"space-around"}} spacing={3}>

                            <Box>
                                <Box>
                                    최종우승
                                </Box>
                                <Box>
                                    {/* {winnerInfo.statics.finalWin} */}
                                </Box>
                            </Box>
                            <Box>
                                <Box>
                                    우승
                                </Box>
                                <Box>
                                    {/* {winnerInfo.statics.win?winnerInfo.statics.win:0} */}
                                </Box>
                            </Box>
                            <Box>
                                <Box>
                                    패배
                                </Box>
                                <Box>
                                    {/* {winnerInfo.statics.lose?winnerInfo.statics.lose:0} */}
                                </Box>
                            </Box>
            
                    </CardActions>
                </Card>
            </Stack>
                    
     
            
            
        </Container>
    )

}