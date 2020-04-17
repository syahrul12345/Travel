import fetch from 'isomorphic-unfetch';
import axios from 'axios'

let baseurl =  ''
let imageBaseurl = ''

if (process.env.NODE_ENV == 'production') {
    baseurl = 'http://wp-headless:8080/'
    // Try to read from the environment. It would be ok if its in the docker image
    if(process.env.BASE_IMAGE_URL) {
        imageBaseurl = process.env.BASE_IMAGE_URL
    }else{
        imageBaseurl = 'http://127.0.0.1:8080/'
    }
    
}else{
    baseurl = 'http://127.0.0.1:8080/'
    imageBaseurl = 'http://127.0.0.1:8080/'
}

const populateCarousel = async() => {
    const res = await fetch(`${baseurl}wp-json/wp/v2/carousel`)
    const data = await res.json()
    const carouselData = data.map((carousel) => {
        let answer = {}
        try {
            answer = {
                text: carousel.title.rendered,
                textBlurb:(carousel.acf.excerpt).replace(/<[^>]*>?/gm, ''),
                image:carousel.acf.image.url,
                url:carousel.acf.url,
            }
            return answer
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
    
    const postData = data.map((post) => {
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
            return answer
        }
        finally {}
    })

    return {
        ok:true,
        data:postData
    }
   
    
}
const getNextPosts =async(pageID) => {
    return new Promise(async (resolve,reject) => {
        pageID = pageID + 1
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
    
    const destinationData = data.map((post) => {
        let answer = {}
        try {
            answer = {
                slug:post.slug,
                title:post.title.rendered,
                image:`${imageBaseurl}${post.acf.background_image.sizes['2048x2048'].replace(/^(?:\/\/|[^\/]+)*\//, "")}`,
                continent:post.acf.continent
            }
            return answer
        }
        finally {
            
        }
    })

    return{
        ok:true,
        data:destinationData
    }
}
const getDestinationBanner = async() => {
    const res = await fetch(`${baseurl}wp-json/wp/v2/banners?slug=destination`)
    const data = await res.json()
    const destinationBanner = data.map((banner) => {
        let answer = {}
        try{
            answer = {
                text:banner.acf.overlay_text,
                image:`${imageBaseurl}${banner.acf.image.sizes['2048x2048'].replace(/^(?:\/\/|[^\/]+)*\//, "")}`,
            }
            return answer
        }
        finally{}
    })
    return{
        ok:true,
        data:destinationBanner
    }
}

//@function Get the data of the requested page
const getCountryInfo = async(destination) => {
    destination = destination.replace(/\s+/g, '-')
    //get info about the country
    const res = await fetch(`${baseurl}wp-json/wp/v2/destinations?slug=${destination}`)
    const data = await res.json()

    //get all posts that are linked to this country
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
    //Log the categories
    const categoryRes = await fetch(`${baseurl}wp-json/wp/v2/categories`)
    let categories = await categoryRes.json()
    categories = categories.map((category) => {
        return{
            id:category.id,
            name:category.name,
        }
    })
    //add the posts information to the data
    data[0].acf.background_image.sizes['2048x2048'] = imageBaseurl + data[0].acf.background_image.sizes['2048x2048'].replace(/^(?:\/\/|[^\/]+)*\//, "")
    data[0].posts = posts
    data[0].categories = categories
    return data
}

//Get the related posts for a particular country
const getRelated = async(currentPostId,destination,relation) => {
    destination = destination.replace(/\s+/g, '-')
    const res = await fetch(`${baseurl}wp-json/wp/v2/destinations?slug=${destination}`)
    //  Link below for future use when we want to use country + category
    // const data = await res.json()
    // const catRes = await fetch(`${baseurl}wp-json/wp/v2/posts?filter[category_name]=${relation}&filter[meta_key]=country&filter[meta_compare]=LIKE&filter[meta_value]=${data[0].id}&per_page=6`)
    const catRes = await fetch(`${baseurl}wp-json/wp/v2/posts?filter[category_name]=${relation}&per_page=6`)
    const posts = await catRes.json()
    let cleanedRelated = []
    posts.forEach(post => {
        if (post.id != currentPostId) {
            cleanedRelated.push({
                id:post.id,
                title:post.title.rendered,
                link:post.link.replace(/^(?:\/\/|[^\/]+)*\//, ""),
                image:`${imageBaseurl}${post.acf.featured_image.sizes['2048x2048'].replace(/^(?:\/\/|[^\/]+)*\//, "")}`
            })
        }
    })
    return cleanedRelated
}

const getPostInfo = async(link) => {
    const slug = link.split('/')[2]
    const res = await fetch(`${baseurl}/wp-json/wp/v2/posts?slug=${slug}`)
    const relation = link.split('/')[1]
    const data = await res.json()
    const post = data[0]
    return await Promise.all([fetch(`${baseurl}wp-json/wp/v2/users/${post.author}`),fetch(`${baseurl}wp-json/wp/v2/destinations?include=${post.acf.country}`)])
        .then(async (res) => {
            const author = await res[0].json()
            const country = await res[1].json()
            post.acf.featured_image.sizes["2048x2048"] = imageBaseurl + post.acf.featured_image.sizes["2048x2048"].replace(/^(?:\/\/|[^\/]+)*\//, "")
            post["country"] = country[0].title.rendered
            post["author"] = author
            //Change to HTTPS. lol
            author.avatar_urls["96"] = author.avatar_urls["96"].slice(0,4) + "s" + author.avatar_urls["96"].slice(4)
            const relatedPosts = await getRelated(post.id,post["country"],relation)
            //lets get the related posts
            return {
                post,
                relatedPosts,
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
    let query = context.replace(/^\/|\/$/g, '');
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
    let continents = await continentRes.json()
    continents = continents.map((continent) => {
        return {
            slug:continent.slug,
            name:continent.title.rendered,
            text:continent.acf.overlay_text,
            image:`${imageBaseurl}${continent.acf.image.sizes.large.replace(/^(?:\/\/|[^\/]+)*\//, "")}`,
        }
    })
    return {
        ok:true,
        data:continents,
    }
}
const getPostsByCategory = async(category,amount) => {
    const postCategorized = await fetch(`${baseurl}wp-json/wp/v2/posts?filter[category_name]=${category}&page=1&per_page=${amount}`)
    const posts = await postCategorized.json()
    const cleanedPosts = posts.map((post) => {
        return {
            slug:post.slug,
            title:post.title.rendered,
            image:`${imageBaseurl}${post.acf.featured_image.sizes['2048x2048'].replace(/^(?:\/\/|[^\/]+)*\//, "")}`,
            link: post.link.replace(/^(?:\/\/|[^\/]+)*\//, ""),
        }
    })
    return cleanedPosts
}


const getFeatured = async() => {
    const featuredRes = await fetch(`${baseurl}wp-json/wp/v2/featured_categories`)
    let featured = await featuredRes.json()
    featured = featured.map((feat) => {
        return{
            slug:feat.slug,
            title:feat.title.rendered,
            excerpt:feat.acf.excerpt,
            image:`${imageBaseurl}${feat.acf.image.sizes['2048x2048'].replace(/^(?:\/\/|[^\/]+)*\//, "")}`,
        }
    })
    return {
        ok:true,
        data:featured
    }
}

const getFooterInfo = async(slug) => {
    const res = await fetch(`${baseurl}wp-json/wp/v2/pages?slug=${slug}`)
    const data = await res.json()
    return data[0]
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
    getFooterInfo
}
