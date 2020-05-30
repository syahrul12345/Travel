/* eslint-disable prefer-destructuring */
import fetch from 'isomorphic-unfetch';

let baseurl =  ''
let imageBaseurl = ''

if (process.env.NODE_ENV == 'production') {
    baseurl = process.env.WORDPRESS_URL
    // Try to read from the environment. It would be ok if its in the docker image
    if(process.env.BASE_IMAGE_URL) {
        imageBaseurl = process.env.BASE_IMAGE_URL
    }else{
        imageBaseurl = 'https://api.smolidays.com/'
    }
    
}else{
    // baseurl = 'http://127.0.0.1:8080/'
    // imageBaseurl = 'http://127.0.0.1:8080/'
    baseurl = 'https://api.smolidays.com/'
    imageBaseurl = 'https://api.smolidays.com/'
}

const formatDate = (input) => {
    const d = new Date(input)
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const month = d.getMonth()
    const day = d.getDate()
    const year = d.getFullYear().toString().substr(2)
    return `${day  } ${  monthNames[month]  } 20${  year}`
}

const populateCarousel = async() => {
    const res = await fetch(`${baseurl}wp-json/wp/v2/carousel`)
    const data = await res.json()
    const carouselData = []
    data.map((carousel) => {
        let answer = {}
        try {
            answer = {
                text: carousel.title.rendered,
                textBlurb:(carousel.acf.excerpt).replace(/<[^>]*>?/gm, ''),
                image:carousel.acf.image.url,
                url:carousel.acf.url,
            }
            carouselData.push(answer)
        }
        finally{}
    })
    return {
        ok:true,
        data:carouselData
    }
    
}
  
