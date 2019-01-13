import React, { Component } from 'react';
import './styles.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

var data = [{ id: 1, title: 'test1'}, { id: 2, title: 'test2'}, { id: 3, title: 'test3'}];

class Dashboard extends Component {
  state = { selected: null };

  render() {
    return (
      <div className="container">
        <List className="listContainer">
          {
            data.map(note =>
              <ListItem
                onClick={() => this.setState({ selected: note.id })}
                selected={this.state.selected === note.id}
              >
                <ListItemText>{note.title}</ListItemText>
              </ListItem>
            )
          }
        </List>
        <div className="detailContainer">
          {this.state.selected}
        </div>
      </div>
    );
  }
}

export default Dashboard;
