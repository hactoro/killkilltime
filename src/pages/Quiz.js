import React, {useState, useRef, useEffect} from 'react';
import {Container, Stack, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {styled} from '@mui/material/styles';


import Page from '../components/Page';

const CardMediaStyle = styled('div')({
    position: 'relative',
    paddingTop: 'calc(100% * 3 / 4)',
})

const CoverMediaStyle = styled('div')({
    top: '0',
    position: 'absolute',
    width: '100%',
    objectFit: 'cover'

})

export default function Quiz(){
    
    const navigate = useNavigate();
    const [quizList, setQuizList] = useState([]);

    const goQuiz = (id) => {
        console.log(id);
        navigate(`/QuizGame/${id}`)
    }

    useEffect(()=>{
        const getQuizList = async()=>{
            const ret = await axios.get('/admin/contents/quiz/list');
            setQuizList(ret.data.quizList);
        };
        getQuizList();
    }, []);


    return(
        <Page title="퀴즈퀴즈퀴즈">
            <Container>
                <Stack>
                    <Typography variant='h4' style={{color:"grey", marginBottom:"10px"}}>
                        퀴즈퀴즈퀴즈 
                    </Typography>
                </Stack>

                {
                    quizList ? 
                    (

                        <Grid container spacing={1}>

                            { quizList.map((item)=>{
                                return(

                                    <Grid item xs={12} md={3}>
                                        <Card>
                                            <CardMediaStyle style={{
                                                                    backgroundImage:`url(${item.src})`, 
                                                                    backgroundRepeat:'no-repeat', 
                                                                    backgroundSize:'cover'}} />
                                    
                                                
                                            <CardContent>
                                                <Typography variant="h3" style={{color:"grey", marginBottom: "5px"}}>{item.title}</Typography> 
                                                <Typography variant="h5">
                                                    {item.content}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button onClick={()=>goQuiz(item._id)}>
                                                    시작
                                                </Button>
                                            </CardActions>
                                        </Card> 
                                    </Grid>
                                )
                                })
                            }
                        </Grid>
                    )
                    :
                    (
                        <Typography>잠시만 기다려주세요!</Typography> 
                    )


                }

            </Container>
        </Page>

    )
}