import React from 'react'
import HtmlToReact from 'html-to-react'
import Head from 'next/head'
import {FacebookProvider,Share} from 'react-facebook'
import { Typography, Card,CardMedia,Avatar, IconButton, CardActionArea,Grid,Paper,Link,Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Nav from '../../components/nav' 
import Footer from '../../components/footer'
import Related from '../../components/related'
import Facebook from '../../components/facebook'
import Gallery from '../../components/gallery';

import './style.css'

export default function Post(props) {
    const { data } = props 
    const { post , relatedPosts, categories} = data
    
    let categoryString = ''
    let categoryLink = "/"
    categories.map((category) => {
        // Ignore travel
        if (category.name !== "Travel" && post.categories.includes(category.id)) {
            categoryString = category.name
            switch (categoryString) {
                case 'Cabin Life':
                    categoryLink = "/cabin-life";
                    break;
                case 'Food':
                    categoryLink = "/food";
                    break;
                case 'Guides &amp; Tips':
                    categoryString = "Guides & Tips"
                    categoryLink = "/travel";
                    break;
                case 'Itineraries':
                    categoryLink = "/travel";
                    break;
                case 'Lifestyle':
                    categoryLink = "/lifestyle";
                    break;
                default:
                    categoryLink = "/"
                    break;
            }

        }
    })
    
    // we need to parse the data
    const HtmlToReactParser = HtmlToReact.Parser
    const parser = new HtmlToReactParser()
    // Custom instructions to parse the escaped html
    const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
    const processingInstructions = [
        {
          // Custom <header> processing
          shouldProcessNode (node) {
            if(node.parent && node.parent.name && (node.parent.name === 'h2' || node.parent.name === 'h3' || node.parent.name === 'h4' || node.parent.name === 'h5')){
                if(node.type != 'tag'){
                    return node
                }
            }
          },
          processNode (node, children) {
            switch(node.parent.name){
                case('h2'):
                    return (
                        <Typography component="span" variant="h2" style={{fontSize:'38px'}}>
                            {node.data}
                        </Typography>
                    )
                case('h3'):
                    return (
                        <Typography component="span" variant="h3">
                            {node.data}
                        </Typography>
                    )
                case('h4'):
                    return (
                        <Typography component="span" variant="h4">
                            {node.data}
                        </Typography>
                    )
                case('h5'):
                    return (
                        <Typography component="span" variant="h5">
                            {node.data}
                        </Typography>
                    )
                case('h6'):
                    return (
                        <Typography component="span" variant="h6">
                            {node.data}
                        </Typography>
                    )
                default:
                    return(
                        <Typography component="span" variant="body">
                            {node.data}
                        </Typography>
                    )
            }
          }
        },
        {
            // Process the <img> tag
            shouldProcessNode(node){
                if(node.parent && node.parent.name && node.parent.name == "figure"){
                    if (node.name && node.name == "ul") {
                        return node
                    }
                    if(node.name && node.name == "img"){
                        return node
                    }if(node.name && node.name == "a"){
                        // image is child of the node
                        const imgNode = node.children[0]
                        return imgNode
                    }
                }
            },
            processNode(node,children){
                // handle the captions
                if (node && node.name == 'a'){
                    // check if https if not ignore
                    let url = children[0].props.src
                    // check https. Only load https content from outside sites, so if its not https, it means its local
                    const isHttps = url.substring(0,5) === 's'
                    if (!isHttps) {
                        // check if its in production or not
                        const imageBaseurl = ''
                        if(process.env.BASE_IMAGE_URL) {
                            // replace if it is
                            url = process.env.BASE_IMAGE_URL + url.replace(/^(?:\/\/|[^\/]+)*\//, "")
                        }
                    }

                    return <div>
                        <Card
                        // className="images"
                        style={{
                            marginTop:'5vh',
                            marginBottom: node.next && node.next.name && node.next.name == "figcaption" ? '2vh':'5vh'}}>
                            <a href={`//${node.attribs.href}`} style={{color:'inherit'}}>
                                <CardActionArea>
                                    <CardMedia
                                    image={url}
                                    style={{width:'600px'}}
                                    // className="images"
                                    />
                                </CardActionArea>
                            </a>
                        </Card>
                        
                    </div>
                }if (node && node.name == 'ul') {
                    // If its in a gallery
                    const images = []
                    node.children.map((childNode) => {
                        // Image node can contain the figure and potentially a figure caption
                        const imageNode = childNode.children[0].children[0]
                        let {src} = imageNode.attribs
                        // Replace the src with https.
                        if(process.env.BASE_IMAGE_URL) {
                            src = process.env.BASE_IMAGE_URL + src.replace(/^(?:\/\/|[^\/]+)*\//, "")
                        }
                        if (imageNode.next) {
                            const caption = imageNode.next.children[0].data
                            images.push({caption, src})
                        }else{
                            images.push({src})
                        }
                        
                        
                    })
                    return (
                        <Gallery images={images} />
                    )
                } 
                    let url = node.attribs.src
                    // check https. Only load https content from outside sites, so if its not https, it means its local
                    const isHttps = url.substring(0,5) === 'https'
                    if (!isHttps) {
                        // check if its in production or not
                        const imageBaseurl = ''
                        if(process.env.BASE_IMAGE_URL) {
                            // replace if it is
                            url = process.env.BASE_IMAGE_URL + url.replace(/^(?:\/\/|[^\/]+)*\//, "")
                        }
                    }
                    return(
                        <div>
                            <Card
                            style={{
                                marginTop:'5vh',
                                marginBottom: node.next && node.next.name && node.next.name == "figcaption" ? '2vh':'5vh'}}>
                                <CardMedia
                                image={url}
                                style={{height:'600px'}}
                                />
                            </Card>
                        </div>
                    )
                
                
            }
        },
        {
            // Handle image captions
            shouldProcessNode(node){
                return node.parent && node.parent.name && node.parent.name == "figcaption"
            },
            processNode(node,children){
                return(
                    <Grid
                    container
                    alignContent="center"
                    alignItems="center"
                    justify="center"
                    style={{marginBottom:'3vh'}}>
                        <Typography 
                        component="span" 
                        variant="caption" 
                        align="center"
                        style={{textAlign:"center",fontSize:'0.85rem'}}><i>{node.data}</i></Typography>
                    </Grid>
                )
            }
        },
        {
          // Anything else
          shouldProcessNode (node) {
            return true;
          },
          processNode: processNodeDefinitions.processDefaultNode
        }
    ];
    // callback function to check validaity of node
    const isValidNode = () => {
        return true
    }
    return (
        <div>
            <Head>
                <title>{parser.parse(post.title.rendered)}</title>
                <meta name="description" content={post.acf.excerpt}/>
            </Head>
            {/* <AppBar id="appbar" position="sticky"> */}
            {/* <div style={{
            backgroundColor: 'white',
            position:"relative",
            display:'flex',
            justifyContent:'center'}}>
            <a href="/">
                <img 
                style={{
                    maxHeight:'20vh',
                    maxWidth:'20vw',
                    paddingTop:'2vh',
                    marginBottom:'1.5vh'}}
                src="/static/images/smolidays-logo-1.png" 
                alt="smolidays-logo"/>
            </a>
            </div> */}
            <Nav/>
            <div className="titleGrid">
                <Link href={categoryLink} style={{color:'#C7ACA1'}}>
                    <Typography  component="span" variant="subtitle1" component="h1" style={{fontWeight:'900', textAlign:'center',paddingBottom:'2vh',paddingTop:'5vh'}}>
                        <strong> {categoryString}</strong>
                    </Typography>
                </Link>
                <Typography component="span" variant="h1" component="h1" style={{fontSize:'40px', fontWeight:'900', textAlign:'center',paddingBottom: '5vh'}}>
                    <strong>{parser.parse(post.title.rendered)}</strong>
                </Typography>
                {/* Social buton grid */}
                <div style={{display:'flex',justifyContent:'space-between', alignContent:'center',alignItems:'center'}}>
                    <Typography component="span" variant="subtitle1" style={{textAlign:'center'}}>
                    <strong>{post.author.name} | {post.date}</strong>
                    </Typography>
                    <div style={{display:'flex', justifyContent:'space-between',align:'center'}} >
                        <FacebookProvider appId="1028885374122493">
                            <Share href="http://www.facebook.com">
                                {({ handleClick, loading }) => (
                                    <IconButton disabled={loading} onClick={handleClick} aria-label="Facebook" className="bigAvatar">
                                        <img src="/static/images/icons8-facebook-f-24.png" alt="facebook-share"/>
                                    </IconButton>
                                )}
                            </Share>
                        </FacebookProvider>
                        <a href={"tg://msg_url?url=https://valid.url&amp;text=text"}>
                            <IconButton aria-label="Instagram" className="bigAvatar">
                                <img src="/static/images/icons8-instagram-24.png" alt="instagram-share"/>
                            </IconButton>
                        </a>
                        <a href={"tg://msg_url?url=https://valid.url&amp;text=text"}>
                        <IconButton aria-label="Telegram" className="bigAvatar">
                            <img src="/static/images/icons8-telegram-app-24.png" alt="telegram-share"/>
                        </IconButton>
                        </a>
                        <a href={"tg://msg_url?url=https://valid.url&amp;text=text"}>
                        <IconButton aria-label="Pinterest" className="bigAvatar">
                            <img src="/static/images/icons8-pinterest-26.png" alt="telegram-share"/>
                        </IconButton>
                        </a>
                        
                    </div>
                </div>
            </div>
            {/* <div style={{display:'flex',justifyContent:'center',justify:'center'}}>
                <img 
                src={props.post.acf.featured_image.sizes["2048x2048"]} 
                alt={`${post.title.rendered}`}
                style={{height:'60vh'}}/>
            </div> */}
                {/* Content grid */}
            <div className="contentGrid" >
                <Card>
                    <CardMedia
                    image={post.acf.featured_image.sizes["2048x2048"]}
                    style={{height:"60vh",zIndex:'100'}}/>
                </Card>
                <Typography component="span" variant="body1">
                    {parser.parseWithInstructions(post.content.rendered,isValidNode,processingInstructions)}
                </Typography>
                {/* Profile gird */}
                <Grid container spacing ={2}>
                    <Grid item xs={6}>
                        <Paper style={{
                            display:'flex',
                            justifyContent:'flex-start',
                            minHeight:'15vh',
                            marginBottom:'5vh',
                            background:'#E7E4E0',
                            }}>
                            <Grid container>
                                <Grid item xs={3} style={{marginLeft:'2vh',marginTop:'2vh'}}>
                                    <Avatar
                                    alt={post.author.name} 
                                    src="https://secure.gravatar.com/avatar/2c22ecc7422ed1c357c6f42b9e594fcf?s=96&d=mm&r=g"
                                    style={{width:'96px',height:'96px'}}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Grid container spacing={0}
                                        direction="column"
                                        alignItems="center"
                                        justify="center"
                                        style={{minHeight:"10vh"}}>
                                        <Grid item xs={12}>
                                            <Typography component="span" variant="subtitle1">
                                                {post.author.name}
                                            </Typography>
                                            <Typography 
                                            component="span" 
                                            variant="subtitle2">
                                                {post.author.description}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                        
                                </Grid>
                            </Grid>
                            {/* <div style={{
                                display:'flex',
                                justifyContent:'space-between',
                                alignContent:'center',
                                alignItems:'center'}}>
                                <Avatar
                                alt={post.author.name} 
                                src="https://secure.gravatar.com/avatar/2c22ecc7422ed1c357c6f42b9e594fcf?s=96&d=mm&r=g"
                                style={{paddingLeft:'5px',width:'96px',height:'96px'}}
                                />
                                <div style={{display:'flex',paddingLeft:'4vh',flexDirection:'column'}}>
                                    <Typography component="span" variant="subtitle1">
                                        {post.author.name}
                                    </Typography>
                                    <Typography 
                                    component="span" 
                                    variant="subtitle2">
                                        {post.author.description}
                                </Typography>
                                </div>  
                            </div> */}
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={2} style={{minHeight: '15vh'}}>
                            <Grid item xs={12}>
                                <Button variant="outlined" style={{width:'100%',height:'6.5vh',backgroundColor:'#325A97'}}><img src="/static/images/fb-icon.svg" alt="facebok-vector" style={{maxHeight:'25px'}}/></Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="outlined" style={{width:'100%',height:'6.5vh',backgroundColor:'#00ACED'}}> <img src="/static/images/tw-icon.svg" alt="facebok-vector" style={{maxHeight:'20px'}}/></Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                
            <div style={{display:'flex',justifyContent:'flex-start',justifyItems:'flex-start'}}>
                <Facebook/>
            </div>
            </div>
            <div className="relatedGrid" >
                <Related related={relatedPosts}/>
            </div>
            <Footer/>
        </div>
    )
}

