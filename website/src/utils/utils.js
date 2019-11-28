import fetch from 'isomorphic-unfetch';
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
    const res = await fetch(`${baseurl}wp-json/wp/v2/posts`)
    const data = await res.json()
    try{
        const postData = data.map((post) => ({
            slug:post.slug,
            title:post.title.rendered,
            excerpt:post.acf.excerpt,
            image:post.acf.featured_image.sizes.medium_large
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
    const postsRes = await fetch(`${baseurl}wp-json/wp/v2/posts?country=${data[0].id}`)
    const posts = await postsRes.json()
    //add the posts information to the data
    data[0].posts = posts
    return data
}
module.exports = {
    populateCarousel,
    populatePosts,
    populateDestinations,
    getCountryInfo,
    getDestinationBanner}