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
    selectedImage: null,
    title: '',
    body: '',
    file: null,
    editing: false,
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

  onFileSelect = event => {
    this.setState({ [event.target.name]: event.target.files[0] });
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

  onUpdateNoteButton() {
    const {
      title,
      body,
      editing,
      selected,
      notes
    } = this.state;

    if (editing) {
      firebase.database().ref('notes/' + selected).update({
        title,
        body: body || null
      })
      this.setState({ editing: false });
    } else {
      this.setState({ editing: true, title: notes[selected].title, body: notes[selected].body });
    }
  }

  onDeleteNoteButton() {
    const {
      selected
    } = this.state;

    this.setState({ selected: null });
    firebase.database().ref('notes/' + selected).remove();
  }

  onUploadFileButton() {
    const {
      file,
      selected
    } = this.state;

    console.log(file)

    this.setState({ file: null });
    firebase.storage().ref('images/' + selected).put(file)
      .then(snapshot => console.log('success'))
  }

  selectNote(key) {
    this.setState({ selected: key });

    firebase.storage().ref('images/' + key).getDownloadURL()
      .then(url => this.setState({ selectedImage: url }))
      .catch(err => this.setState({ selectedImage: null }));
  }

  renderDetail() {
    const {
      selected,
      selectedImage,
      title,
      body,
      editing,
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
          {
            editing
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
                  <Input
                    name="body"
                    value={body}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Enter body"
                    disableUnderline
                    className="input"
                  />
                </div>
              )
              : (
                <div className="noteContentContainer">
                  {notes[selected].title}
                  <br />
                  {notes[selected].body}
                </div>
              )
          }
          <Button
            onClick={this.onUpdateNoteButton.bind(this)}
            variant="outlined"
          >
            {this.state.editing ? 'Confirm' : 'Update Note'}
          </Button>
          <Button
            onClick={this.onDeleteNoteButton.bind(this)}
            variant="outlined"
          >
            Delete
          </Button>
          <input
            name="file"
            onChange={this.onFileSelect}
            type="file"
            className="fileInput"
          />
          <Button
            onClick={this.onUploadFileButton.bind(this)}
            variant="outlined"
          >
            Upload Image
          </Button>
          {selectedImage
            ? <img
              src={selectedImage}
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

  render() {
    const {
      selected,
      notes
    } = this.state;

    return (
      <div className="dashboardContainer">
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
                onClick={() => this.selectNote(key)}
                selected={selected === key}
                key={key}
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
