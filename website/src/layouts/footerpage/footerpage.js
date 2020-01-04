import {Grid,Card,CardContent,CardMedia,Typography} from '@material-ui/core'
import Head from 'next/head'
import Nav from '../../components/nav'
import Footer from '../../components/footer'
import HtmlToReact from 'html-to-react'
import './style.css'
export default function Contact(props) {
    const info = props.content
    //we need to parse the data
    const HtmlToReactParser = HtmlToReact.Parser
    const parser = new HtmlToReactParser()
    //Custom instructions to parse the escaped html
    const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
    const processingInstructions = [
        {
          // Custom <header> processing
          shouldProcessNode: function (node) {
            if(node.parent && node.parent.name && (node.parent.name === 'h2' || node.parent.name === 'h3' || node.parent.name === 'h4' || node.parent.name === 'h5')){
                if(node.type != 'tag'){
                    return node
                }
            }
          },
          processNode: function (node, children) {
            switch(node.parent.name){
                case('h2'):
                    return (
                        <Typography component={'span'} variant="h2" >
                            {node.data}
                        </Typography>
                    )
                case('h3'):
                    return (
                        <Typography component={'span'} variant="h3">
                            {node.data}
                        </Typography>
                    )
                case('h4'):
                    return (
                        <Typography component={'span'} variant="h4">
                            {node.data}
                        </Typography>
                    )
                case('h5'):
                    return (
                        <Typography component={'span'} variant="h5">
                            {node.data}
                        </Typography>
                    )
                case('h6'):
                    return (
                        <Typography component={'span'} variant="h6">
                            {node.data}
                        </Typography>
                    )
                default:
                    return(
                        <Typography component={'span'} variant="body" >
                            {node.data}
                        </Typography>
                    )
            }
          }
        },
        {
            //Process the <img> tag
            shouldProcessNode: function(node){
                if(node.parent && node.parent.name && node.parent.name == "figure"){
                    if(node.name && node.name == "img"){
                        return node
                    }else if(node.name && node.name == "a"){
                        //image is child of the node
                        const imgNode = node.children[0]
                        return imgNode
                    }
                }
            },
            processNode: function(node,children){
                //handle the captions
                if (node && node.name == "a"){
                    return <div>
                        <Card>
                            <a href={`//${node['attribs'].href}`} style={{color:'inherit'}}>
                                <CardActionArea>
                                    <CardMedia
                                    image={children[0].props.src}
                                    style={{height:'50vh'}}/>
                                </CardActionArea>
                            </a>
                        </Card>
                        
                    </div>
                }else{
                    return(
                        <div>
                            <Card>
                                <CardMedia
                                image={node['attribs'].src}
                                style={{height:'50vh'}}/>
                            </Card>
                        </div>
                    )
                }
                
            }
        },
        {
            //Handle image captions
            shouldProcessNode: function(node){
                return node.parent && node.parent.name && node.parent.name == "figcaption"
            },
            processNode: function(node,children){
                return(
                    <Typography component={'span'} variant="caption" align="center">{node.data}</Typography>
                )
            }
        },
        
        {
          // Anything else
          shouldProcessNode: function (node) {
            return true;
          },
          processNode: processNodeDefinitions.processDefaultNode
        }
    ];
    //callback function to check validaity of node
    const isValidNode = () => {
        return true
    }
    return(
        <div>
            <Head>
                <title>{info.title.rendered} - The Layover Life</title>
                <meta name="description" content="Privacy Policy page for thelayover.life"/>
            </Head>
            <Nav/>
            <Grid container 
            justify="center" 
            alignItems="center"
            alignContent="center"
            direction="column"
            style={{ minHeight: '93vh' }}>
                <Grid item xs={12} style={{textAlign:'left'}}>
                    <Card
                    style={{margin:'10vh 10vh 0vh 10vh'}}>
                        <CardContent>
                            {parser.parseWithInstructions(info.content.rendered,isValidNode,processingInstructions)}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Footer/> 
        </div>
        
    )
}