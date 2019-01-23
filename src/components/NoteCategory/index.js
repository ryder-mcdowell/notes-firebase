import React from 'react';
import './styles.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

const NoteCategory = props => {

  const renderNotes = () => {
    if (props.selected && props.notes) {
      return (
        Object.keys(props.notes).map(key =>
          <Button
            onClick={() => props.selectNote(key)}
            variant={'contained'}
            key={key}
          >
            {props.notes[key].title}
          </Button>
        )
      );
    }
  }

  const renderNewNoteButton = () => {
    if (props.selected) {
      return (
        <Button
          onClick={props.onNewNoteButton}
        >
          + New Note
        </Button>
      )
    }
  }

  return (
    <ListItem
      onClick={props.onClick}
      selected={props.selected}
      key={props.key}
      className="noteCategoryContainer"
    >
      <ListItemText>{props.title}</ListItemText>
      {renderNotes()}
      {renderNewNoteButton()}
    </ListItem>
  );
}

export default NoteCategory;