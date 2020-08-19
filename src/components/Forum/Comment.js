import React, { useState } from 'react';

import Reply from './Reply';

import moment from 'moment';

export default function Comment({comment, name, date, id}) {

  const [repliesHidden, setRepliesHidden] = useState(true);

  const handleClick = e => {
    e.preventDefault();

    if (repliesHidden === true){
      setRepliesHidden(false);
    } else {
      setRepliesHidden(true);
    }
  }

  return (
    <div className="forum_comment">
      <p>{comment}</p>
      <p>{name}</p>
      <p>{moment(date.toDate()).calendar()}</p>

      { repliesHidden ?
        <button onClick={handleClick}>Pokaż komentarze...</button>

      :
        <>
          <Reply id={id}/>
          <button onClick={handleClick}>Ukryj komentarze</button>
        </>
      } 
    </div>
  )
}