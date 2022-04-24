import {Stack, Container, Grid, Typography, Card, CardContent, Link} from '@mui/material';
import {styled} from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import ReactPlayer from 'react-player';
import IdealCard from '../sections/@dashboard/Ideal/IdealCard';
import Page from '../components/Page';
import ideals from '../_mock/ideal';





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
                <Grid container spacing={1}>
                    {ideals.map((item, index)=>{
                        return(
                            <Grid item xs={12} md={3}>
                                <IdealCard title={item.title} videoSrc={item.videoSrc} category={item.category} />
                            </Grid>)
                    })}
                </Grid>
            </Container>
        </Page>
    )
}