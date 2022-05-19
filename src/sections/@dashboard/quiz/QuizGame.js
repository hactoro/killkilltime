import React, {useState, useRef, useEffect} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';
import {Stack, Container, Typography, Button, Box, LinearProgress, Card, CardContent, Grid, CardActions } from '@mui/material';
import {styled} from '@mui/material/styles';
import axios from  'axios';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import HttpIcon from '@mui/icons-material/Http';
import useEffect2 from '../../../hooks/useEffect2';
import Page from '../../../components/Page';
import SpeedDial2, { useSpeedDialActionState } from '../../../components/SpeedDial2';
import KakaoIcon from '../../../components/custom-icon/KakaoIcon';
import {sendKakaoShare, copyAddress, returnToIdealMain, returnTo} from '../../../utils/speedDialActions';




export default function QuizGame(){

    const {id} = useParams();
    const [questions, setQuestions] = useState({});
    const [picked, setPicked] = useState({});
    const [isStarted, setIsStarted] = useState(false);
    const [isEnded, setIsEnded] = useState(false);
    const [progress, setProgress] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [actions, setActions ] = useSpeedDialActionState();


    const currentStep = useRef(0);
    const cntAnswer = useRef(0);

    useEffect(()=>{

        const getGame = async()=>{
            const ret = await axios.get(`/admin/contents/quiz/game/${id}`);
            setQuestions(ret.data.quiz);
        }
        getGame();

    }, []);
    
    useEffect2(()=>{

        const actionList = [
            {
                // icon: <KakaoIcon />,
                // name: ""
                icon: <KeyboardReturnIcon />,
                name: '퀴즈 리스트로 가기',
                action: returnTo,
                params: {
                            redirectPage: '/quiz'  
                }
            },
            {
                icon: <KakaoIcon />,
                name: '카카오로 공유하기',
                action: sendKakaoShare,
                params: {
                            contentTitle: questions.title,
                            desc: `#퀴즈 #당신의상식 #낄낄시간 #${questions.title}`,
                            imgSrc: "",
                            url: window.location.href,
                            redirectPage: '/quiz'
                }
            },
            {
                icon: <HttpIcon />,
                name: 'url 복사',
                action: copyAddress,
                params: {
                    url: window.location.href
                }
            }
        
        ]
        setActions(actionList)
      
        const currentProgress = ( (currentStep.current + 1) / questions.workbook.length ) * 100;
        setProgress(currentProgress);

    },[questions]);

    useEffect2(()=>{
        setIsStarted(true);
        const currentProgress = ( (currentStep.current + 1) / questions.workbook.length ) * 100;
        setProgress(currentProgress);
    }, [picked])
    

    const goGame = () => {
        
        setPicked(questions.workbook[0])
        
    }
    const goNext = (answer) => {
   
        if (answer === picked.answer[0]) cntAnswer.current += 1;
        setAnswers([
            ...answers,
            answer
        ])
        console.log(answer)

        if(currentStep.current + 1 >= questions.workbook.length){
            setIsEnded(true);
        }else{
            currentStep.current += 1;
            setPicked(questions.workbook[currentStep.current]);
        }
    }

    const CardMediaStyle = styled('div')({
        position: 'relative',
        paddingTop: 'calc(100% * 3 / 4)'
    });

    return(

        <Page>
            <Container>
            
                { isStarted ? 
                    (
                        <>
                            {
                                isEnded ? 
                                (
                                    <>
                                    <Stack>
                                        <Typography variant='h3'>
                                            퀴즈 결과
                                        </Typography>
                                        {questions.workbook.length} 문제 중에 {cntAnswer.current} 문제 맞추셨습니다.

                                    </Stack>

                                    <Stack style={{maxWidth:"600px"}}>

                                        <Grid container spacing={1}>
                                            {
                                                questions.workbook.map((item, index)=>{
                                                    return(
                                                        <>
                                                        
                                                        <Grid item xs={12} md={12}>
                                                        <Card>
                                                            <CardMediaStyle style={{backgroundImage:`url(${item.src})`, backgroundRepeat:"no-repeat", backgroundSize:"cover"}}>
                                                                {/* <background src={picked.src} alt="" style={{position:'absolute', top:'0', overflow:"hidden"}}/> */}
                                                            </CardMediaStyle>
                                                            <CardContent>
                                                                <Typography variant={'h4'}>
                                                                    {picked.question}
                                                                </Typography>
                                                                <Stack flexDirection="column" alignItems="start">
                                                                    <div>
                                                                        { item.answer[0] === answers[index] ?
                                                                        (
                                                                            <Typography>결과 : 정답!</Typography>
                                                                        )
                                                                        :
                                                                        (
                                                                            <Typography>결과 : 오답!</Typography>
                                                                        )
                                                                    }
                                                                    </div>
                                                                    <Stack>
                                                                        <Typography>
                                                                            정답 : {item.answer[0]}. {item.answer[1]}
                                                                        </Typography> 
                                                                        <Typography>
                                                                            당신의 선택 : {item.example[answers[index]-1][0]}. {item.example[answers[index]-1][1]}
                                                                        </Typography>
                                                                    </Stack>
                                                                </Stack>
                                                            </CardContent>
                                                        </Card>
                                                        
                                                        </Grid>
                                                        </>
                                                    )
                                                })
                                            }
                                        </Grid>
                                    </Stack>
                                    </>

                                )
                                :
                                (

                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={6} >

                                        <Stack sx={{marginBottom:{xs:"5px", md:"10px"}}}>
                                            <LinearProgress variant="determinate" value={progress} />
                                            
                                        </Stack>
                                        <Card>
                                            <CardMediaStyle style={{backgroundImage:`url(${picked.src})`, backgroundRepeat:"no-repeat", backgroundSize:"cover"}}>
                                                {/* <background src={picked.src} alt="" style={{position:'absolute', top:'0', overflow:"hidden"}}/> */}
                                            </CardMediaStyle>
                                            <CardContent>
                                                <Typography variant={'h4'}>
                                                    {picked.question} ( {currentStep.current+1} / {questions.workbook.length} )
                                                </Typography>
                                                <Stack flexDirection="column" alignItems="start">
                                                    {picked.example.map((item)=>{
                                                        return(
                                                            <Button variant="outlined" key={item[0]} onClick={()=>goNext(item[0])} sx={{margin:{xs:'2px', md:'5px'}}}><Typography >{item[0]}. {item[1]}</Typography></Button> 
                                                        )
                                                    })}
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                        </Grid>
                                    </Grid>
                                )  
                            }
                        </>
                        
                    )
                    :
                    (
                    
                    <Grid container xs={12} md={6}>
                        <Grid item>
                            <Card>
                                <CardContent>
                                    <Typography variant="h4" sx={{marginBottom:"10px"}}>
                                        {questions.title}
                                    </Typography>
                                    <Typography>
                                        {questions.description}
                                    </Typography>

                                </CardContent>
                                <CardActions>
                                    <Button variant="outlined" onClick={goGame}>
                                        시작하기!
                                    </Button>
                                </CardActions>
                            </Card>    
                        </Grid>
                    </Grid>
                    )

                }


<SpeedDial2 actions={actions}/>
            </Container>
        </Page>

    )
}