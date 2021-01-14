import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {Typography, Container, Grid} from '@material-ui/core';
import './footer.css';

//STYLES
const useStyles = makeStyles((theme:Theme) =>({
    footer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: 'linear-gradient(to bottom left, white, #7a8a8a)',
        marginTop:"auto",
        minHeight: '10vh'
    },
    root: {
      flexGrow: 1,
      margin: '20px'
    },
    link:{
      "&:hover": {
        backgroundColor: 'rgb(7, 177, 77, 0.42)'
      },
      backgroundColor: "white",

    },
    moreTalk: {
      fontSize: "250% !important",
      font: "'Pacifico', cursive",
    },
    footerLinks: {
      textDecoration: "none",
      color: "white !important"
    },
    icon: {
      marginLeft: "10%"    
    },
    copy: {
      verticalAlign: 'middle',
      display: "inlin-flex"
    }
  }))

//FC
export default function Footer() {
  //DECLARATIONS
  const classes = useStyles();

  //RENDER
  return (
    <React.Fragment>
      <CssBaseline />
      <div className ={classes.footer}>
        <Container className={classes.root}>
            <Grid item xs >
              <Grid item xs>
                <Typography gutterBottom align="left">
                  <h2>more talK with friendS</h2>
                </Typography>
                <Typography color="textSecondary" align="left">
                  <p>a product by: nicole remy</p>
                </Typography>
                <Typography className={classes.moreTalk} align="left">
                  <h1>suP?</h1>
                </Typography>
              </Grid>
            </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
}