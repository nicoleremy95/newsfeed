import * as React from 'react';
import {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';

//STYLES 
const useStyles = makeStyles((theme) => ({
    toTop: {
        zIndex: 2,
        position: 'fixed',
        bottom: '2vh',
        backgroundColor: '#dcdcdc',
        color: 'black',
        "&:hover, &.Mui-focusVisible": {
            transition: '0.3s',
            color: '#397ba6',
            backgroundColor: '#dcdcdc'
        },
        right:'5%'
    }
}))

//FUNCTIONS
const Scroll = (showBelow:any) =>{
    const classes = useStyles();
    const [show, setShow] = useState(showBelow ? false : true)

//event handler
const handleScroll = () =>{
    if(window.pageYOffset > showBelow){
        if(!show) setShow(true)
    } else {
        if(show) setShow(false)
    }
}

//scroll to top of page
const handleClick = () =>{
    window[`scrollTo`]({
        top:0,
        behavior: `smooth`
    })
}

useEffect(()=>{
    if(showBelow){
        window.addEventListener(`scroll`, handleScroll)
        return () => window.removeEventListener(`scroll`, handleScroll)
    }
})

//RENDER
return(
    <div>
        {
        //show &&
            <IconButton 
                onClick={handleClick}
                className={classes.toTop}
            >
                <ExpandLessIcon/>
            </IconButton>
        }
    </div>
)
}

export default Scroll;

