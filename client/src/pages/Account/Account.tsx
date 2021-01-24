//TODO: update and delete account page and all other functionality needs to be tweaked 
import * as React from 'react';
import {useState, useEffect} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {CircularProgress, TextField, Button, Grid, Container, Typography, CardContent, Card} from '@material-ui/core';
import API from '../../utils/API';



interface currentUserProps {
    currentUserNewsDB: any[],
    currentUser: boolean,
    currentUserData: any
}
interface userObj {
    name: string,
    username: string, 
    email: string
}

interface Sup {
    newsData: string,
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
    newsName: {
        fontSize: "30px !important"
    },
    textField:{
        width: '90%',
        marginBottom: '20px'
    },
  }),
);


export default function Account({currentUserNewsDB, currentUser, currentUserData}: currentUserProps): JSX.Element {
    const classes = useStyles();

    const [userObj, setUserObj] = useState<userObj>({
        username: "",
        name: "",
        email: ""
    });

    const [updatedNewsData, setUpdatedNewsData] =useState<Sup>({
        newsData:"",
    })

    // console.log('Account.tsx currentUserNewsDB', currentUserNewsDB)
    
    function inputChangeSup(e: React.ChangeEvent<HTMLTextAreaElement>) {
        //TODO: refactor any
        const{ name, value}: any = e.target;
        setUpdatedNewsData({ ...updatedNewsData,[name]: value})
      };

    function inputSubmitSup(e: React.ChangeEvent<HTMLFormElement>){
        const id:any = e.target.getAttribute("id")
        API.updateNews(updatedNewsData, id)
        .then(news=>{
            console.log('Account.tsx news', news)
        })
        .catch(err =>console.log('err', err))       
    }
    function deleteNews(e: React.ChangeEvent<HTMLFormElement>){
        const id:any = e.target.getAttribute("id")
        API.deleteNews(id)
        .then(news=>{
            console.log('Account.tsx news', news)
        })
        .catch(err =>console.log('err', err))  
    }
    let currentUserNewsArr = [];
    for(let i = 0; i <currentUserNewsDB.length; i ++){
        console.log('Account.tsx currentUserNewsDB[i]', currentUserNewsDB[i])
        currentUserNewsArr.push(
            <div className="news-bubble">
            <div className="news-arrow news-bottom left"></div>
                <Typography align="left">
                    <h2 className="news">...more talK!</h2>
                </Typography>
                <Card
                    className={classes.cards} 
                    variant="outlined"
                >
                    <CardContent>
                        <Typography 
                        variant="h5" 
                        component="h2"
                        >
                        <span>"{currentUserNewsDB[i].newsData}"</span>
                        </Typography>
                        <Typography>
                        <h4>{currentUserNewsDB[i].createdAt}</h4>
                        </Typography>
                    </CardContent>
                    <div>
                        <form
                            noValidate 
                            className={classes.root}
                            onSubmit={inputSubmitSup}                 
                            id={currentUserNewsDB[i]._id}
                        >
                        <TextField
                            id="filled-multiline-static"
                            multiline
                            rows={4}
                            label={currentUserNewsDB[i].newsData}
                            placeholder="type here to update"
                            variant="filled"
                            className={classes.textField}
                            type="textarea"
                            name="newsData"
                            value={updatedNewsData.newsData}
                            onChange={inputChangeSup}
                            inputProps={{
                                maxLength: 200
                            }}
                            helperText={`${updatedNewsData.newsData.length}/200`}
                            />
                    {/* //TODO: Add tooltip */}
                        <Button 
                        variant="contained" 
                        color="primary"  
                        type="submit" 
                        className={classes.button}
                        >
                            update  
                        </Button>

                    </form>
             
                    <form  
                        noValidate 
                        onSubmit={deleteNews}                 
                        id={currentUserNewsDB[i]._id}
                        
                    >
                        <Button 
                        variant="contained" 
                        color="secondary"  
                        type="submit" 
                        className={classes.button}
                        >
                            delete 
                        </Button>
                    </form>
                </div>
                </Card>
            </div>
        )
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
                    {currentUserNewsArr.map(news =>{return news})}
                </Grid>                 
                <Grid item xs={1} sm={1} md={2} lg={2} direction="column"></Grid>
                </Grid>
            </Container>
        </div>
        </div>
    )
}
