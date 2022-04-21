import {Stack, Container, Grid, Typography, Card, CardContent, Link} from '@mui/material';
import {styled} from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Page from '../components/Page';




const CardMediaStyle = styled('div')({
    position: 'relative',
    paddingTop: 'calc(100% * 3 / 4)'
});
const CoverVideoStyle = styled('div')({
    top: "0",
    position: 'absolute',
    width: "100%",
    height: "100%",
    objectFit: "cover"
});
const TitleStyle = styled(Link)({
    height: 44,
    overflow: 'hidden',
    WebkitLineClamp: 2, // block 안에서 글자 라인을 제한할 수 있음.
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical'

});

export default function Ideal(){
    const title = "블랙핑크";
    const cover = "https://thumbs.gfycat.com/FarflungCautiousHapuka-mobile.mp4";

    return(
        <Page title="이상형 월드컵">
            <Container>
          
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3} sx={{textAlign:"center"}}>
                        <Card>
                            <CardMediaStyle>
                                <CoverVideoStyle>
                                    <ReactPlayer 
                                        url={cover} 
                                        width="100%"
                                        height="100%"
                                        muted
                                        playing
                                        loop
                                        />
                                </CoverVideoStyle>
                                
                            </CardMediaStyle>
                            <CardContent>
                                <Typography gutterBottom variant="caption" sx={{color: 'text.disabled', display: 'block'}}>
                                    그래~ 안녕!
                                </Typography>
                                <TitleStyle
                                    to="/dashboard/ideal/10000"
                                    color="inherit"
                                    variant='subtitle2'
                                    underline='hover'
                                    component={RouterLink}
                                >
                                    hello
                                </TitleStyle>
                        
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        굿모닝!
                    </Grid>
                    <Grid item xs={12} md={4}>
                        좋은아침!
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}