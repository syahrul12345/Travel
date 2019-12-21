import React from 'react'
import HtmlToReact from 'html-to-react'
import Head from 'next/head'
import Nav from '../../components/nav'
import { Typography, Card,CardMedia,Avatar, IconButton, CardActionArea } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    root: {
      ...theme.typography,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
    },
    bigAvatar: {
        height:60,
        width:60,
    }
  }));

export default function Post(props) {
    const classes = useStyles()
    const post = props.post
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
                        <Typography variant="h2" style={{fontSize:'38px'}}>
                            {node.data}
                        </Typography>
                    )
                case('h3'):
                    return (
                        <Typography variant="h3">
                            {node.data}
                        </Typography>
                    )
                case('h4'):
                    return (
                        <Typography variant="h4">
                            {node.data}
                        </Typography>
                    )
                case('h5'):
                    return (
                        <Typography variant="h5">
                            {node.data}
                        </Typography>
                    )
                case('h6'):
                    return (
                        <Typography variant="h6">
                            {node.data}
                        </Typography>
                    )
                default:
                    return(
                        <Typography variant="h2">
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
                if (node && node.name == 'a'){
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
                    <Typography variant="caption" align="center">{node.data}</Typography>
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
    
    return (
        <div style={{marginTop:'10vh'}}>
            <Head>
                <title>{parser.parse(post.title.rendered)}</title>
                <meta name="description" name={post.acf.excerpt}/>
            </Head>
            <Nav/>
            <div style={{marginLeft:'21%',marginRight:'21%'}}>
                <Typography variant="h1" component="h1" style={{fontSize:'40px'}}>
                    <strong>{parser.parse(post.title.rendered)}</strong>
                </Typography>
                {/* Social buton gird */}
                <div style={{display:'flex',justifyContent:'space-between',alignContent:'center',alignItems:'center'}}>
                    <Typography variant="subtitle1">
                        {post.date}
                    </Typography>
                    <div style={{display:'flex', justifyContent:'space-between',align:'center'}} >
                        <IconButton aria-label="Facebook" className={classes.bigAvatar}>
                            <img src="/static/images/icons8-facebook-f-24.png"/>
                        </IconButton>
                        <IconButton aria-label="Instagram" className={classes.bigAvatar}>
                            <img src="/static/images/icons8-instagram-24.png"/>
                        </IconButton>
                        <IconButton aria-label="Telegram" className={classes.bigAvatar}>
                            <img src="/static/images/icons8-telegram-app-24.png"/>
                        </IconButton>
                    </div>
                </div>
                {/* Content grid */}
                <Card>
                    <CardMedia
                    image={props.post.acf.featured_image.sizes["2048x2048"]}
                    style={{height:"60vh",zIndex:'100'}}/>
                </Card>
                <Typography variant="body1">
                    {parser.parseWithInstructions(post.content.rendered,isValidNode,processingInstructions)}
                </Typography>
                {/* Profile gird */}
                <div style={{display:'flex',justifyContent:'space-between',paddingTop:'1vh'}}>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <Avatar className={classes.bigAvatar} alt={post.author.name} src={post.author.avatar_urls[96]}/>
                        <div style={{display:'flex',paddingLeft:'1vh',flexDirection:'column'}}>
                            <Typography variant="subtitle1">
                                {post.author.name}
                            </Typography>
                            <Typography variant="subtitle2">
                                {post.author.description}
                            </Typography>
                        </div>
                    </div>
                    
                </div>
            </div>
            
        </div>
       
    )
}

