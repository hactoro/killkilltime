import React, {useEffect, useState} from 'react';
import {useParams, useSearchParams, useNavigate} from 'react-router-dom';
import {Container, Typography, Stack, Box, Card, CardContent, CardActions, SpeedDial, SpeedDialAction, SpeedDialIcon, Snackbar} from '@mui/material';
import {styled} from '@mui/material/styles';
import axios from 'axios';
import ReactPlayer from 'react-player';
import ShareIcon from '@mui/icons-material/Share';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import {  faTrophy, faMedal, faFaceSadTear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KakaoIcon from '../../../components/custom-icon/KakaoIcon';
import {sendKakaoShare, copyAddress, returnToIdealMain} from '../../../utils/speedDialActions'
import Page from '../../../components/Page';


const actions = [
    { 
        icon: <KakaoIcon />, 
        name: '카카오로 공유',
        action: sendKakaoShare
    },
    {
        icon: <ShareIcon />,
        name: '주소복사',
        action: copyAddress

    },
    {
        icon: <KeyboardReturnIcon />,
        name: '이상형 월드컵 메인으로',
        action: returnToIdealMain   
    }

    
   
];

export default function FinalWinner(){
    const {id} = useParams(); // id
    const [searchParams, setSearchParams] = useSearchParams(); // title
    const navigate = useNavigate();
    
    const [winnerInfo, setWinnerInfo] = useState({});
    const [winInfo, setWinInfo] = useState({
        finalWin: 0,
        win: 0,
        lose: 0
    })
    const [topList, setTopList] = useState([]);
    const [open, setOpen] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);
    const [infoMessage, setInfoMessage] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    
 
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
    }, [])
    
    const snackBarCloseHandler = () => {
        setInfoOpen(false);
    }


    return(

        <Page title="이상형월드컵: 우승자페이지">
            <Container>
            
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
                                            
                                            const params = {
                                                contentTitle: searchParams.get('title'),
                                                desc: "#이상형월드컵 #나의취향은 #낄낄시간",
                                                imgSrc: "",
                                                url: `${window.location.href}`,
                                                redirectPage: `/Ideal`
                                            }

                                            return(
                                                <SpeedDialAction
                                                    key={action.name}
                                                    icon={action.icon}
                                                    tooltipTitle={action.name}
                                                    onClick={async()=>{

                                                        await action.action(params)
                                                        setInfoMessage(action.name);
                                                        setInfoOpen(true);
                                                        setAnchorEl(null);

                                                        }
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
                <Snackbar
                    anchorOrigin={{vertical:'bottom',horizontal:'right'}}
                    open={infoOpen}
                    autoHideDuration={1500}
                    message={infoMessage}
                    onClose={snackBarCloseHandler}
                />
            </Container>
        </Page>
    )

}