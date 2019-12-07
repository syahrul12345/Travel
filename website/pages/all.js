import Nav from '../src/components/nav'
import {Grid,Typography,Divider,FormControl,Select,MenuItem} from '@material-ui/core'
import {populatePosts,populateDestinations,getCategories} from '../src/utils/utils'
import MediumCard from '../src/components/mediumcard'
import { useEffect } from 'react'
export default function All(props){
    const [country,setCountry] = React.useState('all')
    const [category,setCategory] = React.useState(9999)
    const [currentPosts,setPosts] = React.useState(props.posts)
    const handleCountryFilterChange = event => {
        setCountry(event.target.value)
    }
    const handleCategoryFilterChange = event => {
        setCategory(event.target.value)
    }

    React.useEffect(() => {
        const tempPosts = props.posts.filter((post) => {
            if(country === 'all' && category === 9999 ){
                return post
            }
            else if(country === 'all' && category !== 9999){
                if(post.category.includes(category)){
                    return post
                }
            }
            else if(country !== 'all' && category === 9999){
                //filter only by country
                if(post.country == country){
                    return post
                }
            }else if(country !== 'all' && country !== 9999){
                if(post.category.includes(category) && post.country == country){
                    return post
                }
            }
        })       
        setPosts(tempPosts)
    },[country,category])
    return(
        <div>
            <Nav/>
            <Grid
            container
            spacing={2}
            direction="row"
            style={{paddingRight:'20%',paddingLeft:'20%',marginTop:"5vh"}}
            >
                <Grid item xs={12} style={{textAlign:'center'}}>
                   <Typography variant="h4">
                        All Articles
                   </Typography>
                   <Typography variant="body1">
                       Don't know exactly what you want to read? Don't worry, we've got you covered.
                   </Typography>
                   
                </Grid>
                <Grid item xs={12}>
                    {/* Implement a countryfilter and  */}
                    <Grid container justify="center">
                        <Grid item>
                            <FormControl>
                                <Select
                                labelId="country-filter"
                                id="country-filter"
                                value={country}
                                onChange={handleCountryFilterChange}
                                style={{paddingLeft:'4px'}}
                                >   <MenuItem value='all' key="all">All Countries</MenuItem>
                                    {props.destinations.data.map(({slug,title}) => {
                                        if(props.destinationCount[slug] > 0) {
                                            return(
                                                <MenuItem value={slug} key={title}>{title}</MenuItem>
                                            )
                                        }
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl>
                                <Select
                                labelId="category-filter"
                                id="category-filter"
                                value={category}
                                onChange={handleCategoryFilterChange}
                                style={{paddingLeft:'4px'}}
                                >   <MenuItem value={9999} key="all">All Categories</MenuItem>
                                    {props.categories.map(({id,name}) => {
                                        if(props.categoryCount[name] > 0) {
                                            return(
                                                <MenuItem value={id} key={id}>{name[0].toUpperCase() + name.substring(1)}</MenuItem>
                                            )
                                        }
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Divider variant="middle"/>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                    {currentPosts.map((post) =>{
                        return(
                            <Grid item key={post.title} xs={12} sm={6}>
                                     <MediumCard image={post.image} link={post.link} title={post.title} excerpt={post.excerpt} country={post.country}/>
                            </Grid>
                        )
                    })}
                    </Grid>
                </Grid>    
            </Grid>
        </div>
    )
}

All.getInitialProps = async() => {
    //Get all posts
    const destinations = await populateDestinations()
    const categories = await getCategories()
    const postsRes = await populatePosts(100)
    const posts = postsRes.data
    
    const countryCountMap = {}
    //Count how many articles each destination has
    //Important to ensure that only destination that have articles will be provided
    destinations.data.map((destination) => {
        const temp = []
        posts.forEach((post) => {
            if(post.country ==destination.slug ){
                temp.push(post)
            }
        })
        const key = destination.slug
        const count = temp.length
        countryCountMap[key] = count
    })
    //next we count how many articles each category has
    const categoryCountMap = {}
    categories.map((category) => {
        const temp = []
        posts.forEach((post) => {
            if(post.category.includes(category.id)) {
                temp.push(post)
            }
        })
        const key = category.name
        const count = temp.length
        categoryCountMap[key] = count
    })
    
    const returnedJson = {}
    returnedJson['destinationCount'] = countryCountMap
    returnedJson['categoryCount'] = categoryCountMap
    returnedJson['posts'] = posts
    returnedJson['destinations'] = destinations
    returnedJson['categories'] = categories
    return returnedJson
}