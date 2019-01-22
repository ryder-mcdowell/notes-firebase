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
    selectedNoteCategory: null,
    selectedNote: null,
    selectedNoteImage: null,
    title: '',
    body: '',
    file: null,
    editing: false,
    noteCategories: {}
  };

  componentDidMount() {
    firebase.database().ref('categories/').on('value', snapshot => {
      this.setState({ noteCategories: snapshot.val() })
    });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onFileSelect = event => {
    this.setState({ [event.target.name]: event.target.files[0] });
  }

  onCreateNoteCategoryButton() {
    const {
      title
    } = this.state;

    firebase.database().ref('categories/' + uuidv4()).set({
      title
    });

    this.setState({ title: '' });
  }

  onCreateNoteButton() {
    const {
      title,
      selectedNoteCategory,
    } = this.state;

    firebase.database().ref('categories/' + selectedNoteCategory + '/notes/' + uuidv4()).set({
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
      selectedNoteCategory,
      noteCategories
    } = this.state;

    if (editing) {
      firebase.database().ref('categories/' + selectedNoteCategory + '/notes/' + selectedNote).update({
        title,
        body: body || null
      })
      this.setState({ editing: false });
    } else {
      this.setState({ editing: true, title: noteCategories[selectedNoteCategory].notes[selectedNote].title, body: noteCategories[selectedNoteCategory].notes[selectedNote].body });
    }
  }

  onDeleteNoteButton() {
    const {
      selectedNote,
      selectedNoteCategory
    } = this.state;

    this.setState({ selectedNote: null });
    firebase.database().ref('categories/' + selectedNoteCategory + '/notes/' + selectedNote).remove();
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

  selectCategory(key) {
    const {
      selectedNoteCategory
    } = this.state;

    if (key !== selectedNoteCategory) {
      this.setState({ selectedNoteCategory: key, selectedNote: null });
    }
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
      selectedNoteCategory,
      selectedNote,
      selectedNoteImage,
      noteCategories
    } = this.state;

    return (
      <div className="dashboardContainer">
        <List className="listContainer">
          <ListItem
            onClick={() => this.setState({ selectedNoteCategory: 'newNoteCategory' })}
            selected={selectedNoteCategory === 'newNoteCategory'}
          >
            <ListItemText>+ New Category</ListItemText>
          </ListItem>
          {
            Object.keys(noteCategories).map(key =>
              <NoteCategory
                onClick={() => this.selectCategory(key)}
                selectNote={key => this.selectNote(key)}
                onNewNoteButton={() => this.setState({ selectedNote: 'newNote' })}
                selected={selectedNoteCategory === key}
                title={noteCategories[key].title}
                notes={noteCategories[key].notes}
                key={key}
              />
            )
          }
        </List>
        <NoteDetail
          title={title}
          body={body}
          onChange={this.onChange.bind(this)}
          editing={editing}
          note={
            selectedNoteCategory === 'newNoteCategory'
              ? 'newNoteCategory'
              : selectedNote === 'newNote'
                ? 'newNote'
                : selectedNote
                  ? noteCategories[selectedNoteCategory].notes[selectedNote]
                  : null
          }
          selectedNoteImage={selectedNoteImage}
          onCreateNoteCategoryButton={this.onCreateNoteCategoryButton.bind(this)}
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
