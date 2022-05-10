import {Container, Stack, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material'
import {useNavigate} from 'react-router-dom';
import {styled} from '@mui/material/styles';


import Page from '../components/Page';

const CardMediaStyle = styled('div')({
    position: 'relative',
    paddingTop: 'calc(100% * 3 / 4)',
    overflow: 'hidden'
})

const CoverMediaStyle = styled('div')({
    top: '0',
    position: 'absolute',
    width: '100%',
    objectFit: 'cover'

})

export default function Quiz(){
    
    const navigate = useNavigate();

    const goQuiz = () => {
        navigate('/QuizGame')
    }

    return(
        <Page title="퀴즈퀴즈퀴즈">
            <Container>
                <Stack>
                    <Typography variant='h4' style={{color:"grey", marginBottom:"10px"}}>
                        퀴즈퀴즈퀴즈 
                    </Typography>
                </Stack>

                <Grid container spacing={1}>
                    <Grid item xs={12} md={3}>
                        <Card>
                            
                            <CardMediaStyle>
                                <CoverMediaStyle>
                                    <img 
                                        src="https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/24hp/image/fN3xqA-pLdSniyfQwYPnAeKUBXc.png"
                                        alt=""
                                        
                
                                    />
                                </CoverMediaStyle>
                                
                            </CardMediaStyle>
                                
  
                            <CardContent>
                                어느 나라 국기일까?
                            </CardContent>
                            <CardActions>
                                <Button onClick={goQuiz}>
                                    시작
                                </Button>
                            </CardActions>
                        </Card> 
                    </Grid>
                </Grid>

            </Container>
        </Page>

    )
}