import React, { Component } from 'react';
import './styles.css';
import firebase from '../Firebase';
import uuidv4 from 'uuid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

var data = [{ id: 1, title: 'test1'}, { id: 2, title: 'test2'}, { id: 3, title: 'test3'}];

class Dashboard extends Component {
  state = { selected: null, title: '' };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onCreateNoteButton() {
    const {
      title
    } = this.state;

    firebase.database().ref('notes/' + uuidv4()).set({
      title
    });
  }

  render() {
    const {
      selected,
      title
    } = this.state;

    return (
      <div className="container">
        <List className="listContainer">
          <ListItem
            onClick={() => this.setState({ selected: 'new' })}
            selected={selected === 'new'}
          >
            <ListItemText>+ New Note</ListItemText>
          </ListItem>
          {
            data.map(note =>
              <ListItem
                onClick={() => this.setState({ selected: note.id })}
                selected={selected === note.id}
              >
                <ListItemText>{note.title}</ListItemText>
              </ListItem>
            )
          }
        </List>
        <div className="detailContainer">
          {
            selected === 'new'
              ? (
                <div>
                  <Input
                    name="title"
                    value={title}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Enter title"
                    disableUnderline
                    className="input"
                  />
                  <Button
                    onClick={this.onCreateNoteButton.bind(this)}
                    variant="outlined"
                  >
                    Create Note
                  </Button>
                </div>
              )
              : selected
          }
        </div>
      </div>
    );
  }
}

export default Dashboard;
