import React from 'react';

function ReadContent(props){
    return(
        <article>
            <h2>{props.title}</h2>
            <p>{props.desc}</p>
        </article>
    );
}

export default ReadContent;