import React from 'react';
import Popover from '@material-ui/core/Popover';
import { IconButton, TextField, Grid, FormControl } from '@material-ui/core';
import { useRouter } from 'next/router'
import SearchIcon from '@material-ui/icons/Search';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export default function SearchButton() {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchTerm, setSearch] = React.useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const setSearchValue = (event) => {
    setSearch(event.target.value)
  }
  const search = () => {
    const query = encodeURI(searchTerm)
    router.push(`/search?query=${query}`)
  }
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton onClick={handleClick}>
        <SearchIcon/>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        
      >
        <FormControl style={{minHeight:'10vh',paddingTop:'1vh',paddingLeft:'15px',paddingRight:'5px'}}>
          <Grid 
          container
          spacing={4}
          >
            <Grid item xs={8}>
              <TextField id="standard-basic" label="Search..." onChange={setSearchValue}/>
            </Grid>
            <Grid item xs={4} style={{paddingTop:'25px'}}>
              <IconButton onClick={search}>
                <ArrowForwardIosIcon/>
              </IconButton>
            </Grid>
          </Grid>
        </FormControl>
      </Popover>
    </div>
  );
}
