import React, {useState, useEffect} from 'react';
import {useParams, useSearchParams} from 'react-router-dom'
import {Container, Stack} from '@mui/material'
import axios from 'axios';



export default function Ranks(){

    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams(); // title
    const [ranks, setRanks] = useState();
    // Rank db에서 가져오기
    useEffect(()=>{
        const getRanks = async () => {
            console.log("why")
            const ret = await axios.get(`/admin/contents/race/ranks?cateId=${id}`);
            console.log(ret);
            setRanks(ret.data.ranks);
        }
        getRanks();
    }, [])


    return(
        <Container>
            <Stack>
                { ranks ? ranks[1].name : ""}
            </Stack>
        </Container>
    )
}