import React, { useState, useEffect } from 'react'
import { colorLog } from '../utils'

const LifecycleExe = () => {
    const [count, setCount] = useState(()=>{
        colorLog("1","red")

        setTimeout(()=>{colorLog("5","blue")},1000)
        return 0
    })


    useEffect(()=>{
        colorLog("3", "black")
        return ()=> {colorLog("6", "black")}
    },[])

    useEffect(()=>{colorLog("4","purple")},[count])



  return (
    <div>
        {colorLog("2","black")}
        <button
        onClick={() => setCount(prev => prev + 1)}>
            count
        </button>
    </div>
  )
}

export default LifecycleExe