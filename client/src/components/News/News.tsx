import * as React from 'react';
import {useState} from 'react';
import {createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {Container, Card, CardContent, Button, Typography, TextField, Grid} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import './news.css'
import API from '../../utils/API';

//INTERFACES 
interface Props {
  newsDB: any[],
  currentUser: boolean,
  currentUserData: any
}

interface Sup {
  newsData: string,
}

interface Reaction {
  reaction: string
}

//STYLES 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 'auto'
    },
    cards: {
      marginTop: '50px',
      marginBottom: 'auto',
      boxShadow: theme.shadows[5],
    },
    textField:{
      width: '90%',
      marginBottom: '20px'
    },
    cardAction: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      margin: "5%"
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: '#eee',
      border: '2px solid #FFC0CB',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    button:{
      marginBottom: '20px',
    },
    newsName: {
      fontSize: "30px !important"
    }
  })
);

//FC 
export default function News({newsDB, currentUser, currentUserData}: Props) : JSX.Element {
  //DECLARATIONS 
  const classes = useStyles();

  const [updatedNewsData, setUpdatedNewsData] =useState<Sup>({
    newsData:"",
  })

  const [reactionEmoji, setReactionEmoji] =useState<Reaction>({
    reaction: ""
  })

  const [favorite, setFavorite] = useState(false)

  //FUNCTIONS 
  function inputChangeSup(e: React.ChangeEvent<HTMLTextAreaElement>) {
    //TODO: refactor any
    const{ name, value}: any = e.target;
    setUpdatedNewsData({ ...updatedNewsData,[name]: value})
  };

  //TODO: fix function (for some reason removing the newsData all together)
  function inputSubmitSup(e: React.ChangeEvent<HTMLFormElement>): boolean {
    e.preventDefault();
    // console.log('News.tsx updatedNewsData', updatedNewsData)
    const id:any = e.target.getAttribute("id");
    // console.log('News.tsx id', id);

    API.updateNews(updatedNewsData, id)
    .then(sup =>{
      // console.log('News.tsx sup went through!', sup)
    })
    .catch(err => console.log('News.tsx err', err))
    return true;
  };

  function inputReactionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    //TODO: refactor any
    const{ name, value}: any = e.target;
    setReactionEmoji({...reactionEmoji, [name]: value})
  }; 

  function inputReactionSubmit(e: React.ChangeEvent<HTMLFormElement>) : boolean {
    e.preventDefault();
    const id:any = e.target.getAttribute("id");
    console.log("News.tsx reactionEmoji", reactionEmoji)
    API.postReaction(reactionEmoji, id)
    .then(thing=>{
      console.log('thing', thing)
    })
    .catch(err => console.log('News.tsx err', err))
    return true;

  }

  //TODO: have not tried this on the front end, but backend works
  function favoriteSubmit(e: React.ChangeEvent<HTMLFormElement>): boolean{
    e.preventDefault();
    setFavorite(true);
    const id:any = e.target.getAttribute("id");
    const favoriteObj ={
      heart: favorite
    };
    API.favoriteNews(favoriteObj, id)
    .then(fav=>{
      console.log('News.tsx fav', fav)
    })
    .catch(err => console.log('News.tsx err', err))
    return true;
  }

  function deleteNews(e: React.ChangeEvent<HTMLFormElement>): boolean {
    // e.preventDefault();
    const id:any = e.target.getAttribute("id")
    API.deleteNews(id)
    .then(news =>{

    })
    .catch(err =>console.log('err', err))
    return true;
  };

  //DEV
  // console.log('News.tsx newsDB[0]', newsDB[0]);
  // console.log('News.tsx newsDB[i].userId.username', newsDB[1].userId.username)

  //CREATE NEWS CARDS 
  const newsArr = [];
  
  for(let i = 0; i < newsDB.length; i ++){
    // console.log('News.tsx newsDB[i].comments.message', newsDB[i].comments.message)
     newsArr.push(
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
                  <span>"{newsDB[i].newsData}"</span>
                </Typography>
                <Typography 
                  variant="body2" 
                >
                  <h3 className={classes.newsName}> ~{newsDB[i].userId.username}</h3>
                </Typography>
                <Typography>
                  <h4>{newsDB[i].createdAt}</h4>
                </Typography>
                <form
                  noValidate 
                  className={classes.root}
                  // onSubmit={inputReactionSubmit}                 
                  id={newsDB[i]._id}
                >
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                </form>
                <form
                  noValidate 
                  className={classes.root}
                  onSubmit={inputReactionSubmit}                 
                  id={newsDB[i]._id}
                >
                  <Typography>
                    <Button type="submit" name="reaction" value="😈">😈</Button>
                  </Typography>
                </form>
              </CardContent>
              <div
                className="News-cards-comment"
              >
                {newsDB[i].userId.username===currentUserData.username?
                  <form
                    noValidate 
                    className={classes.root}
                    onSubmit={inputSubmitSup}                 
                    id={newsDB[i]._id}
                  >
                    <TextField
                      id="filled-multiline-static"
                      multiline
                      rows={4}
                      label={newsDB[i].newsData}
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
                : null}
                {newsDB[i].userId.username===currentUserData.username? 
                  <form  
                    noValidate 
                    onSubmit={deleteNews}                 
                    id={newsDB[i]._id}
                    
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
                : null}
               
              </div> 
         </Card>
      </div>
     )
  }
  
  //RENDER
  return (
    <div 
      className= {classes.root}
    >
        <Container>
          <Grid container>
            <Grid item xs={1} sm={1} md={3} lg={3}></Grid>
            <Grid item xs={10} sm={10} md={6} lg={6}>
            {newsArr.map(news =>{return news})}
            </Grid>
            <Grid item xs={1} sm={1} md={2} lg={2}></Grid>
          </Grid>
        </Container>
      </div>
  )
}

