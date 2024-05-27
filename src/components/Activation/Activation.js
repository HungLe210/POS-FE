import axios from "axios";
import React, { Component } from "react";
import swal from "sweetalert";

class Activation extends Component {


  componentDidMount() {
    const { match } = this.props;
    const token = match.params.token;
    this.VerifyingAccount(token);
  }

  VerifyingAccount = async token => {
    await axios
      .get('http://localhost:8080/activation/' + token)
      .then(res => {
        if (res.data.result == "success") {
          swal("Success!", res.data.message, "success").then(token => {
            this.props.history.push("../login");
          });
        } else if (res.data.result === "error") {
          swal("Error", res.data.message, "error");
        }
      })
      .catch(err => {
        return swal("Error!", err.message, "error");
      })
  }

  render() {
    return (
      <div>Verifying your account....</div>
    );
  }
}

export default Activation;