const populatePosts = async(count) => {
    const res = await Promise.all([ fetch(`${baseurl}wp-json/wp/v2/posts?page=1&per_page=${count}`),fetch(`${baseurl}wp-json/wp/v2/destinations?page=1&per_page=100`)])
    const data = await res[0].json()
    const destinationData = await res[1].json()
    
    const destinationMap = {}
    destinationData.forEach((destination) => {
        destinationMap[destination.id] = {
            slug:destination.slug,
            title:destination.title.rendered
        }
    })
    const postData = []
    data.map((post) => {
        // Safety for msising slugsknee
        let answer = {}
        try {
            answer = {
                slug:post.slug,
                title:post.title.rendered,
                excerpt:post.acf.excerpt,
                image:`${imageBaseurl}${post.acf.featured_image.sizes['2048x2048'].replace(/^(?:\/\/|[^\/]+)*\//, "")}`,
                link:post.link.replace(/^(?:\/\/|[^\/]+)*\//, ""),
                category:post.categories,
                country:destinationMap[post.acf.country].slug,
                country_normal:destinationMap[post.acf.country].title 
            }
            postData.push(answer)
        }
        catch{
            console.log(`One or more missing parameters from ${post.title.rendered}`)
        }
        finally {}
    })
    return {
        ok:true,
        data: postData.length > 6 ? postData.slice(0,6) : postData
    }
   
    
}
const getNextPosts =async(pageID) => {
    return new Promise(async (resolve,reject) => {
        pageID += 1
        const res = await Promise.all([ fetch(`${baseurl}wp-json/wp/v2/posts?page=${pageID}&per_page=6`),fetch(`${baseurl}wp-json/wp/v2/destinations`)])
        const data = await res[0].json()
        const destinationData = await res[1].json()
        const destinationMap = {}
        destinationData.forEach((destination) => {
            destinationMap[destination.id] = destination.slug
        })
        try{
            const postData = data.map((post) => ({
                slug:post.slug,
                title:post.title.rendered,
                excerpt:post.acf.excerpt,
                image:`${imageBaseurl}${post.acf.featured_image.sizes['2048x2048'].replace(/^(?:\/\/|[^\/]+)*\//, "")}`,
                link:post.link.replace(/^(?:\/\/|[^\/]+)*\//, ""),
                country:destinationMap[post.acf.country]
            }))
            resolve(postData)
        }
        catch(err){
            const failObj = {
                ok:false,
                data:{"error":erro.toString()}
            }
            reject(failObj)

        }
    })
}
// @function THis function is to populate the destination page with the country cards
const populateDestinations = async () => {
    const res = await fetch(`${baseurl}wp-json/wp/v2/destinations?per_page=100`)
    const data = await res.json()
    
    const destinationData = []
    data.map((post) => {
        let answer = {}
        try {
            answer = {
                slug:post.slug,
                title:post.title.rendered,
                image:`${imageBaseurl}${post.acf.background_image.sizes.medium.replace(/^(?:\/\/|[^\/]+)*\//, "")}`,
                continent:post.acf.continent
            }
            destinationData.push(answer)
        }
        catch (e){
            console.log(`Failed to poplate destiantion for ${post.title.rendered} as : ${e.toString()}`)
        }
        finally {}
        
    })

    return{
        ok:true,
        data:destinationData
    }
}
const getDestinationBanner = async() => {
    const res = await fetch(`${baseurl}wp-json/wp/v2/banners?slug=destination`)
    const data = await res.json()
    const destinationBanner = []
    data.map((banner) => {
        try{
            let answer = {}
            answer = {
                text:banner.acf.overlay_text,
                image:`${imageBaseurl}${banner.acf.image.sizes['2048x2048'].replace(/^(?:\/\/|[^\/]+)*\//, "")}`,
            }
            destinationBanner.push(answer)
        }
        catch {}
    })
    return{
        ok:true,
        data:destinationBanner
    }
}

// @function Get the data of the requested page
const getCountryInfo = async(destination) => {
    destination = destination.replace(/\s+/g, '-')
    // get info about the country
    const res = await fetch(`${baseurl}wp-json/wp/v2/destinations?slug=${destination}`)
    const data = await res.json()

    // get all posts that are linked to this country
    const postsRes = await fetch(`${baseurl}wp-json/wp/v2/posts?filter[meta_key]=country&filter[meta_compare]=LIKE&filter[meta_value]=${data[0].id}&per_page=30`)
    let posts = await postsRes.json()
    
    posts = posts.map((post) => {
        return{
            slug:post.slug,
            title:post.title.rendered,
            id:post.id,
            image:`${imageBaseurl}${post.acf.featured_image.sizes['2048x2048'].replace(/^(?:\/\/|[^\/]+)*\//, "")}`,
            link:post.link.replace(/^(?:\/\/|[^\/]+)*\//, ""),
            category:post.categories
        }
    })
    // Log the categories
    const categoryRes = await fetch(`${baseurl}wp-json/wp/v2/categories`)
    let categories = await categoryRes.json()
    categories = categories.map((category) => {
        return{
            id:category.id,
            name:category.name,
        }
    })
    // add the posts information to the data
    data[0].acf.background_image.sizes['2048x2048'] = imageBaseurl + data[0].acf.background_image.sizes['2048x2048'].replace(/^(?:\/\/|[^\/]+)*\//, "")
    data[0].posts = posts
    data[0].categories = categories
    return data
}

// Get the related posts for a particular country
const getRelatedCountry = async(currentPostId,destination,relation) => {
    destination = destination.replace(/\s+/g, '-')
    const res = await fetch(`${baseurl}wp-json/wp/v2/destinations?slug=${destination}`)
    //  Link below for future use when we want to use country + category
    const data = await res.json()
    const catRes = await fetch(`${baseurl}wp-json/wp/v2/posts?filter[category_name]=${relation}&filter[meta_key]=country&filter[meta_compare]=LIKE&filter[meta_value]=${data[0].id}&per_page=6`)
    // const catRes = await fetch(`${baseurl}wp-json/wp/v2/posts?filter[category_name]=${relation}&per_page=6`)
    const posts = await catRes.json()
    const cleanedRelated = []
    posts.forEach(post => {
        if (post.id != currentPostId) {
            try {
                cleanedRelated.push({
                    id:post.id,
                    title:post.title.rendered,
                    link:post.link.replace(/^(?:\/\/|[^\/]+)*\//, ""),
                    image:`${imageBaseurl}${post.acf.featured_image.sizes['2048x2048'].replace(/^(?:\/\/|[^\/]+)*\//, "")}`
                })
            }catch{}
            finally{}
        }
    })
    return cleanedRelated
}

const getRelated = async(currentPostId,relation) => {
    const catRes = await fetch(`${baseurl}wp-json/wp/v2/posts?filter[category_name]=${relation}&per_page=6`)
    const posts = await catRes.json()
    const cleanedRelated = []
    posts.forEach(post => {
        if (post.id != currentPostId) {
            try {
                cleanedRelated.push({
                    id:post.id,
                    title:post.title.rendered,
                    link:post.link.replace(/^(?:\/\/|[^\/]+)*\//, ""),
                    image:`${imageBaseurl}${post.acf.featured_image.sizes['2048x2048'].replace(/^(?:\/\/|[^\/]+)*\//, "")}`
                })
            }catch (err){
                console.log(`Trying to put ${post.title.rendered} as a related post for ${currentPostId} but failed as ${err.toString()}`)
            }
            finally{}
        }
    })
    return cleanedRelated
}

const getPostInfo = async(link,newBaseUrl) => {
    // The slug might be a subcategory
    if (baseurl === undefined) {
        baseurl = newBaseUrl
    }
    const linkArray = link.split('/')
    let slug = ''
    let relation = ''
    if (linkArray.length == 4) {
        slug = linkArray[2]
        relation = linkArray[1]
    } else if (linkArray.length == 5){
        slug = linkArray[3]
        relation = linkArray[2]
    }
    const res = await fetch(`${baseurl}/wp-json/wp/v2/posts?slug=${slug}`)
    const data = await res.json()
    const post = data[0]
    let relatedPosts = []
    
    return await Promise.all([fetch(`${baseurl}wp-json/wp/v2/users/${post.author}`),fetch(`${baseurl}wp-json/wp/v2/destinations?include=${post.acf.country}`),fetch(`${baseurl}wp-json/wp/v2/categories`)])
        .then(async (res) => {
            const author = await res[0].json()
            const country = await res[1].json()
            let categories = await res[2].json()
            categories = categories.map((category) => {
                return{
                    id:category.id,
                    name:category.name,
                }
            })

            post.acf.featured_image.sizes["2048x2048"] = imageBaseurl + post.acf.featured_image.sizes["2048x2048"].replace(/^(?:\/\/|[^\/]+)*\//, "")
            try {
                post.country = country[0].title.rendered
            } catch(err) {
                console.log(`Error In page: ${post.title.rendered} during rendering when trying to get country`)
                post.country = null
            }
            try {
                // Some types need to get relation by country
                if (post.country && (relation === 'guides' || relation === 'itineraries' || relation === 'food' || relation === 'cabin-life' || relation === 'lifestyle')) {
                    console.log(`Getting related posts for ${post.title.rendered} with country :${post.country} and relation: ${relation}`)
                    relatedPosts = await getRelatedCountry(post.id, country[0].title.rendered, relation)
                }else { 
                    relatedPosts = await getRelated(post.id,relation)
                }
            } catch (err){
                console.log(`Failed to get related posts ${post.title.rendered} due to ${err.toString()}`)
            }
            try {
                post.author = author
                author.avatar_urls["96"] = `${author.avatar_urls["96"].slice(0,4)  }s${  author.avatar_urls["96"].slice(4)}`
            } catch {}
            finally{}
            // lets get the related posts
            return {
                post,
                relatedPosts,
                categories
            }
        }).catch((err) => {
            console.log(`Error when loading post page for post ${link}`)
            console.log(err)
            return {
                post
            }
        })
}

const getContextPosts = async(context) => {
    const query = context.replace(/^\/|\/$/g, '');
    return await Promise.all([fetch(`${baseurl}wp-json/wp/v2/posts?filter[category_name]=${query}`),fetch(`${baseurl}wp-json/wp/v2/destinations?page=1&per_page=100`)])
        .then(async(res) => {
            let posts = await res[0].json()
            const destinationData = await res[1].json()
            const destinationMap = {}
            destinationData.forEach((destination) => {
                
                destinationMap[destination.id] = {
                    slug:destination.slug,
                    title:destination.title.rendered,
                }
            })
            posts = posts.map((post) => {
                return {
                    slug:post.slug,
                    title:post.title.rendered,
                    id:post.id,
                    image:post.acf.featured_image.sizes.large,
                    link:post.link.replace(/^(?:\/\/|[^\/]+)*\//, ""),
                    excerpt:post.acf.excerpt,
                    category:post.categories,
                    country:destinationMap[post.acf.country].slug,
                    country_normal:destinationMap[post.acf.country].title

                }
            })
            return posts
        })
        .catch((err) => {
            return {}
        })
}

const getLatestPosts = async(page) => {
    if (baseurl === undefined) {
        baseurl = "https://api.smolidays.com/"
    }
    
    const res = await fetch(`${baseurl}wp-json/wp/v2/posts?page=${page}&per_page=6`)
    const posts = await res.json()
    const cleanedPosts = []
    posts.map((post) => {
        try {
            const answer = {
                title: post.title.rendered,
                image: post.acf.featured_image.sizes.large,
                link: post.link.replace(/^(?:\/\/|[^\/]+)*\//, ""),
                date: formatDate(post.date),
            }
            cleanedPosts.push(answer)
        }
        catch (err) {
            console.log(`Failed to show ${post.title.rendered} in latest posts as it is ${err.toString()}`)
        }
    })

    return {
        data:cleanedPosts
    }
}

const getCategories = async() => {
    const categoryRes = await fetch(`${baseurl}wp-json/wp/v2/categories`)
    let categories = await categoryRes.json()
    categories = categories.map((category) => {
        return{
            id:category.id,
            name:category.name,
        }
    })
    return categories
}
const populateContinents = async() => {
    const continentRes = await fetch(`${baseurl}wp-json/wp/v2/continent`)
    const continents = await continentRes.json()
    const continentsList = []
    continents.map((continent) => {
        try {
            const answer = {
                slug:continent.slug,
                name:continent.title.rendered,
                text:continent.acf.overlay_text,
                image:`${imageBaseurl}${continent.acf.image.sizes.large.replace(/^(?:\/\/|[^\/]+)*\//, "")}`,
            }
            continentsList.push(answer)
        }
        catch {}
        finally {}
    })
    return {
        ok:true,
        data:continentsList,
    }
}
const getPostsByCategory = async(category,amount) => {
    const postCategorized = await fetch(`${baseurl}wp-json/wp/v2/posts?filter[category_name]=${category}&page=1&per_page=${amount}`)
    const posts = await postCategorized.json()
    const cleanedPosts = []
    posts.map((post) => {
        try {
            const answer = {
                slug:post.slug,
                title:post.title.rendered,
                image:`${imageBaseurl}${post.acf.featured_image.sizes['2048x2048'].replace(/^(?:\/\/|[^\/]+)*\//, "")}`,
                link: post.link.replace(/^(?:\/\/|[^\/]+)*\//, ""),
                date: formatDate(post.date),
            }
            cleanedPosts.push(answer)
        }
        catch {
            console.log(`Error occured when trying to get post ${post.title.rendered} with category ${category} due to missing aprams`)
        }
        
    })
    return cleanedPosts
}


const getFeatured = async() => {
    const featuredRes = await fetch(`${baseurl}wp-json/wp/v2/featured_categories`)
    const featured = await featuredRes.json()
    const featuredList = []
    featured.map((feat) => {
        try {
            const answer = {
                slug:feat.slug,
                title:feat.title.rendered,
                excerpt:feat.acf.excerpt,
                image:`${imageBaseurl}${feat.acf.featured_image.sizes['2048x2048'].replace(/^(?:\/\/|[^\/]+)*\//, "")}`,
            }
            featuredList.push(answer)
        }
        catch {}
        finally {}
    })
    return {
        ok:true,
        data:featuredList
    }
}

const getFooterInfo = async(slug) => {
    const res = await fetch(`${baseurl}wp-json/wp/v2/pages?slug=${slug}`)
    const data = await res.json()
    return data[0]
}

const searchPosts = async(query) => {
    const res = await fetch(`https://api.smolidays.com/wp-json/wp/v2/search?per_page=6&page=1&subtype=post&search=${query}`)
    const data = await res.json()
    const promiseArray = []
    data.forEach(({title,url}) => {
        console.log(`Pushing search for ${title}`)
        promiseArray.push(getPostInfo(`${url.replace(/^(?:\/\/|[^\/]+)*\//, "")}`,"https://api.smolidays.com"))
    })
    console.log("Waiting for all searches to be resolved")
    const promiseArrayRes = await Promise.all(promiseArray)
    console.log("ALl searches resolved")
    return { posts: promiseArrayRes }
}

module.exports = {
    populateCarousel,
    populatePosts,
    populateDestinations,
    getCountryInfo,
    getDestinationBanner,
    getNextPosts,
    getPostInfo,
    getContextPosts,
    getCategories,
    populateContinents,
    getFeatured,
    getPostsByCategory,
    getFooterInfo,
    getLatestPosts,
    searchPosts,
}
