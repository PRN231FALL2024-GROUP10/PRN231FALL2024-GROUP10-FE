import React, {useState,ChangeEvent} from "react";
import "./RadioChoice.css";

export default function PostSkillWrapper(
    {radChecks,actionFunc=()=>{}}:
    {
        radChecks: number[]
        actionFunc?: (v:number) => void
    }) {


    function radioSelect(evt:ChangeEvent<HTMLInputElement>) {
        console.log('radioSelect -> '+evt.target.value)
        if (typeof actionFunc===undefined) return
        actionFunc(parseInt(evt.target.value))
        console.log('actionFunc called!')
    } /* End of radioSelect */


    return (
        <div className='xrcTpSlctBlk'>
            
        </div>
    )
}