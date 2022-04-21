import React from 'react';
import { useParams } from 'react-router-dom';

export default function IdelaVs(){

    const { id } = useParams();
    console.log(id);

    
    return(
        <div>
            
            김밥 vs 초밥
        </div>
    )
}   