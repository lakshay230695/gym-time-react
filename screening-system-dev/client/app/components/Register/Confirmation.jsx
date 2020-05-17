/*
This react page is for the confirmation page.
Instead of an overview message, I chose to use this.
*/

import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";

import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import Radio from "@material-ui/core/Radio";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import PropTypes from "prop-types";
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


  class Confirmation extends React.Component {
    constructor() {
      super();
      this.state = {
        /* classes: useStyles, */
      };
  
    }

    render() {
        const { classes } = this.props;
        
        return (
          <ThemeProvider theme={fontTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              
              <div className={classes.paper}>
                
                <img src={logo}></img> <br/>
                It is free. Only a minute to complete <br/><br/>
               <h5>The activation email has been sent.</h5>
              </div>
            </Container>
          </ThemeProvider>
        );
      }
    }
    Confirmation.propTypes = {
      classes: PropTypes.object
    };
    
    export default withStyles(useStyles)(Confirmation);
