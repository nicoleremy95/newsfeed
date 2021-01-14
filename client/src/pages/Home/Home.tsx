import * as React from 'react';
import {useState, useEffect} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import News from '../../components/News/News';
import Sup from '../../components/Sup/Sup';
import API from '../../utils/API';
import Scroll from '../../components/Scroll/Scroll';

//INTERFACE
interface currentUserProps {
    currentUser: boolean
    currentUserData: any
}

//STYLES
const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        homeContainer: {
            backgroundImage: "linear-gradient(to bottom right, white, #d2a295);"
        }
    })
)

//FC
export default function Home({currentUser, currentUserData}: currentUserProps) {
    //DECLARATIONS 
    const classes = useStyles();

    const [newsDB, setNewsDB] = useState([]);
    
    //DEV
    // console.log('Home.tsx currentUserData', currentUserData)
    // console.log("FunctionHome")
    // console.log('home tsx currentUser.username', currentUser.username)

    //TODO: move to app.tsx and pass down with props 
    useEffect(()=>{
        API.getAllNews()
        .then(res =>{
            // console.log('res.data[0].newsCreator', res.data[0].newsCreator)
            // console.log('Home.tsx res.data.userId', res.data.userId)
            setNewsDB(res.data);
            // console.log('newsDB', newsDB)
        })
        .catch(err => console.log('err', err))
    }, [])

    
    //RENDER
    return (
        <div 
            className={classes.homeContainer}
        >
            <Scroll showBelow={250}/>
            <Sup currentUser={currentUser} currentUserData={currentUserData}/>
            <News currentUser={currentUser} currentUserData={currentUserData}newsDB ={newsDB} />
        </div>
    )
}

