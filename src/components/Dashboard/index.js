import React, { Component } from 'react';
import './styles.css';
import firebase from '../Firebase';
import uuidv4 from 'uuid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class Dashboard extends Component {
  state = {
    selected: null,
    title: '',
    notes: {}
  };

  componentDidMount() {
    firebase.database().ref('notes/').on('value', snapshot => {
      this.setState({ notes: snapshot.val() })
    });
  }

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
    this.setState({ title: '' });
  }

  onDeleteNoteButton() {
    const {
      selected
    } = this.state;

    firebase.database().ref('notes/' + selected).remove();
  }

  renderDetail() {
    const {
      selected,
      title,
      notes
    } = this.state;

    if (selected === 'new') {
      return (
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
      );
    } else if (selected) {
      return (
        <div className="detailContent">
          {notes[selected] ? notes[selected].title : ''}
          <Button
            onClick={this.onDeleteNoteButton.bind(this)}
            variant="outlined"
          >
            Delete
          </Button>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const {
      selected,
      title,
      notes
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
            Object.keys(notes).map(key =>
              <ListItem
                onClick={() => this.setState({ selected: key })}
                selected={selected === key}
              >
                <ListItemText>{notes[key].title}</ListItemText>
              </ListItem>
            )
          }
        </List>
        <div className="detailContainer">
          {this.renderDetail()}
        </div>
      </div>
    );
  }
}

export default Dashboard;
