//TODO: update and delete account page
import * as React from 'react';
import {useState, useEffect} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {CircularProgress, TextField, Button, Grid, Container, Typography, CardContent, Card} from '@material-ui/core';
import API from '../../utils/API';



interface currentUserProps {
    currentUser: boolean,
    currentUserData: any
}
interface userObj {
    name: string,
    username: string, 
    email: string
}
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
        marginBottom: "20px"
    },
  }),
);


export default function Account({currentUser, currentUserData}: currentUserProps): JSX.Element {
    const classes = useStyles();

    const [userObj, setUserObj] = useState<userObj>({
        username: "",
        name: "",
        email: ""
    });

    useEffect(()=>{
        API.getNewsbyUser(currentUserData._id)
        .then(res=>{
            console.log('Account.tsx res', res)
        })
        .catch(err=>{console.log('err', err)})
    }, [])

    function inputChange(e: React.ChangeEvent<HTMLFormElement>){
        const {name,value}: any = e.target;
        setUserObj({...userObj, [name]: value})
    }

    function inputSubmit(e: React.ChangeEvent<HTMLFormElement>){
        const id:any = e.target.getAttribute("id")
        API.updateAccount(userObj, id)
        .then(user=>{
            console.log('Account.tsx user', user)
        })
        .catch(err =>console.log('err', err))       
    }
    function inputDelete(e: React.ChangeEvent<HTMLFormElement>){
        const id:any = e.target.getAttribute("id")
        API.deleteAccount(id)
        .then(user=>{
            console.log('Account.tsx user', user)
        })
        .catch(err =>console.log('err', err))  
    }
    return (
        <div>
            <div 
            className={classes.root}
        >
            <Container>
            <Grid container >
                <Grid item xs={1} sm={1} md={3} lg={3} direction="column"></Grid>
                <Grid item xs ={10} sm={10} md={6} lg={6}>
                <div className="sup-bubble">
                    <div className="sup-arrow sup-bottom right"></div>
                        {currentUser? <Typography align="right">
                            <h2 className="sup"> {currentUserData.username}...update accounT?</h2>
                        </Typography> : null}
                        
                        {currentUser ? 
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
                                id={currentUserData._id}

                            >
                                
                                <TextField 
                                    id="outlined-basic" 
                                    label="suP friend?" 
                                    variant="outlined" 
                                    multiline
                                    rows={4}
                                    type="textarea"
                                    name="newsData"
                                    // value={newsObj.newsData}
                                    // onChange={inputChange}
                                    className={classes.input}
                                    inputProps={{
                                        maxLength: 200
                                    }}
                                    // helperText={`${newsObj.newsData.length}/200`}
                                />
                                <Button variant="contained" color="primary" type="submit">
                                    send
                                </Button>                
       
                            </form>
                            </CardContent>
                            </Card>
                            : 
                            <Typography><h3 className={classes.welcome}>...Welcome to suP!</h3> 
                            <form 
                                className={classes.root} 
                                noValidate 
                                autoComplete="on" 
                                // onSubmit={loginInputSubmit}
                            >
                                <Typography align="right">
                                    <h2 className="login">...please login!</h2>
                                </Typography>
                                <TextField 
                                    id="outlined-basic" 
                                    label="username" 
                                    variant="outlined" 
                                    type="textarea"
                                    name="username"
                                    // value={loginObj.username}
                                    // onChange={loginInputChange}
                                    className={classes.input}
                                />
                                <TextField 
                                    id="outlined-basic" 
                                    label="password" 
                                    variant="outlined" 
                                    // disabled={loading}

                                    type="password"
                                    name="password"
                                    // value={loginObj.password}
                                    // onChange={loginInputChange}
                                    className={classes.input}
                                />
                                <div 
                                    // className={classes.wrapper}
                                >
       
                                </div>
                                <Button variant="contained" color="primary" type="submit" className={classes.button}>
                                    update account 
                                </Button>
                                <Button variant="contained" color="primary" type="submit" className={classes.button}>
                                    delete account
                                </Button>
                                </form>
                            </Typography>
                        }
                        </div>
                    </Grid>                 
                    <Grid item xs={1} sm={1} md={2} lg={2} direction="column"></Grid>
                </Grid>
            </Container>
        </div>
        </div>
    )
}
