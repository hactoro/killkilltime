import React, {useEffect, useState} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';
import {Container, Typography, Stack, Box, Card, CardContent, CardActions, SpeedDial, SpeedDialAction, SpeedDialIcon} from '@mui/material';
import {styled} from '@mui/material/styles';
import axios from 'axios';
import ReactPlayer from 'react-player';
import {  faTrophy, faMedal, faFaceSadTear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KakaoIcon from '../../../components/custom-icon/KakaoIcon'
import {sendKakaoShare} from '../../../utils/speedDialActions'

const actions = [
    { icon: <KakaoIcon />, 
      name: '카카오로 공유',
      action: sendKakaoShare},

    
   
];

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
    const [open, setOpen] = useState(false);
    
 
    const speedDialCloseHandle = () => {
        setOpen(false);
    }
    const speedDialOpenHandle = () =>{
        setOpen(true);
    }

    const setWinner = async (id) => {
        try{
            const winner = await axios.get(`/admin/contents/race/player/${id}`);
            const {finalWin, win, lose} = winner.data.player.statics;
            setWinInfo({
                finalWin, 
                win, 
                lose
            });
            setWinnerInfo(winner.data.player);

        }catch(err){
            console.log(err)
        }
    }

    const TitleStyle = styled('div')({
        textAlign: 'center'
    })

    const MediaStyle = styled('div')({
        position: 'relative'
    })

    useEffect(()=>{
        setWinner(id);

        alert(`${window.location.href}`)
    }, [])
    

    return(
        <Container>
<<<<<<< HEAD
        
      

                    
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
=======
         
            <Typography align="center" variant="h2" sx={{marginBottom:"10px"}}>
                {searchParams.get('title')} 우승자
            </Typography> 
            

            <Stack alignItems="center" justifyContent="center">

                <Card >
                        
                        
                
                    <ReactPlayer
                        url={winnerInfo.src}
                        width="100%"
                        // height="100%"
                        muted 
                        playing
                        playsinline
                        loop
                    />  
                    <CardContent sx={{position:"relative"}}>
                        <Typography align="center" variant="h3" >
                            {winnerInfo.name}{winnerInfo.group ? `(${winnerInfo.group})`: ''}
                        </Typography>
>>>>>>> d319f329b40d50ea63e2ca30526b99ab9eff60e3
                    
                        <div style={{position:"absolute", right:"5px", bottom:"30px"}}>

                            <SpeedDial
                                    ariaLabel="final navigation"
                                    onClose={speedDialCloseHandle}
                                    onOpen={speedDialOpenHandle}
                                    open={open}
                                    direction="up"
                                    FabProps={{size: "small"}}
                                    icon={<SpeedDialIcon />}
                                >
                                {
                                    actions.map((action)=>{


                                        return(
                                            <SpeedDialAction
                                                key={action.name}
                                                icon={action.icon}
                                                tooltipTitle={action.name}
                                                onClick={()=>{
                                                    action.action(
                                                        searchParams.get('title'),
                                                        "#이상형월드컵 #나의취향은 #낄낄시간",
                                                        "",
                                                        `${window.location.href}`
                                                    )}
                                                }
                                            />
                                        )
                                    })
                                }
                            </SpeedDial>
                        </div>
                    </CardContent>
                    <CardActions sx={{direction:"row", alignItems:"center", justifyContent:"space-around"}} spacing={3}>

                            <Box>
                                <Box>
                                    최종우승
                                </Box>
                                <Box sx={{textAlign:"center"}}>
                                    <FontAwesomeIcon icon={faTrophy} style={{marginRight:"7px", color:"gold"}}/> 
                                    {winInfo.finalWin?winInfo.finalWin:0}
                                </Box>
                            </Box>
                            <Box>
                                <Box>
                                    1vs1 승리
                                </Box>
                                <Box sx={{textAlign:"center"}}>
                                    <FontAwesomeIcon icon={faMedal} style={{marginRight:"7px", color:"blue"}}/> 
                                    {winInfo.win?winInfo.win:0}
                                </Box>
                            </Box>
                            <Box>
                                <Box>
                                    1vs1 패배
                                </Box>
                                <Box sx={{textAlign:"center"}}>
                                    <FontAwesomeIcon icon={faFaceSadTear} style={{marginRight:"7px", color:"grey"}}/> 
                                    {winInfo.lose?winInfo.lose:0}
                                </Box>
                            </Box>
            
                    </CardActions>
                
                </Card>
            </Stack>
            
        </Container>
    )

}