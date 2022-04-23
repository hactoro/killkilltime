import React, {useEffect, useState} from 'react';

export default function useEffect2(cb, observation){

    const [isFirst, setIsFirst] = useState(true);
    useEffect(()=>{
        if(isFirst) {
            setIsFirst(false);
            return;
        }
        cb();
    }, observation);

}