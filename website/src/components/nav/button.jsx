import React from 'react';
import { useRouter } from 'next/router'
import { Button, Typography } from '@material-ui/core';

const linkButton = (props) => {
  const { href,label } = props;
  const router = useRouter();
  
  const goToLink = () => {
    router.push(href);
  }

  return (
    <Button color="secondary" onClick={goToLink}>
      <Typography style={{
        color:'black',
        marginBlockEnd:'5px'}}
        >
        {label}
      </Typography>
  </Button>
  )
}

export default linkButton;