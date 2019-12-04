import fetch from 'isomorphic-unfetch';
import axios from 'axios'
//const baseurl = 'http://52.220.139.249:8080/'
const baseurl = 'http://localhost:8080/'
const populateCarousel = async() => {
    const res = await fetch(`${baseurl}wp-json/wp/v2/carousel`)
    const data = await res.json()
    try{
        const carouselData = data.map((carousel) => ({
            text: carousel.title.rendered,
            textBlurb:(carousel.acf.excerpt).replace(/<[^>]*>?/gm, ''),
            image:carousel.acf.image.url,
            url:carousel.acf.url,
        }))
        return {
            ok:true,
            data:carouselData
        }
    }catch(err){
        return {
            ok:false,
            data:{"error":"Failed to populate post cards"}
        }
    }
    
}
  
const populatePosts = async() => {
    const res = await Promise.all([ fetch(`${baseurl}wp-json/wp/v2/posts?page=1&per_page=6`),fetch(`${baseurl}wp-json/wp/v2/destinations`)])
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
            image:post.acf.featured_image.sizes.medium_large,
            link:post.link.replace(/^(?:\/\/|[^\/]+)*\//, ""),
            country:destinationMap[post.acf.country]
        }))
        return {
            ok:true,
            data:postData
        }
    }
    catch(err){
        return {
            ok:false,
            data:{"error":"Failed to populate post cards"}
        }
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
                image:post.acf.featured_image.sizes.medium_large,
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
    const res = await fetch(`${baseurl}wp-json/wp/v2/destinations`)
    const data = await res.json()
    try{
        const destinationData = data.map((post) => ({
            slug:post.slug,
            title:post.title.rendered,
            image:post.acf.background_image.sizes.medium_large,
            continent:post.acf.continent
        }))
        return{
            ok:true,
            data:destinationData
        }
    }
    catch(err){
        return{
            ok:false,
            data:{"error":err.toString()}
        }
    }
}
const getDestinationBanner = async() => {
    const res = await fetch(`${baseurl}wp-json/wp/v2/banners?slug=destination`)
    const data = await res.json()
    try{
        const destinationBanner = data.map((banner) => ({
            text:banner.acf.overlay_text,
            image:banner.acf.image.sizes.large
        }))
        return{
            ok:true,
            data:destinationBanner
        }
    }catch(err){
        return{
            ok:false,
            data:{"error":err.toString()}
        }
    }
}

//@function Get the data of the requested page
const getCountryInfo = async(destination) => {
    destination = destination.replace(/\s+/g, '-')
    //get info about the country
    const res = await fetch(`${baseurl}wp-json/wp/v2/destinations?slug=${destination}`)
    const data = await res.json()

    //get all posts that are linked to this country
    const postsRes = await fetch(`${baseurl}wp-json/wp/v2/posts?filter[meta_key]=country&filter[meta_compare]=LIKE&filter[meta_value]=${data[0].id}`)
    let posts = await postsRes.json()
    posts = posts.map((post) => {
        return{
            slug:post.slug,
            title:post.title.rendered,
            id:post.id,
            image:post.acf.featured_image.sizes.large,
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
    data[0].posts = posts
    data[0].categories = categories
    return data
}

const getPostInfo = async(link) => {
    const res = await fetch(`${baseurl}${link}`)
    const post = await res.json()
    return await Promise.all([fetch(`${baseurl}wp-json/wp/v2/users/${post.author}`),fetch(`${baseurl}wp-json/wp/v2/destinations?include=${post.acf.country}`)])
        .then(async (res) => {
            const author = await res[0].json()
            const country = await res[1].json()
            post["country"] = country[0].title.rendered
            post["author"] = author
            return {
                post
            }
        }).catch((err) => {
            console.log("it errored")
            console.log(err)
            return {
                post
            }
        })
}

const getContextPosts = async(context) => {
    const query = context.replace(/^\/|\/$/g, '');
    return await Promise.all([fetch(`${baseurl}wp-json/wp/v2/posts?filter[category_name]=${query}`),fetch(`${baseurl}wp-json/wp/v2/destinations`)])
        .then(async(res) => {
            let posts = await res[0].json()
            const destinationData = await res[1].json()
            const destinationMap = {}
            destinationData.forEach((destination) => {
                destinationMap[destination.id] = destination.slug
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
                    country:destinationMap[post.acf.country],
                }
            })
            return posts
        })
        .catch((err) => {
            console.log(err.toString())
            return {}
        })
}
module.exports = {
    populateCarousel,
    populatePosts,
    populateDestinations,
    getCountryInfo,
    getDestinationBanner,
    getNextPosts,
    getPostInfo,
    getContextPosts
}