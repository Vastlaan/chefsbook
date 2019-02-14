import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "./css/style.css";

import Header from "./Components/Header";
import Landing from "./Components/Landing";
import Dashboard from "./Components/Dashboard";
import NewRecepie from "./Components/NewRecepie";
import Footer from "./Components/Footer";
import CalendarComponent from "./Components/CalendarComponent";
import Schedule from "./Components/Schedule";
import Recepies from './Components/Recepies'
import PrivacyPolicy from './Components/PrivacyPolicy'

class App extends React.Component {
  state = {
    logged: false,
    profile: {}
  };

  componentWillMount() {
    fetch("/api/current_user", { credentials: 'include' })    //credentials: 'include'   this makes sure that cookie is send with request. Fix for edge and ie
      .then(user => {
        return user.json();
      })
      .then(data => {
        if (data._id) {
          //MangoDB ID not googleId, because in the future I could do authorization also with other services like Facebook

          this.setState({ logged: true, profile: data });
        } else {
          this.setState({ logged: false });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {

    return (
      <div className="container">
        <Header logged={this.state.logged} />
        <BrowserRouter>
          <div>
            {this.state.logged === false ? (
              <Route exact={true} path="/" component={Landing} />
            ) : (
              <Route exact={true} path="/" component={Dashboard} />
            )}
            <Route path="/recipes" component={Recepies} />
            <Route path="/new_recepie" component={NewRecepie} />
            <Route path="/calendar" component={CalendarComponent} />
            <Route path="/schedule" component={Schedule} />
            <Route path="/privacy_policy" component={PrivacyPolicy} />
          </div>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
