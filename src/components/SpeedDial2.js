import { useState, useEffect } from 'react';
import { ListItemAvatar, SpeedDial, SpeedDialAction, SpeedDialIcon, Snackbar } from '@mui/material'
import { PropaneSharp } from '@mui/icons-material';

export default function SpeedDial2({actions}){
    
    const [open, setOpen] = useState();
    const [infoOpen, setInfoOpen] = useState(false);
    const [infoMessage, setInfoMessage] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    

    const speedDialCloseHandle = () => {
        setOpen(false);
    }
    const speedDialOpenHandle = () =>{
        setOpen(true);
    }
    const snackBarCloseHandler = () => {
        setInfoOpen(false);
    }
    return(
        <>
        <SpeedDial
            ariaLabel=""
            onClose={speedDialCloseHandle}
            onOpen={speedDialOpenHandle}
            open={open}
            direction={"up"}
            FabProps={{size: "small"}}
            icon={<SpeedDialIcon />}
            >
            
            {
                actions.map((action)=>{

                    return(
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={async()=>{
                                await action.action(action.params);
                                setInfoMessage(action.name);
                                setInfoOpen(true);
                                setAnchorEl(null);
                            }}
                        />
                    )
                })
            }

        </SpeedDial>

        <Snackbar
        anchorOrigin={{vertical:'bottom',horizontal:'right'}}
        open={infoOpen}
        autoHideDuration={1500}
        message={infoMessage}
        onClose={snackBarCloseHandler}
        />
        </>
    )
}

// export const Action = {

    
//     actions : [],
//     setAction : (action)=>{
//         Action.actions.push(action);
//     },
//     getActions : ()=>{
//         return Action.actions
//     }

// }

export function useSpeedDialActionState(props){
    const [actions, setActions] = useState([]);
    const addActions = (actionList) => {
        
        if(!Array.isArray(actions)) throw new Error("action list is required array!")
        setActions(actionList);
    }
    const addAction = (action) => {

        console.log(action);
        setActions([
            ...actions,
            action
        ])
    }
    return [actions, addActions];
}