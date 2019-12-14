import fetch from 'isomorphic-unfetch';
//const baseurl = 'http://52.220.139.249:8080/'
const baseurl = 'http://127.0.0.1:8080/'
const populateCarousel = async() => {
    const res = await fetch(`${baseurl}wp-json/wp/v2/carousel`)
    const data = await res.json()
    const carouselData = data.map((carousel) => ({
            text: carousel.title.rendered,
            textBlurb:(carousel.acf.excerpt).replace(/<[^>]*>?/gm, ''),
            image:carousel.acf.image.url,
            url:carousel.acf.url,
        }))
    return {
        data:carouselData
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
            data:postData
        }
    }
    catch(err){
        return {
            data:{"error":"Failed to populate post cards"}
        }
    }
    
    
}
module.exports = {populateCarousel,populatePosts}