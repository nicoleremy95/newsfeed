import * as React from 'react';
import {useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import {TextField, Button, Grid, Container, Typography, CardContent, Card} from '@material-ui/core';
import LoginForm from '../LoginForm/LoginForm';
import API from '../../utils/API';
import './sup.css';

// INTERFACE
interface State {
    newsData: string,
    //TODO: add in mood in form
    // mood: string
}

interface Props {
    currentUser: boolean,
    currentUserData: any
}

interface LoginProps {
    username: string,
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
    welcome: {
        fontSize: '30px !important',
        textAlign: 'left'
    },
    moreTalk: {
        fontSize: '30px !important',
        textAlign: 'left'
    },
    cards: {
        marginTop: '50px',
        marginBottom: 'auto',
        boxShadow: theme.shadows[5],
    },
    button:{
        marginTop: '20px',
        marginBottom: "20px",
        marginRight: '10px',
        marginLeft: "10px"
    },
  }),
);

//FC
export default function Sup({currentUser, currentUserData}: Props){
    //DECLARATIONS
    const classes = useStyles();

    const [newsObj, setNewsObj] = useState<State>({
        newsData:"",
        //TODO: add in newstype in form
        // mood:""
    })

    const [loginObj, setLoginObject] = useState<LoginProps>({
        username:"",
        password:""
    })


    //TODO: move to App.tsx and pass down with props 
    function inputChange (e: React.ChangeEvent<HTMLTextAreaElement >) {
        //TODO: refactor any
        const{ name, value}: any = e.target;
        setNewsObj({ ...newsObj,[name]: value})
        // setIcon(true)
    }

    //TODO: move to app.tsx and pass down with props 
    function inputSubmit (e: React.FormEvent<HTMLFormElement>) : boolean { 
        API.postNews(newsObj)
        .then(news =>{
            console.log('news', news)
        })
        .catch(err =>console.log('err', err))
        setNewsObj({
            newsData: "",
            //TODO: add in mood to form
            // mood:""
        })
        return true;
    }
    return(
        <div 
            className={classes.root}
        >
            {currentUser? 
                <Container>
                    <Grid container >
                        <Grid item xs={1} sm={1} md={3} lg={3} direction="column"></Grid>
                        <Grid item xs ={10} sm={10} md={6} lg={6}>
                        <div className="sup-bubble">
                            <div className="sup-arrow sup-bottom right"></div>
                                {currentUser? 
                                    <Typography align="right">
                                        <h2 className="sup">tell me {currentUserData.username}...suP?</h2>
                                    </Typography> 
                                : null}
                                <Card 
                                    className={classes.cards} 
                                    variant="outlined" 
                                >
                                <CardContent>
                                <form 
                                    className={classes.root} 
                                    noValidate 
                                    autoComplete="on" 
                                    onSubmit={inputSubmit}
                                >
                                    
                                    <TextField 
                                        id="outlined-basic" 
                                        label="suP friend?" 
                                        variant="outlined" 
                                        placeholder="..."
                                        multiline
                                        rows={4}
                                        type="textarea"
                                        name="newsData"
                                        value={newsObj.newsData}
                                        onChange={inputChange}
                                        className={classes.input}
                                        inputProps={{
                                            maxlength: 200
                                        }}
                                        helperText={`${newsObj.newsData.length}/200`}
                                    />
                                    <Tooltip  title="send" aria-label="send">
                                        <Button variant="contained" color="primary" type="submit">
                                            send
                                        </Button>
                                    </Tooltip>
                                </form>
                                </CardContent>
                                </Card>
                                </div>
                                </Grid>                 
                                <Grid item xs={1} sm={1} md={2} lg={2} direction="column"></Grid>
                            </Grid>
                        </Container>
                : <LoginForm/>               
            }           
        </div>
    )
}

           