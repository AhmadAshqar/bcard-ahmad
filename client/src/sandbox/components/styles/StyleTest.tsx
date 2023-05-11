import React from 'react'
import "./styletest.css"

const StyleTest = () => {
    const purple : React.CSSProperties = {
        backgroundColor: "purple",
        color: "red"
    }

    let isGreen = true
        isGreen = false
        let colorss = {}
    if (isGreen) {
        colorss = {backgroundColor: "green"}
    } else {
        colorss = {backgroundColor: "blue"}
    }


    return (
    <>
    <h1 style={{backgroundColor: "yellow"}}>Title</h1>
    <h2 style={purple}>SubTitle</h2>
    <hr />
    <p className='paragraph'>paragraph</p>
    <span style={colorss}>SPAN</span>
    <br />
    <span style={{backgroundColor: isGreen ? "green" : "blue"}}>SPAN</span>
    </>
    )
}

export default StyleTest