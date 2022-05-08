import { CardActions, Stack, Typography, Card, CardContent, Link, Button, ButtonGroup, Box, SpeedDial, SpeedDialAction, Menu, MenuItem, SliderThumb, Snackbar} from '@mui/material';
import {styled} from '@mui/material/styles';
import ReactPlayer from 'react-player';
import React, { useState, useEffect } from 'react'; 
import SendIcon from '@mui/icons-material/Send';
import ShareIcon from '@mui/icons-material/Share';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import EqualizerIcon from '@mui/icons-material/Equalizer';
// import {useNavigate} from 'react-router-dom';

import {Link as RouterLink, useNavigate} from 'react-router-dom';

import KakaoShareButton from '../../../components/KakaoShareButton'

export default function IdealCard(props){

    const {title, content, videoSrc, categoryId} = props;
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
        navigate(`/ideal/${categoryId}?title=${title}`)
    }

    const goRanks = (e) => {
        navigate(`/ideal/ranks/${categoryId}`)
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const [infoOpen, setInfoOpen] = useState(false);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const shareKakao = () => {
        alert("share kakao")
        setAnchorEl(null);
    };

    const shareUri = async() => {

        await navigator.clipboard.writeText(`${window.location.href}/${categoryId}?title=${title}`);
        setInfoOpen(true);

        setAnchorEl(null);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }
    const snackBarCloseHandler = () => {
        setInfoOpen(false);
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
            </CardContent>
            <CardActions sx={{position:'relative', justifyContent:"center"}}>
                <ButtonGroup >
                    <Button size="small" onClick={cardActionHandler}>시작</Button>
                    <Button size="small" onClick={goRanks}>랭킹</Button>
                    <Button 
                        id="share-button"
                        aria-controls={open ? 'share-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        size="small">공유
                    </Button>
                </ButtonGroup>
                <Menu
                    id='share-menu'
                    anchorEl={anchorEl}
                    anchorOrigin={{vertical:'top'}}
                    transformOrigin={{vertical:"bottom"}}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button'
                        
                    }}
                    sx={{width:"200px"}}

                >
                <MenuItem name="source" onClick={shareUri}>주소복사</MenuItem>
                <MenuItem name="kakao" onClick={shareKakao}><KakaoShareButton contentTitle={title} url={`${window.location.href}/${categoryId}?title=${title}`} imgSrc={'img/kakaotalk.png'} /></MenuItem>
                  </Menu>
            </CardActions>
            <Snackbar
                anchorOrigin={{vertical:'bottom',horizontal:'right'}}
                open={infoOpen}
                autoHideDuration={1500}
                message="복사완료!"
                onClose={snackBarCloseHandler}
            />
        </Card>

    )


}