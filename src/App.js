import React, { Component } from "react";
import Axios from "axios";
class App extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.state = {
      dataUser: [],
      username: "",
      isNotExist: ""
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
        this.setState({
          dataUser: [],
          isNotExist: "User not exist"
        });
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
        {this.state.dataUser.length > 0 ? (
          <table border="1">
            <tr>
              <td>
                <b>repo name</b>
              </td>
              <td>
                <b>full name</b>
              </td>
            </tr>
            {this.state.dataUser.map(item => {
              return (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.full_name}</td>
                </tr>
              );
            })}
          </table>
        ) : (
          <p>{this.state.isNotExist}</p>
        )}
      </div>
    );
  }
}

export default App;
