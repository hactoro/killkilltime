import { CardActions, Stack, Typography, Card, CardContent, Link, Button, ButtonGroup, Box, SpeedDial, SpeedDialAction} from '@mui/material';
import {styled} from '@mui/material/styles';
import ReactPlayer from 'react-player';
import SendIcon from '@mui/icons-material/Send';
import ShareIcon from '@mui/icons-material/Share';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import EqualizerIcon from '@mui/icons-material/Equalizer';
// import {useNavigate} from 'react-router-dom';

import {Link as RouterLink, useNavigate} from 'react-router-dom';

export default function IdealCard(props){

    const {title, content, videoSrc, category} = props;
    const navigate = useNavigate();


    const actions = [
        // { icon: <FileCopyIcon />, name: 'Copy' },
        // { icon: <SaveIcon />, name: 'Save' },
        // { icon: <PrintIcon />, name: 'Print' },
        { icon: <ShareIcon />, name: 'Share' },
      ];
    const CardMediaStyle = styled('div')({
        position: 'relative',
        paddingTop: 'calc(100% * 3 / 4)',
        overflow: 'hidden'
    });
    const CoverVideoStyle = styled('div')({
        top: "0",
        position: 'absolute',
        width: "100%",
        // height: "100%",
        objectFit: "cover",
        // overflow: "hidden"
    });
    // const TitleStyle = styled(Link)({
    //     height: 30,
    //     overflow: 'hidden',
    //     WebkitLineClamp: 1, // block 안에서 글자 라인을 제한할 수 있음.
    //     display: '-webkit-box',
    //     WebkitBoxOrient: 'vertical',
    //     textAlign: 'center'
    // });
    const TitleStyle = styled('div')({
        height: 30,
        overflow: 'hidden',
        WebkitLineClamp: 1, // block 안에서 글자 라인을 제한할 수 있음.
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        textAlign: 'center',
        lineHeight: '30px'
    });

    const cardActionHandler = (e) => {

        console.log(e.target.value);
        navigate(`/dashboard/ideal/${e.target.value}`)
    }

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
            <CardContent sx={{padding:"10px"}} >
                <TitleStyle>
                    {title}
                </TitleStyle>
                {/* <TitleStyle
                    to={`/dashboard/ideal/${category}`}
                    color="inherit"
                    variant='h6'
                    underline='hover'
                    
                    component={RouterLink}
                >
                    {title}
                </TitleStyle> */}
                {/* <Box sx={{ height: 40, transform: 'translateZ(0px)', flexGrow: 1 }}>
                    <SpeedDial
                        ariaLabel="SpeedDial"
                        sx={{ position: 'relative'}}
                        icon={<SpeedDialIcon 
                            fontSize="small"/>}
                        direction="left"
                        
                    >
                        {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                        />
                        ))}
                    </SpeedDial>
                </Box> */}
            </CardContent>
            <CardActions sx={{position:'relative', justifyContent:"center"}}>
                <ButtonGroup >
                    <Button size="small" value={category} onClick={cardActionHandler}>시작</Button>
                    <Button size="small">통계</Button>
                    <Button size="small">공유</Button>
                </ButtonGroup>
            </CardActions>
        </Card>

    )


}