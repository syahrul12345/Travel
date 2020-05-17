import React from 'react';
// import { useRouter } from 'next/router'
import { Button, Typography } from '@material-ui/core';

const linkButton = (props) => {
  const { href,label } = props;
  // const router = useRouter();
  
  const goToLink = () => {
    // console.log("clicked!")
    // router.push(href);
  }

  return (
      <Button color="secondary" href={href} style={{textAlign:'center',alignItem:'center',justify:'center',justifyContent:'center'}}>
        <Typography style={{
          textAlign:'center',
          color:'black',
          marginBlockEnd:'5px'}}
          href={href}
          >
          <strong>{label}</strong>
        </Typography>
      </Button>
  )
}

export default linkButton;