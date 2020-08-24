import React, { useState } from 'react';

import Reply from './Reply';

import moment from 'moment';

export default function Comment({comment, name, surname, date, id}) {

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
      <p className="forum_comment_name">{name} {surname}</p>
      <p className="forum_comment_text">{comment}</p>
      <p className="forum_comment_date">{moment(date.toDate()).calendar()}</p>

      <div className="forum_comment_bottom_section">
        { repliesHidden ?
          <button className="forum_comment_btn-unwrap" onClick={handleClick}>Pokaż komentarze...</button>

        :
          <>
            <div className="forum_comment_reply_section">
              <p className="forum_comment_reply_section_title">Odpowiedzi:</p>
              <Reply id={id}/>
            </div>
            <button className="forum_comment_btn-wrap" onClick={handleClick}>Ukryj komentarze</button>
          </>
        } 
      </div>
    </div>
  )
}