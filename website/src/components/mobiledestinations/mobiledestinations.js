import {Grid,Typography,FormControl,Select,Divider,MenuItem,GridList,GridListTile} from '@material-ui/core'
import CountryCard from '../countrycard'
export default function MobileDestination(props){
    const continents = [
        "Asia",
        "Southeast Asia",
        "Oceania",
        "America",
        "Europe",
        "Africa and Middle East"
    ]
    const [continent,setContinent] = React.useState('Asia')
    const [countries,setCountries] = React.useState([])
    const handleContinentFilterChange = event => {
        setContinent(event.target.value)
    }

    React.useEffect(() => {
        switch(continent){
            case("Asia"):
                setCountries(props.destinations["asia"])
                break;
            case("Southeast Asia"):
                setCountries(props.destinations["se"])
                break;
            case("Oceania"):
                setCountries(props.destinations["oceania"])
                break;
            case("America"):
                setCountries(props.destinations["america"])
                break;
            case("Europe"):
                setCountries(props.destinations["europe"])
                break;
            case("Africa and Middle East"):
                setCountries(props.destinations["africa"])
                break;
        }
    },[continent])
    
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
                                value={continent}
                                onChange={handleContinentFilterChange}
                                style={{paddingLeft:'px'}}
                                >   <MenuItem value='all' key="all">All Continents</MenuItem>
                                    {continents.map((continent) => {
                                        return(
                                            <MenuItem value={continent} key={continent}>{continent}</MenuItem>
                                        )
                                    })}
                                    
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Divider variant="middle" style={{marginTop:'1vh'}}/>
                </Grid>
                <Grid item xs={12} style={{paddingLeft:'1vh'}}>
                    <GridList 
                        style={{
                            width:'100%',
                            flexWrap: 'nowrap',
                            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
                            transform: 'translateZ(0)',
                            margin:'0',
                        }} 
                        cols={1}>
                        {countries.map((country,index) => {
                            return(
                                <GridListTile key={index} style={{height:'21vh'}}>
                                    <CountryCard title={country.title} image={country.image}/>
                                </GridListTile>
                            )
                        })}
                    </GridList>
                </Grid>    
            </Grid>
        </div>
    )
}