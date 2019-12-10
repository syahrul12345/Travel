import {Grid,Typography,FormControl,Select,Divider,MenuItem} from '@material-ui/core'
export default function MobileDestination(props){
    const [country,setCountry] = React.useState('all')
    const [category,setCategory] = React.useState(9999)
    const [currentPosts,setPosts] = React.useState(props.posts)
    const handleCountryFilterChange = event => {
        setCountry(event.target.value)
    }
    const handleCategoryFilterChange = event => {
        setCategory(event.target.value)
    }

    // React.useEffect(() => {
    //     const tempPosts = props.posts.filter((post) => {
    //         if(country === 'all' && category === 9999 ){
    //             return post
    //         }
    //         else if(country === 'all' && category !== 9999){
    //             if(post.category.includes(category)){
    //                 return post
    //             }
    //         }
    //         else if(country !== 'all' && category === 9999){
    //             //filter only by country
    //             if(post.country == country){
    //                 return post
    //             }
    //         }else if(country !== 'all' && country !== 9999){
    //             if(post.category.includes(category) && post.country == country){
    //                 return post
    //             }
    //         }
    //     })       
    //     setPosts(tempPosts)
    // },[country,category])
    return(
        <div>
            <Grid
            container
            spacing={2}
            direction="row"
            style={{marginTop:'5vh'}}
            justify="center"
            >
                <Typography variant="h5"> Destinations </Typography>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Grid item>
                            <FormControl>
                                <Select
                                labelId="country-filter"
                                id="country-filter"
                                value={country}
                                onChange={handleCountryFilterChange}
                                style={{paddingLeft:'px'}}
                                >   <MenuItem value='all' key="all">All Countries</MenuItem>
                                    {/* {props.destinations.data.map(({slug,title}) => {
                                        if(props.destinationCount[slug] > 0) {
                                            return(
                                                <MenuItem value={slug} key={title}>{title}</MenuItem>
                                            )
                                        }
                                    })} */}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <Select
                                labelId="country-filter"
                                id="country-filter"
                                value={country}
                                onChange={handleCountryFilterChange}
                                style={{paddingLeft:'4px'}}
                                >   <MenuItem value='all' key="all">All Countries</MenuItem>
                                    {/* {props.destinations.data.map(({slug,title}) => {
                                        if(props.destinationCount[slug] > 0) {
                                            return(
                                                <MenuItem value={slug} key={title}>{title}</MenuItem>
                                            )
                                        }
                                    })} */}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Divider variant="middle" style={{marginTop:'1vh'}}/>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                    {/* {currentPosts.map((post) =>{
                        return(
                            <Grid item key={post.title} xs={12} sm={6}>
                                     <MediumCard image={post.image} link={post.link} title={post.title} excerpt={post.excerpt} country={post.country}/>
                            </Grid>
                        )
                    })} */}
                    </Grid>
                </Grid>    
            </Grid>
        </div>
    )
}