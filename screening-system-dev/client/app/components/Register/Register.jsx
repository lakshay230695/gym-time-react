import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import Radio from "@material-ui/core/Radio";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import PropTypes from "prop-types";
import axios from "axios";
import logo from '../../../public/assets/img/gymlogo.png';
const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

const fontTheme = createMuiTheme({
  typography: {
    fontFamily: '"Montserrat", "Helvetica Neue", "Arial", sans-serif'
  }
});

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      /* classes: useStyles, */
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repassword: "",
      role: "applicant"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  validateInput() {
    const { firstName, lastName, email, password, repassword } = this.state;
    if (
      firstName == "" ||
      lastName == "" ||
      email == "" ||
      password == "" ||
      repassword == ""
    ) {
      alert("Please fill in all the required fields.");
      return false;
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      alert("Email is invalid. Please fill in again.");
      return false;
    }
  

    var pwRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!password.match(pwRegex)) {
      alert(
        "Password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter."
      );
      return false;
    }
    if (password != repassword) {
      alert("The password does not match. Please fill in again.");
      return false;
    }

    return true;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validateInput()) {
      axios
        .post("/signup", this.state)
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            console.log("Registration success");
            window.location = "./Confirmation";
            alert("The subscription email has been sent to the email id you provided!");
          } else if (res.status == 201) {
            console.log("need to change email");
            window.location = "./Confirmation";
            alert(
              "The email has already been sent to the email id you provided."
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    if (this.validateInput()) {
      axios
        .post("/sendemail", this.state)
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            console.log("The email has been sent successfully");
            window.location = "./Confirmation";
            alert("The subscription email has been sent to the email id you provided!");
          } else if (res.status == 201) {
            console.log("The email has already been sent previously");
            window.location = "./Confirmation";
            alert(
              "The email has already been sent to the email id you provided."
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    const { classes } = this.props;
    const { firstName, lastName, email, password, repassword } = this.state;
    return (
      
      <ThemeProvider theme={fontTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          
          <div className={classes.paper}>
            <Typography className="force-font" component="h5" variant="h5">
             <br/>
             
              <br />
              
            </Typography>
            <img src={logo}></img> <br/>
            It is free. Only a minute to complete
            <form
              onSubmit={this.handleSubmit}
              className={classes.form}
              noValidate
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    value={firstName}
                    onChange={this.handleChange}
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={this.handleChange}
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    autoComplete="email"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="repassword"
                    value={repassword}
                    onChange={this.handleChange}
                    label="Re-Password"
                    type="password"
                    id="repassword"
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
             
            </form>
          </div>
        </Container>
      </ThemeProvider>
    );
  }
}
Register.propTypes = {
  classes: PropTypes.object
};

export default withStyles(useStyles)(Register);
