import './App.css';
import './w3.css';
import { Component } from 'react';

const URL = 'https://workers-project.workers-project.workers.dev/posts';

class App extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  async componentDidMount() {
    const resp = await fetch(URL, { method: 'GET' });
    const jsonStr = await resp.text();
    const parsed = jsonStr.split('\n').map(JSON.parse);
    this.setState({ data: Table(parsed) });
  }

  render() {
    return (
      <div className='App'>
        <header className='w3-container w3-center'>
          <h1><b>GENERIC SOCIAL MEDIA SITE</b></h1>
        </header>
        <br />
        <span className='w3-table w3-auto'>{this.state.data}</span>
        <br />
        <Submission />
      </div>
    );
  }
}

class Submission extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      username: '',
      content: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const postBody = {
      title: this.state.title,
      username: this.state.username,
      content: this.state.content,
    };
    const status = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(postBody),
    });
    if (status.ok) {
      window.location.reload();
    } else {
      console.alert('Unsuccessful post');
    }
  }

  render() {
    return (
      <form className="w3-margin" onSubmit={this.handleSubmit}>
        <label>
          Title:
          <input className="w3-input" name="title" type="text" onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Username:
          <input className="w3-input" name="username" type="text" onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Content:
          <input className="w3-input" name="content" type="text" onChange={this.handleChange} />
        </label>
        <input className="w3-button" type="submit" value="Submit" />
      </form>
    );
  }
}

function Table(data) {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Username</th>
          <th>Content</th>
        </tr>
      </thead>
      {data.map((d) => (
        <tbody key={d.name}>
          <tr>
            <td>{d.title}</td>
            <td>{d.username}</td>
            <td>{d.content}</td>
          </tr>
        </tbody>
      ))}
    </table>
  );
}

export default App;
