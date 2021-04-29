import React,{useState} from 'react';

function UpdateContent(props){
    
    // console.log(props.data);
    const [_id, set_id] = useState({ id:props.data.id });
    const [_title, set_title] = useState({ title: props.data.title });
    const [_desc, set_desc] = useState({ desc: props.data.desc });

    /*
    function inputFormHandler(e){
        console.log("inputFormHandler ", [e.target.name], "value :  " , e.target.value);
        setupdateContent({
            [e.target.name]: e.target.value
        });
    }
    //this.inputFormHandler = this.inputFormHandler.bind(this);
    */
    return(
        <article>
            <h2>Update</h2>
            <form action="/create_process" method="post"
                onSubmit={function(e){
                    e.preventDefault();
                    props.onSubmit( _id.id, _title.title, _desc.desc );
                }}>
                <input type="hidden" name="id" value={_id.id}/>
                <p>
                    <input type="text" name="title" value={_title.title}
                        onChange={(e)=>{set_title({title: e.target.value})}}
                        />
                </p>
                <p>
                    <textarea name="desc" value={_desc.desc}
                        onChange={(e)=>{set_desc({desc: e.target.value})}}
                    ></textarea>
                </p>
                <p>
                    <input type="submit"/>
                </p>
            </form>
        </article>
    );
}

export default UpdateContent;