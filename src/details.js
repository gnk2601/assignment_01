import React, { useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
  },
  media: {
      width: 'auto',
      height: '500px',
    // height: 0,
    // paddingTop: '56.25%', // 16:9
  },
  details: {
      display: 'flex',
      flexDirection: 'column',
      margin: '1rem'
  }
}));

const Details = () => {
    const [movie, setMovie] = useState({});
    const [isError, setIsError] = useState(false);
    const classes = useStyles();
    const {id} = useParams()
    
    useEffect(() => {
      axios.get(`http://www.omdbapi.com/?apikey=58095dc2&i=${id}`)
          .then(function (response) {
              console.log(response,  response && (response.data || {}).Response === 'True')
            response && (response.data || {}).Response === 'True'
             ? setMovie(response.data || {})
             : setIsError(true)
          })
          .catch(function (error) {
           
            setIsError(true)
          })
    }, [])
    
  
    
    return(
        <React.Fragment>
            {
            isError
                ? <div className={classes.details}>
                    <div style={{padding: '1rem'}}><Link style={{float: 'right'}} to={'/'}>Back</Link></div>
                    <div> Unable to fetch Movie Detail, Please try later. </div>
                  </div>
                :  
                    <div className={classes.details}>
                    <div style={{padding: '1rem'}}><Link style={{float: 'right'}} to={'/'}>Back</Link></div>
                    <Card className={classes.root}>
                      <CardHeader
                       
                        
                        title={movie.Title}
                        subheader={movie.Released}
                      />
                      <CardContent>
                      <div>
                        <div>
                          <img src={movie.Poster} />
                        </div>
                        <div>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {`Actors: ${movie.Actors}`}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {`Director(s): ${movie.Director}`}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {`Plot Summary: ${movie.Plot}`}
                          </Typography>
                        
                        </div>
                      </div>
                      </CardContent>
                    </Card>
                    </div>
            }
        </React.Fragment>
        
    )
}

export default Details;