//notesging App using Hooks
import { useEffect, useState } from "react";

export default function Notes(){

    // const [title,setTitle] = useState("");
    // const [content,setContent] = useState("");
    const [formData, setFormData]=useState({title:"",content:""});
    const [notes, setnotes] =  useState([]);

    useEffect(()=>{
        if(notes.length && notes[0].title )
        document.title=notes[0].title;
        else
        document.title="No title"

    },[notes])

    function handleSubmit(e){
        e.preventDefault();

        setnotes([{title:formData.title,content:formData.content}, ...notes]);
        setFormData({title:"",content:""})

        console.log(notes);
    }


    function removeNote(i){

        setnotes(notes.filter((note,index)=>i!==index))

    }

    return(
        <>
        <h1 style={{color:"#12343b"}}>Write a Note </h1>
        <div className="section">

        {/* Form for to write the notes */}
            <form onSubmit={handleSubmit}>
                <Row label="Title">
                        <input className="input"
                                placeholder="Enter the Title of the notes here.."
                                value={formData.title}
                                onChange = {(e) => setFormData({title:e.target.value, content:formData.content})}
                        />
                </Row >

                <Row label="Content">
                        <textarea className="input content"
                                placeholder="Content of the notes goes here.."
                                value={formData.content}
                                onChange = {(e) => setFormData({title:formData.title,content:e.target.value})}
                        />
                </Row >
         
                <button className = "btn">ADD</button>
            </form>
                     
        </div>

        <hr/>

        {/* Section where submitted notes will be displayed */}
        <h2> Notes... </h2>
        {notes.map((notes,i) => (
            <div className="note">
                <h3>{notes.title}</h3>
                <hr/>
                <p>{notes.content}</p>
                <div className="blog-btn">
                    <button className="btn remove" onClick={()=>removeNote(i)}>Delete</button>
                </div>
            </div>
        ))}
        
        </>
        )
    }

//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}