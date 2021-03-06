import React, {useState, useEffect} from 'react';
import {useParams, useSearchParams} from 'react-router-dom'
import ReactPlayer from 'react-player';
import {Container, Stack, Typography, Card, CardContent, CardActions, CardHeader, Box, Grid, useMediaQuery,
        Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, tableCellClasses
        } from '@mui/material';
import {styled} from '@mui/material/styles';
import axios from 'axios';
import {  faTrophy, faMedal, faFaceSadTear, faRankingStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Page from '../../../components/Page';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


export default function Ranks(){

    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams(); // title
    const [ranks, setRanks] = useState();
    // Rank db에서 가져오기
    useEffect(()=>{
        const getRanks = async () => {
            const ret = await axios.get(`/admin/contents/race/ranks?cateId=${id}`);
            setRanks(ret.data.ranks);
        }
        getRanks();
    }, [])


    return(
        <Page title={'이상형월드컵: 순위'} >
            <Container>
                <Stack>
                    <Typography variant='h4' style={{color:'grey'}} >
                        {searchParams.get('title')} 순위
                    </Typography>
                </Stack>
                <Stack flexDirection={'row'} justifyContent={'center'} sx={{margin:'20px'}}>
                    <Typography variant='h2'>
                        TOP 10
                    </Typography>
                    
                </Stack>
                <Stack alignItems={"center"} justifyContent={"center"}>

                    { ranks ? 
                        (
                            <>

                            <Stack sx={{marginTop:"20px;"}}>

                                <Stack justifyContent={'center'} sx={{marginBottom: "15px"}}>
                                    <CardRank 
                                        rank={'1위'} 
                                        src={ranks[0].src}
                                        name={ranks[0].name}
                                        group={ranks[0].group}
                                        finalWin={ranks[0].statics.finalWin}
                                        win={ranks[0].statics.win}
                                        lose={ranks[0].statics.lose}
                                        />
                                </Stack>
                                

                                <Grid container 
                                        spacing={{
                                            md: 10,
                                            sm: 2,
                                            xs: 2}}>
        
                                    <Grid item xs={12} md={6}>
                                        <CardRank 
                                            rank={'2위'} 
                                            src={ranks[1].src}
                                            name={ranks[1].name}
                                            group={ranks[1].group}
                                            finalWin={ranks[1].statics.finalWin}
                                            win={ranks[1].statics.win}
                                            lose={ranks[1].statics.lose}
                                            />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <CardRank 
                                            rank={'3위'} 
                                            src={ranks[2].src}
                                            name={ranks[2].name}
                                            group={ranks[2].group}
                                            finalWin={ranks[2].statics.finalWin}
                                            win={ranks[2].statics.win}
                                            lose={ranks[2].statics.lose}
                                            />
                                    </Grid>
                                </Grid>
                            </Stack>

                            <Stack sx={{marginTop:"10px"}}>
                                
                                <TableContainer component={Paper}>
                                    <Table stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="center">순위</StyledTableCell>
                                                <StyledTableCell align="center">이름</StyledTableCell>
                                                <StyledTableCell align="center">최종우승</StyledTableCell>
                                                <StyledTableCell align="center">1:1우승</StyledTableCell>
                                                <StyledTableCell align="center">1:1패배</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {ranks.map((item,index)=>{

                                                let ret;
                                                
                                                return(

                                                            <StyledTableRow key={item._id}>
                                                                <TableCell component="th" scope="row">
                                                                    {index+1}
                                                                </TableCell>
                                                                <TableCell align="center">{item.name}</TableCell>
                                                                <TableCell align="center">{item.statics.finalWin}</TableCell>
                                                                <TableCell align="center">{item.statics.win}</TableCell>
                                                                <TableCell align="center">{item.statics.lose}</TableCell>
                                                            </StyledTableRow>
                                                )
                                
                                                
                                                
                                                

                                                    
                                                
                                            })}
                                        </TableBody>
                                    </Table>        
                                    
                            
                                </TableContainer>


                            </Stack>
                            
                            
                            
                            
                            
                            
                            </>
                            
                            
                        )
                        : 
                        (
                            "시스템 연결에 문제가 있습니다."
                        )}
                </Stack>
            </Container>
        </Page>
    )
}

export function CardRank({rank, src, name, group, finalWin, win, lose}){

    return(
        <Card>
                      
            <Stack>
                <Typography variant="h3"  style={{margin :"20px"}}>
                    <FontAwesomeIcon icon={faRankingStar} style={{color:"gold"}}/> {rank}
                </Typography>
                
            </Stack>
            
    
            <ReactPlayer
                url={src} // 1등
                width="100%"
                // height="100%"
                muted 
                playing
                playsinline
                loop
            />
            <CardContent sx={{position:"relative"}}>
                <Typography align="center" variant="h3" >
                    {name}{group ? `(${group})`: ''}
                </Typography>


                <Stack flexDirection={'row'} justifyContent={'space-around'}>
                    <Box>
                        <Box>
                            최종우승
                        </Box>
                        <Box sx={{textAlign:"center"}}>
                            <FontAwesomeIcon icon={faTrophy} style={{marginRight:"7px", color:"gold"}}/> 
                            {finalWin ? `${finalWin}` : 0}
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            1vs1 승리
                        </Box>
                        <Box sx={{textAlign:"center"}}>
                            <FontAwesomeIcon icon={faMedal} style={{marginRight:"7px", color:"blue"}}/> 
                            {win ? `${win}`:0}  
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            1vs1 패배
                        </Box>
                        <Box sx={{textAlign:"center"}}>
                            <FontAwesomeIcon icon={faFaceSadTear} style={{marginRight:"7px", color:"grey"}}/> 
                            {lose ? `${lose}`:0}
                        </Box>
                    </Box>
                </Stack>
            </CardContent>
        </Card>   
    )
}