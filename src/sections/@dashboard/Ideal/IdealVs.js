import React,{useState, useRef, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Box, Container, Card, CardContent, LinearProgress  } from '@mui/material';
import {styled} from '@mui/material/styles';
import ReactPlayer from 'react-player';
import useEffect2 from '../../../hooks/useEffect2';
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

    const startRound = 8; 
    const nextRound = useRef((startRound/2));
    const offset = useRef(0);
    const steps = useRef(0);

    const [items, setItems] = useState(girlIdeals);
    const [winners, setWinners] = useState([]);
    const [players, setPlayers] = useState([items[offset.current], items[offset.current+1]]);
    const [progress, setProgress] = useState(0);
    


    useEffect2(()=>{

        if( (nextRound.current !== 1) && (winners.length >= nextRound.current)){
            const toNext = nextRound.current / 2;
            nextRound.current = toNext;
       
            setItems(winners);
            setWinners([]);
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

    useEffect2(()=>{

        offset.current = 0;
        setPlayers(
            [
                items[offset.current],
                items[offset.current+1]
            ]
        )
    },[items]);


    const roundUpHandler = (e) => {

        setTimeout(()=>{
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
            if((steps.current + 1) === nextRound.current){
                steps.current = 0;
                setProgress(0);
            }else{
                const nextSteps = steps.current + 1;
                steps.current = nextSteps;
                const currentProgress = (steps.current / ( nextRound.current )) * 100 ;
                setProgress(currentProgress);
            }
        },300)
    }

    return(

        <Container>
            <Stack direction="column" alignItems="center" justifyContent="center">
                {nextRound.current * 2}강
                <Box sx={{width:"100%", marginBottom:"2%"}}>
                    <LinearProgress variant="determinate" value={progress} />
                </Box>

            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="center" >
                {players.map((item, index)=>{
                    return(
                        <Card key={index} onClick={roundUpHandler} sx={{width:"50%"}}>
                            <CardMediaStyle>
                                <ReactPlayer
                                    url={item.src}
                                    width="100%"
                                    height="100%"
                                    muted
                                    playing
                                    playsinline
                                    loop
                                />
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
            </Stack>
        </Container>
    )
}   