import {Typography, Card, CardContent, Link} from '@mui/material';
import {styled} from '@mui/material/styles';
import ReactPlayer from 'react-player';
import {Link as RouterLink} from 'react-router-dom';

export default function IdealCard(props){

    const {title, content, videoSrc, pageId} = props;

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
        WebkitBoxOrient: 'vertical',
        textAlign: 'center'
    });

    return(
        <Card>
            <CardMediaStyle>
                <CoverVideoStyle>
                    <ReactPlayer
                        url={videoSrc}
                        width="100%"
                        height="100%"
                        muted
                        playing
                        loop
                        playsinline
                    />
                </CoverVideoStyle>
            </CardMediaStyle>
            <CardContent>
            <TitleStyle
                to={`/dashboard/ideal/${pageId}`}
                color="inherit"
                variant='subtitle2'
                underline='hover'
                component={RouterLink}
            >
                {title}
            </TitleStyle>
            </CardContent>
        </Card>

    )


}