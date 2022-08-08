import { useRef, useState, useEffect } from "react";

export default function Note({docId, title, description, onDelete, onUpdate}){
    const [ currentTitle, setCurrentTitle ] = useState(title); 
    const [ currentDescription, setCurrentDescription ] = useState(description); 

    const [editTitle, setEditTitle] = useState(false);
    const [editDescription, setEditDescription] = useState(false);

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    useEffect(() =>{
        if(titleRef.current){
            titleRef.current.focus();
        }
    },[editTitle]);

    useEffect(() =>{
        if(descriptionRef.current){
            descriptionRef.current.focus();
        }
    },[editDescription]);

    function handleEditTitle(){
        setEditTitle(true);
    }
    function handleEditDescription(){
        setEditDescription(true);
    }

    function handleChangeTitle(e){
        setCurrentTitle(e.target.value);
    }
    function handleChangeDescription(e){
        setCurrentDescription(e.target.value);
    }

    function handleBlurTitle(e){
        setEditTitle(false);
        onUpdate(docId, currentTitle, currentDescription);
    }
    function handleBlurDescription(e){
        setEditDescription(false);
        onUpdate(docId, currentTitle, currentDescription);
    }

    function handleDelete(){
        onDelete(docId);
    }

    return (
        <div key={ docId } className="note-content">
            <div>
                <div className="note-title"> 
                    {editTitle? (
                    <>
                        <input 
                            ref={titleRef} 
                            value={currentTitle} 
                            onChange={handleChangeTitle}
                            onBlur={handleBlurTitle}
                        />
                    </>
                ): (
                    <>
                    <button className="button-content edit" onClick={handleEditTitle} > <span className="material-icons edit">edit</span> </button> 
                    {currentTitle}
                    </>
                )}
                </div>
                <div class="note-description"> 
                    {editDescription? (
                    <><textarea 
                    rows="10"
                    cols= "30"
                    ref={descriptionRef} 
                    value={currentDescription} 
                    onChange={handleChangeDescription}
                    onBlur={handleBlurDescription}
                    />
                </>
                ): (
                    <>
                    <button className="button-content edit" onClick={handleEditDescription} > <span className="material-icons edit">edit</span> </button> 
                    {currentDescription}
                    </>
                )}
                </div>
            </div>
        <div className="footer-note">
          <button className="button-content delete" onClick={handleDelete} ><span className="material-icons delete">delete</span></button>  
        </div>
        
      </div>
    );
}