import React, { Component } from "react";
import Axios from "axios";
class App extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.state = {
      dataUser: [],
      username: ""
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSearch() {
    const username = this.state.username;
    Axios.get(`https://api.github.com/users/${username}/repos`)
      .then(res => {
        {
          this.setState({
            dataUser: res.data
          });
          console.log(this.state.dataUser);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <form>
          User Name{" "}
          <input
            type="text"
            name="username"
            id="username"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <input onClick={this.onSearch} type="button" value="Search" />
        </form>
        <br />
        <table border="1">
          <tr>
            <td>repo name</td>
            <td>full name</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    );
  }
}

export default App;
