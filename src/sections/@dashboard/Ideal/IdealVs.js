import React,{useState, useRef, useEffect} from 'react';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Stack, Box, Button, Container, Card, CardContent, LinearProgress, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
import {styled} from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import ReactPlayer from 'react-player';
import axios from 'axios';
import useEffect2 from '../../../hooks/useEffect2';

export default function IdelaVs(){

    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

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
    const GameSetter = styled('div')({

    })

    
    const offset = useRef(0);
    const steps = useRef(0);
    const raceResult = useRef(null);
    
    const [startRound, setStartRound] = useState(16);
    const [nextRound, setNextRound] = useState(0);
    const [items, setItems] = useState([]);
    const [winners, setWinners] = useState([]);
    const [players, setPlayers] = useState([items[offset.current], items[offset.current+1]]);
    const [progress, setProgress] = useState(0);
    const [isRoundStart, setIsRoundStart] = useState(false);
    
    useEffect2(()=>{

        if( (nextRound !== 1) && (winners.length >= nextRound)){
            // const toNext = nextRound.current / 2;
            // nextRound.current = toNext;
            setNextRound( nextRound / 2)
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

    useEffect2(()=>{
        setIsRoundStart(true);
    },[nextRound])

    const roundUpHandler = async (e) => {
    
        if(nextRound === 1){
            // game end
            // go winner page
            setRaceResult.win(players[e.target.className[0]]._id);
            setRaceResult.finalWin(players[e.target.className[0]]._id);
            if(e.target.className[0] === '1'){
                setRaceResult.lose(players[0]._id);
            }else{
                setRaceResult.lose(players[1]._id);
            }    
     
            await setRaceResult.sendResult(raceResult.current);

            navigate(`/Ideal/winner/${players[e.target.className[0]]._id}?title=${searchParams.get('title')}`)
            // alert(`winner is ${players[e.target.className[0]].name}`);
            return;
        }
        setWinners([
            ...winners,
            players[e.target.className[0]]
        ]);

        setRaceResult.win(players[e.target.className[0]]._id);
        if(e.target.className[0] === '1'){
            console.log(e.target.className[0]);
            setRaceResult.lose(players[0]._id);
        }else{
            setRaceResult.lose(players[1]._id);
        }
        
 

        if((steps.current + 1) === nextRound){
            steps.current = 0;
            setProgress(0);
        }else{
            const nextSteps = steps.current + 1;
            steps.current = nextSteps;
            const currentProgress = (steps.current / ( nextRound )) * 100 ;
            setProgress(currentProgress);
        }
    
    }

    const roundSelectorHandler = (e) => {
        setStartRound(e.target.value);
    }
    
    const setRaceResult = {
        // win: (winner)=>{
        //     try{
        //         axios.patch(`/admin/contents/race/win/${winner}`)
        //     }catch(err){
        //         console.log(err);
        //     }
        // },
        // lose: (loser)=>{
        //     try{
        //         axios.patch(`/admin/contents/race/lose/${loser}`)
        //     }catch(err){
        //         console.log(err);
        //     }
        // },
        // finalWin: async (winner)=>{
        //     try{
        //         return axios.patch(`/admin/contents/race/finalwin/${winner}`) // promise return
        //     }catch(err){
        //         console.log(err)
        //     }
        // }

        win: (winner) => {
            raceResult.current = raceResult.current.map((item)=>{
               
                if(item.id === winner) item.winCnt += 1;
        
                return item;
            }
            )
        },
        lose: (loser) => {
            raceResult.current = raceResult.current.map((item)=>{
               
                if(item.id === loser) item.loseCnt += 1;
        
                return item;
            }
            )
        },
        finalWin: (winner) => {
            raceResult.current = raceResult.current.map((item)=>{
               
                if(item.id === winner) item.finalCnt += 1;
        
                return item;
            }
            )
        },
        sendResult: async(result) => {
            try{
                
                await axios.patch('/admin/contents/race/result/set/list',
                    {
                        raceRecords: result
                    }
                )
                 // promise return
            }catch(err){
                console.log(err)
            }
        
        },
        init: (races) => {
            return (
                races.map((item)=>{
                   return {
                            id: item._id,
                            finalCnt: 0,
                            winCnt: 0,
                            loseCnt: 0  
                        }
                })
            )
        }


    }
    const gameStartHandler = async(e) => {
        try{
            const ret = await axios.get(`/admin/contents/race/?categoryId=${id}&limit=${startRound}`);

            console.log("hello ideal race")
            raceResult.current = setRaceResult.init(ret.data.candidates);
            console.log(raceResult.current);
            setItems(ret.data.candidates);
            setNextRound((startRound/2));
            
        }catch(err){
            alert("시스템에 문제가 있습니다. 나중에 접속해주세요.")
        }

    }

    return(

        <Container>
    
            { isRoundStart?
                (
                    <>  
                        <Stack alignItems="center" justifyContent="center" sx={{marginBottom:"10px"}}>
                        <Typography variant="h2" >
                                    {searchParams.get('title')} 월드컵
                                </Typography>
                        </Stack>
                        <Stack direction="column" alignItems="center" justifyContent="center">
                        { nextRound === 1 ? "결승" : <>{nextRound * 2 } 강</> }
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
                                        </CardMediaStyle>
                                        <CardContent>
                                            <TitleStyle >                            
                                                {item.name}{item.group ? `(${item.group})`: ''}
                                            </TitleStyle>
                                        </CardContent>
                                        <VideoCover className={index}>
                                            imageCover
                                        </VideoCover>
                                    </Card>
                                )
                            })}
                        </Stack>
                    </>
                )
                :
                (
                    <>
                        <Container maxWidth="sm" >
                            <Stack direction="column" alignItems="center">
                                <Typography variant="h2" >
                                    {searchParams.get('title')} 월드컵
                                </Typography>
                                <FormControl fullWidth sx={{marginTop:"20px"}}>


                                    <InputLabel id="round-selector">Round</InputLabel>
                                    <Select 
                                        labelId="round-selector"
                                        id="simple-select-label"
                                        label="Rounddd"
                                        value={startRound}
                                        onChange={roundSelectorHandler}
                                    >
                                        <MenuItem value={8}>8강</MenuItem>
                                        <MenuItem value={16}>16강</MenuItem>
                                    </Select>

                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        startIcon={<SendIcon />}
                                        sx={{marginTop: "10px"}}
                                        onClick={gameStartHandler} 
                                    >
                                        Start
                                    </Button>

                                </FormControl>

                            </Stack>
                        </Container>
                    </>
                )
            }
        </Container>
    )
}   