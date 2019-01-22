import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const NoteCategory = props => {
  return (
    <ListItem
      onClick={props.onClick}
      selected={props.selected}
      key={props.key}
    >
      <ListItemText>{props.title}</ListItemText>
    </ListItem>
  );
}

export default NoteCategory;