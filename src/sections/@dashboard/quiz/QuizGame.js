import React, {useState, useRef, useEffect} from 'react';
import {Stack, Container, Typography, Button, Box, LinearProgress } from '@mui/material';
import useEffect2 from '../../../hooks/useEffect2';
import Page from '../../../components/Page';

const example = {
    title: "어느 나라 국기일까?",
    description: "전세계에는 208개의 국가들이 있죠. 그들은 모두 국기를 가지고 있답니다. 여러분은 얼마나 많은 국가들의 국기를 알고 있나요?",
    like: 119,
    click: 1231,

    workbook: [
        {
            src: "https://cdn.pixabay.com/photo/2013/07/13/14/17/russia-162400_1280.png",
            question: "어느 국가의 국기일까요?",
            example1: [1, "미국"],
            example2: [2, "일본"],
            example3: [3, "러시아"],
            example4: [4, "벨기에"],
            answer: [3, "러시아"]

        },
        {
            src: "https://cdn.pixabay.com/photo/2012/04/12/23/52/germany-31017_1280.png",
            question: "어느 국가의 국기일까요?",
            example1: [1, "벨기에"],
            example2: [2, "이탈리아"],
            example3: [3, "독일"],
            example4: [4, "대한민국"],
            answer: [3, "독일"]

        }
    ]
}


export default function QuizGame(){

    const [questions, setQuestions] = useState(example);
    const [picked, setPicked] = useState({});
    const [isStarted, setIsStarted] = useState(false);
    const [progress, setProgress] = useState(0);

    const currentStep = useRef(1);

    console.log(questions.title);
    useEffect(()=>{
        const currentProgress = ( currentStep.current / questions.workbook.length ) * 100;
        setProgress(currentProgress);
    }, [])

    useEffect2(()=>{
        setIsStarted(true);
        const currentProgress = ( currentStep.current / questions.workbook.length ) * 100;
        setProgress(currentProgress);
    }, [picked])
    
    const goGame = () => {
        
        setPicked(questions.workbook[0])
        
    }
    const goNext = () => {
        if(currentStep.current >= questions.workbook.length) return 0;
        currentStep.current += 1;
        setPicked(questions.workbook[currentStep.current]);
    }

    return(

        <Page>
            <Container>
                { isStarted ? 
                  (
                      <>
                      <Stack>
                        <LinearProgress variant="determinate" value={progress} />
                      </Stack>
                      <Stack>
                          <Typography>
                              {picked.question}
                          </Typography>
                          <img src={picked.src} alt="" style={{width:'100%', height:'100%'}}/>
                      </Stack>
                      <Button onClick={goNext}>
                          다음
                      </Button>
                      </>
                  )
                  :
                  (
                      
                    <Box component={'div'}>
                            {questions.title}
                        <Typography>
                            {questions.description}
                        </Typography>

                        <Button onClick={goGame}>
                            시작하기!
                        </Button>
                    </Box>
                  )

                }


         
            </Container>
        </Page>

    )
}