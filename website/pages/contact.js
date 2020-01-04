import FooterLayout from '../src/layouts/footerpage'
import {getFooterInfo} from '../src/utils/utils'
import { makeStyles } from '@material-ui/core/styles';
import {Button,TextField,Grid} from '@material-ui/core';
import {parse} from '../src/utils/parse'
export default function Contact(props) {
    const data = props.content
    return(
        <div>
            <FooterLayout content={props.content}>
                <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
                justify="center">
                    <Grid 
                    item 
                    xs={12}
                    style={{ margin: 8,maxWidth:'45vw'}}>
                        {parse(data.content.rendered)}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        id="standard-full-width"
                        label="Name"
                        style={{minWidth:'40vw' }}
                        placeholder="What Do Your Friends Address You?
                        "
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        id="standard-full-width"
                        label="Email"
                        style={{minWidth:'40vw' }}
                        placeholder="What’s Your Digital Mail Address?"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        id="standard-full-width"
                        label="Subject"
                        style={{minWidth:'40vw' }}
                        placeholder="Give Us A One Line Summary!"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        id="standard-full-width"
                        label="Message"
                        style={{minWidth:'40vw' }}
                        placeholder="And Finally Your Grand Thoughts!"
                        fullWidth
                        multiline
                        rows="6"
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button>Send</Button>
                    </Grid>
                </Grid>
            </FooterLayout>
        </div>
    )
}
Contact.getInitialProps = async(context) => {
    const content = await getFooterInfo('contact')
    return{
        content
    }
}