import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../index.css';
import { faEdit} from  '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Notes = ({note}) =>{

    let description = `${note.description.split("").slice(0, 150).join("")}...`
    const category = note.category.trim()
    const color = 
      category === "BUSINESS" ? 'green' 
    : category === "PERSONAL" ? "orangered" 
    : category === "IMPORTANT" ? 'red' // Ensure 'red' is in quotes
    : 'blue';


     // Format the created date to show only the date
     const createdDate = new Date(note.created);
     const options = { year: 'numeric', month: 'short', day: '2-digit' };
     const formattedDate = createdDate.toLocaleDateString('en-GB', options); // Format as DD/MM/YYYY
    


    return <div className="note">
        <Link to={`view-note/${note.slug}`} style={{ 'textDecoration':'none','color':'black'}}>

        <div className="note-header">
            <div className="category" style={{backgroundColor:color, fontSize:10}}>{note.category}</div>
            <div className="options">
                <span id='edit-icon'><Link to={`/edit-note/${note.slug}`} style={{"textDecoration":"none", "color":"black"}}><FontAwesomeIcon icon={faEdit}  color="green" /></Link></span>
            </div>
        </div>
        <h6 className='note-title'>{note.title}</h6>
        <h6 className='note-content' style={{whiteSpace:"pre-wrap"}}> {description}</h6>
        <div className="note-footer">
            <small>{formattedDate}</small>
        </div>
        </Link>

    </div>
};

export default Notes;