import React,{useState, useRef, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Box, Container, Card, CardContent } from '@mui/material';
import {styled} from '@mui/material/styles';
import ReactPlayer from 'react-player';
import girlIdeals from '../../../_mock/girlIdeals';

export default function IdelaVs(){

    const { id } = useParams();

    const Div = styled('div')({
        background: "yellow",
    })
    const CardMediaStyle = styled('div')({
        position: 'relative',
        // paddingTop: 'calc(100% * 3 / 4)'
    })
    const VideoCover = styled('div')({
        // video tag 의 경우 event 전달이 잘 안돼서 약간의 트릭을 쓴거!
        position: 'absolute',
        width: "100%",
        height: "100%",
        background: "yellow",
        opacity: "0",
        top: "0"
    })
    const TitleStyle = styled('div')({
        textAlign: 'center'
    })

    const startRound = 4; 
    const nextRound = useRef((startRound/2));
    const offset = useRef(0);
    const isFirst = useRef(true);
    const isFirst2 = useRef(true);


    const [items, setItems] = useState(girlIdeals);
    const [winners, setWinners] = useState([]);
    const [players, setPlayers] = useState([items[offset.current], items[offset.current+1]]);
    
    useEffect(()=>{

        if(isFirst.current) {
            isFirst.current = false;
            return;
        } 

        if( (nextRound.current !== 1) && (winners.length >= nextRound.current)){
            const toNext = nextRound.current / 2;
            nextRound.current = toNext;
            setItems(winners);
        }else{

            const toOffset = offset.current + 2;
            offset.current = toOffset;
            setPlayers(
                [
                    items[offset.current],
                    items[offset.current+1]
                ]
            )
        }
    },[winners])

    useEffect(()=>{

        if(isFirst2.current) {
            isFirst2.current = false;
            return;
        }
        offset.current = 0;

        setPlayers(
            [
                items[offset.current],
                items[offset.current+1]
            ]
        )
    },[items])

    const roundUpHandler = (e) => {

        if(nextRound.current === 1){
            // game end
            // go winner page
            alert(`winner is ${players[e.target.className[0]].name}`);
            return;
        }
        setWinners([
            ...winners,
            players[e.target.className[0]]
        ]);
        
    }

    return(

        <Container sx={{border:"1px solid black"}}>
            <Stack direction="row" alignItems="center" justifyContent="center" stretch sx={{border:"1px solid black"}}>
                {players.map((item, index)=>{
                    return(
                        <Card onClick={roundUpHandler}>
                            <CardMediaStyle>
                                <video 
                                    width="100%" 
                                    height="100%"
                                    muted
                                    autoPlay
                                    loop
                                    playinline >
                                    <source src={item.src} />
                                </video>
                                <VideoCover className={index}>
                                    imageCover
                                </VideoCover>
                            </CardMediaStyle>
                            <CardContent>
                                <TitleStyle >                            
                                    {item.name}
                                </TitleStyle>
                            </CardContent>
                        </Card>
                
                    )
                })}
        
                {/* <Box component="div" sx={{width:"50%", border:"1px solid black", position:"relative"}}>
                    <ReactPlayer
                        url={"https://thumbs.gfycat.com/ScentedLividGoral-mobile.mp4"}
                        width="100%"
                        height="100%"
                        muted
                        playing
                        playsinline
                        loop
                    />
                    <Box component="div">
                        사나
                    </Box>
                </Box>
   
                <Box component="div" sx={{width:"50%", border:"1px solid black"}}>
                    <ReactPlayer
                            url={"https://thumbs.gfycat.com/VariableShortGoral-mobile.mp4"}
                            width="100%"
                            height="100%"
                            muted
                            playing
                            playsinline
                            loop
                        />
                        <Box component="div">
                            아이유
                        </Box>
                </Box> */}
            </Stack>
        </Container>
    )
}   