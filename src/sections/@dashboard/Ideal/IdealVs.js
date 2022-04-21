import React,{useState, useRef} from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Box, Container } from '@mui/material';
import {styled} from '@mui/material/styles';
import ReactPlayer from 'react-player';
import girlIdeals from '../../../_mock/girlIdeals';

export default function IdelaVs(){

    const { id } = useParams();
    console.log(id);
    const imgStyle = styled('img')({

    })
    const offset = useRef(0);
    const [items, setItems] = useState(girlIdeals);
    const [winners, setWinners] = useState([]);
    const [round, setRound] = useState([items[offset.current], items[offset.current+1]]);
    

    const roundUpHandler = (e) => {
    }
    // setRound([
    //     items[0],
    //     items[1]
    // ])

    // console.log(round);
    return(

        <Container sx={{border:"1px solid black"}}>
            <Stack direction="row" alignItems="center" justifyContent="center" sx={{border:"1px solid black"}}>
                {round.map((item, index)=>{
                    return(
                    <Box onClick={roundUpHandler}>
                        <ReactPlayer
                            url={item.src}
                            width="100%"
                            height="100%"
                            muted
                            playing
                            playsinline
                            loop
                            />
                    </Box>
                    )
                })}
        
                {/* <Box component="div" sx={{width:"50%", border:"1px solid black", position:"relative"}}>
                    <ReactPlayer
                        url={"https://thumbs.gfycat.com/ScentedLividGoral-mobile.mp4"}
                        width="100%"
                        height="100%"
                        muted
                        playing
                        playsinline
                        loop
                    />
                    <Box component="div">
                        사나
                    </Box>
                </Box>
   
                <Box component="div" sx={{width:"50%", border:"1px solid black"}}>
                    <ReactPlayer
                            url={"https://thumbs.gfycat.com/VariableShortGoral-mobile.mp4"}
                            width="100%"
                            height="100%"
                            muted
                            playing
                            playsinline
                            loop
                        />
                        <Box component="div">
                            아이유
                        </Box>
                </Box> */}
            </Stack>
        </Container>
    )
}   