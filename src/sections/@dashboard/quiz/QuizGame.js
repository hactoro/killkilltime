import React, {useState, useRef, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Stack, Container, Typography, Button, Box, LinearProgress, Card, CardContent, Grid, CardActions } from '@mui/material';
import {styled} from '@mui/material/styles';
import axios from  'axios';
import useEffect2 from '../../../hooks/useEffect2';
import Page from '../../../components/Page';

const example = {
    title: "어느 나라 국기일까?",
    description: "전세계에는 208개의 국가들이 있죠. 그들은 모두 국기를 가지고 있답니다. 여러분은 얼마나 많은 나라의 국기를 알고 있나요?",
    like: 119,
    click: 1231,

    workbook: [
        {
            src: "https://cdn.pixabay.com/photo/2013/07/13/14/17/russia-162400_1280.png",
            question: "어떤 나라의 국기일까요?",
            example: [[1, "미국"], [2, "일본"], [3, "러시아"], [4, "벨기에"]],
            answer: [3, "러시아"]

        },
        {
            src: "https://cdn.pixabay.com/photo/2012/04/12/23/52/germany-31017_1280.png",
            question: "어떤 나라의 국기일까요?",
            example: [[1, "벨기에"], [2, "이탈리아"], [3, "독일"], [4, "대한민국"]],
            answer: [3, "독일"]

        }
    ]
}


export default function QuizGame(){

    const {id} = useParams();
    const [questions, setQuestions] = useState({});
    const [picked, setPicked] = useState({});
    const [isStarted, setIsStarted] = useState(false);
    const [progress, setProgress] = useState(0);

    const currentStep = useRef(0);
    console.log("category")
    console.log(id);
    useEffect(()=>{

        const getGame = async()=>{
            const ret = await axios.get(`/admin/contents/quiz/game/${id}`);
            setQuestions(ret.data.quiz);
        }
        getGame();

    }, []);
    
    useEffect2(()=>{

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
    const goNext = (e) => {
        if(currentStep.current + 1 >= questions.workbook.length){
            alert("끝!");
        }else{
            console.log(e.target)
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
                                            <Button variant="outlined" key={item[0]} onClick={goNext} sx={{margin:{xs:'2px', md:'5px'}}}><Typography >{item[0]}. {item[1]}</Typography></Button> 
                                        )
                                    })}
                                </Stack>
                            </CardContent>
                        </Card>
                        </Grid>
                    </Grid>
                    
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


         
            </Container>
        </Page>

    )
}