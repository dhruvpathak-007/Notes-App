//notesging App using Hooks
import { useRef } from "react";
import { useEffect, useState } from "react";
import { db } from "../firebaseInit";
import { collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore"; 



export default function Notes(){

    // const [title,setTitle] = useState("");
    // const [content,setContent] = useState("");
    const [formData, setFormData]=useState({title:"",content:""});
    const [notes, setnotes] =  useState([]);


    const titleRef = useRef(null);

    useEffect(() => {
        titleRef.current.focus()
    },[]);

    useEffect(()=>{
        if(notes.length && notes[0].title )
        document.title=notes[0].title;
        else
        document.title="No title"

    },[notes]);

    useEffect(()=>{

        // async function fetchData(){

        //     const snapshot=await getDocs(collection(db,'Notes'));
        //     console.log(snapshot);

        //     const notes =snapshot.docs.map((doc)=>{

        //         return {
        //             id: doc.id,
        //             ...doc.data()
        //         }

        //     })

        //     console.log(notes);
        //     setnotes(notes);
        // }

        // fetchData();

        //    real time  fetching
            onSnapshot(collection(db,"Notes"),(snapShot)=>{



            const notes =snapShot.docs.map((doc)=>{

                return {
                    id: doc.id,
                    ...doc.data()
                }

            })

            console.log(notes);
            setnotes(notes);


        })
        
    },[]);

     async function handleSubmit(e){
        e.preventDefault();

        // setnotes([{title:formData.title,content:formData.content}, ...notes]);
        // Add a new document with a generated id.
          await addDoc(collection(db, "Notes"), {
            title: formData.title,
            content: formData.content,
            createdAt:new Date()

        });
        setFormData({title:"",content:""})

        // console.log(notes);
    }


     async function removeNote(id){

        // setnotes(notes.filter((note,index)=>i!==index))
        const docRef = doc(db,"Notes", id);
        await deleteDoc(docRef);
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
                                ref = {titleRef}
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
        {notes.map((note, i) => (
    <div key={note.id} className="note">
        <h3>{note.title}</h3>
        <hr />
        <p>{note.content}</p>
        <div className="blog-btn">
            <button className="btn remove" onClick={() => removeNote(note.id)}>
                Delete
            </button>
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