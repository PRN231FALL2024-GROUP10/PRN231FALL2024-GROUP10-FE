import React, {useState,ChangeEvent} from "react";

export default function PostPrivacyRadio(
    {radChecks,actionFunc=()=>{}}:
    {
        radChecks: boolean[]
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
            <label className='xrcTpLbl'>
                Who can see this post?
            </label>
            <div className='xrcTpRdbnBlk'>
                <div className='rdbBlk'>
                    <div className='rdbtn'>
                        <input type='radio' value= {1}
                            checked={radChecks[0]}
                            onChange={e=>radioSelect(e)} />
                    </div>
                    <div className='trsTpLbl'>Public</div>
                </div>
                <div className='rdbBlk'>
                    <div className='rdbtn'>
                        <input type='radio' value= {2}
                            checked={radChecks[1]}
                            onChange={e=>radioSelect(e)} />
                    </div>
                    <div className='trsTpLbl'>Only Me</div>
                </div>
            </div>
        </div>
    )
}