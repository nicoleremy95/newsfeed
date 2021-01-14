import * as React from 'react';
import {useState} from 'react';
import {useHistory } from "react-router-dom";
import {createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {Container, TextField, Typography, Button, Grid} from '@material-ui/core';
import API from '../../utils/API';
import './UserComp.css';

//INTERFACE
interface State {
    username: string,
    name: string,
    email: string,
    password: string 
}

//STYLES
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop:'auto',
        padding: "20px"
    },
    input: {
        '& > *': {
            background: 'white',
        },
        width: "100%",
        marginRight: '100px'
    },
    formControl: {
        minWidth: "60%",
    },
    send:{
        marginTop: '50px',
        marginRight: "0px"
    },
    button:{
        marginTop: '20px',
        marginBottom: "20px"
    }
  }),
);

//FC
export default function UserComp() {
    //DECLARATIONS
    const classes = useStyles();

    const history = useHistory();

    const [userObj, setUserObj] = useState<State>({
        username:'',
        name: '',
        email: '',
        password: ''
    })

    //FUNCTIONS
    function inputChange (e: React.ChangeEvent<HTMLTextAreaElement>){
        //TODO: refactor any
        const{ name, value}: any = e.target;
        setUserObj({ ...userObj,[name]: value})
    }

    function inputSubmit (e: React.FormEvent<HTMLFormElement>) : boolean {
        history.push("/");
        API.signup(userObj)
        .then(user =>{
            history.push("/")
        })
        .catch(err=> console.log('err', err))
        return true;
    }

    //RENDER
    return (
        <div 
            className={classes.root}
            >
            <Container>
            <Grid container >
                <Grid item xs={1} sm={1} md={3} lg={3} direction="column"></Grid>
                <Grid item xs ={10} sm={10} md={6} lg={6}>
                <div className="user-bubble">
                    <div className="user-arrow user-bottom right"></div>
                    <form 
                    className={classes.root} 
                        noValidate 
                        autoComplete="on" 
                        onSubmit={inputSubmit}
                    >
                        <Typography align="right">
                            <h2 className="user">...new account!</h2>
                        </Typography>
                        <TextField 
                            id="outlined-basic" 
                            label="username" 
                            variant="outlined" 
                            type="textarea"
                            name="username"
                            value={userObj.username}
                            onChange={inputChange}
                            className={classes.input}
                    
                        />
                        <TextField 
                            id="outlined-basic" 
                            label="password" 
                            variant="outlined" 
                            type="password"
                            name="password"
                            value={userObj.password}
                            onChange={inputChange}
                            className={classes.input}
                            
                        />
                        <TextField 
                            id="outlined-basic" 
                            label="name" 
                            variant="outlined" 
                            type="textarea"
                            name="name"
                            value={userObj.name}
                            onChange={inputChange}
                            className={classes.input}
                            
                        />
                        <TextField 
                            id="outlined-basic" 
                            label="email" 
                            variant="outlined"  
                            type="textarea"                                   
                            name="email"
                            value={userObj.email}
                            onChange={inputChange}
                            className={classes.input}
                        />
                        <Button variant="contained" color="primary" type="submit" className={classes.button}>
                            create account
                        </Button>
                    </form>
                </div>
                </Grid>                 
                <Grid item xs={1} sm={1} md={2} lg={2} direction="column"></Grid>
            </Grid>
            </Container>
        </div>
    )
}

