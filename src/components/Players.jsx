import React, { useState } from 'react'

const Players = ({name,symbol,isActive,onChangeName}) => {
  const[isEditing,setIsEditing]=useState(false);
  const [namePlayer,setNamePlayer]=useState(name);
  function inputHandler(e){
    setNamePlayer(e.target.value);

  }
  const buttonHandler=()=>{
    setIsEditing((editing)=>{
     return !editing
    })

    if(isEditing){
      onChangeName(symbol,namePlayer);
    }
    
  }
  let playerName=<span className="player-name">{namePlayer}</span>;
  if(isEditing){
    playerName=<input onChange={inputHandler} type='text' required value={namePlayer}/>
  }
  return (
    <li className={isActive?"active":undefined}>
            <span className="player">
              {playerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={buttonHandler}>{isEditing?"Save":"Edit"}</button>
          </li>
  )
}

export default Players