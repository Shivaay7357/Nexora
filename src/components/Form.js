import React from 'react'

export default function Form(props) {
const handleupClick=()=>{
  console.log("uppercase is clicked");
}
  return (
    <div>
     <h2>{props.heading}</h2>
<div className="mb-3">
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="8"></textarea>
</div>
<button className="btn btn-primary" onClick={handleupClick}>convert to uppercase</button>
    </div>
  )
}

