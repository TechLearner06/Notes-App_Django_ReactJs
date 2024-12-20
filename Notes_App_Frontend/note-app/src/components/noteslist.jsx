import Notes from './note';
import '../index.css';

const notesList = ({notes}) => {
    return(
        <div className="notes-list">

            {notes.map(note => <Notes key={note.id} note={note}/>)}
            
            
            
        </div>
    )
}

export default notesList;