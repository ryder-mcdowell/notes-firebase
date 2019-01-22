import React from 'react';
import './styles.css';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const NoteDetail = props => {

  const renderDetail = () => {
    if (props.note === 'new') {
      return (
        <div>
          <Input
            name="title"
            value={props.title}
            onChange={props.onChange}
            type="text"
            placeholder="Enter title"
            disableUnderline
            className="input"
          />
          <Button
            onClick={props.onCreateNoteButton}
            variant="outlined"
          >
            Create Note
          </Button>
        </div>
      );
    } else if (props.note) {
      return (
        <div className="detailContent">
          {
            props.editing
              ? (
                <div>
                  <Input
                    name="title"
                    value={props.title}
                    onChange={props.onChange}
                    type="text"
                    placeholder="Enter title"
                    disableUnderline
                    className="input"
                  />
                  <Input
                    name="body"
                    value={props.body}
                    onChange={props.onChange}
                    type="text"
                    placeholder="Enter body"
                    disableUnderline
                    className="input"
                  />
                </div>
              )
              : (
                <div className="noteContentContainer">
                  {props.note.title}
                  <br />
                  {props.note.body}
                </div>
              )
          }
          <Button
            onClick={props.onUpdateNoteButton}
            variant="outlined"
          >
            {props.editing ? 'Confirm' : 'Update Note'}
          </Button>
          <Button
            onClick={props.onDeleteNoteButton}
            variant="outlined"
          >
            Delete
          </Button>
          <input
            name="file"
            onChange={props.onFileSelect}
            type="file"
            className="fileInput"
          />
          <Button
            onClick={props.onUploadFileButton}
            variant="outlined"
          >
            Upload Image
          </Button>
          {props.selectedNoteImage
            ? <img
              src={props.selectedNoteImage}
              alt="no source"
              height="200"
              width="200"
              className="noteImage"
              />
            : null
          }
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <div className="detailContainer">
      {renderDetail()}
    </div>
  );
}

export default NoteDetail;


