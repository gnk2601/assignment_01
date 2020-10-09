import React, {useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { isEmpty as _isEmpty} from 'lodash';
import Button from '@material-ui/core/Button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  search_div: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'center',
    /* height: 4rem; */
    padding:'2rem'
  }
}));

export default function AlignItemsList() {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef  = useRef(null);
  
  useEffect(() => {
    // call the api to fetchj the movies list ion change of search term if and only if length is greater than or euql to 3 chars
    searchTerm && searchTerm.length > 2 &&
    
    axios.get(`http://www.omdbapi.com/?apikey=58095dc2&s=${searchTerm}&type=movie`)
      .then(function (response) {
        response && (response.data || {}).Response === 'True'
         ? setMovies((response.data || {}).Search)
         : setMovies([])
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setMovies([]);
        setIsError(error)
      })
    
  }, [searchTerm])
  
  const handleSearch = (event) => {
    const searched_title = searchRef.current.value;
    setSearchTerm(searched_title)
    // call the api and with the search term and get the movies
  }
  
 
  

  return (
    <React.Fragment>
        <div className={classes.search_div}>
          <TextField id="outlined-search" style={{paddingRight: '1rem'}} label="Search field" type="search" variant="outlined" inputRef={searchRef} onKeyPress={e => e.key === 'Enter' && handleSearch(e)} onChange={e => e.target.value === '' && setMovies([])}/>
          <Button variant="contained" onClick={handleSearch}>Search</Button>
          
        </div>
        
        {
            movies && !_isEmpty(movies)
            
            ?   
                <List className={classes.root}>
                  {
                    movies.map( movie => (
                    <React.Fragment>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              <Avatar alt={`movie.Title`} src={movie.Poster} />
                            </ListItemAvatar>
                            <ListItemText
                              primary={movie.Title}
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                  >
                                    Released on
                                  </Typography>
                                  {
                                    `: ${movie.Year}`
                                  }
                                  <Link style={{paddingLeft: '1rem'}} to={`/details/${movie.imdbID}`} >{`View`}</Link>
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                          <Divider variant="inset" component="li" />
                      </React.Fragment>
                    ))
                  }
                </List>
            : searchTerm && searchTerm !== '' && isError
              ? <div> NO Movies Found :( </div>
              : <div> Enter the Movie title in search bar (greater than 2 characters) and click enter to get the Movies List </div>
        }
    </React.Fragment>
  );
}
