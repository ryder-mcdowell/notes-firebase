import React, { Component } from 'react';
import './styles.css';
import firebase from '../Firebase';
import uuidv4 from 'uuid';
import NoteCategory from '../NoteCategory';
import NoteDetail from '../NoteDetail';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class Dashboard extends Component {
  state = {
    selectedNote: null,
    selectedNoteImage: null,
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
      selectedNote,
      notes
    } = this.state;

    if (editing) {
      firebase.database().ref('notes/' + selectedNote).update({
        title,
        body: body || null
      })
      this.setState({ editing: false });
    } else {
      this.setState({ editing: true, title: notes[selectedNote].title, body: notes[selectedNote].body });
    }
  }

  onDeleteNoteButton() {
    const {
      selectedNote
    } = this.state;

    this.setState({ selectedNote: null });
    firebase.database().ref('notes/' + selectedNote).remove();
  }

  onUploadFileButton() {
    const {
      file,
      selectedNote
    } = this.state;


    firebase.storage().ref('images/' + selectedNote).put(file)
      .then(snapshot => {
        firebase.storage().ref('images/' + selectedNote).getDownloadURL()
          .then(url => this.setState({ selectedNoteImage: url }))
          .catch(err => this.setState({ selectedNoteImage: null }));
      })
  }

  selectNote(key) {
    this.setState({ selectedNote: key });

    firebase.storage().ref('images/' + key).getDownloadURL()
      .then(url => this.setState({ selectedNoteImage: url }))
      .catch(err => this.setState({ selectedNoteImage: null }));
  }

  render() {
    const {
      title,
      body,
      editing,
      selectedNote,
      selectedNoteImage,
      notes
    } = this.state;

    return (
      <div className="dashboardContainer">
        <List className="listContainer">
          <ListItem
            onClick={() => this.setState({ selectedNote: 'new' })}
            selected={selectedNote === 'new'}
          >
            <ListItemText>+ New Note</ListItemText>
          </ListItem>
          {
            Object.keys(notes).map(key =>
              <NoteCategory
                onClick={() => this.selectNote(key)}
                selected={selectedNote === key}
                key={key}
                title={notes[key].title}
              />
            )
          }
        </List>
        <NoteDetail
          title={title}
          body={body}
          onChange={this.onChange.bind(this)}
          editing={editing}
          note={selectedNote === 'new' ? 'new' : notes[selectedNote]}
          selectedNoteImage={selectedNoteImage}
          onCreateNoteButton={this.onCreateNoteButton.bind(this)}
          onUpdateNoteButton={this.onUpdateNoteButton.bind(this)}
          onDeleteNoteButton={this.onDeleteNoteButton.bind(this)}
          onFileSelect={this.onFileSelect.bind(this)}
          onUploadFileButton={this.onUploadFileButton.bind(this)}
        />
      </div>
    );
  }
}

export default Dashboard;
