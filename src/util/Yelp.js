const apiKey = 'cqeaX4U6jXswC6FC1c1tWmjoWqAT0OgwV99j0J6JZY6DURB7aiAT76jYoHWf9lr0zfB7nFY8QNqheCWnFYjlZDWxBCqoP87kcXIXGpIHhku0dbC0gcN19hxbsm3IWnYx';

const Yelp = {
  search(term, location, sortBy) {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    })
    .then( response => {
      return response.json();
    })
    //retrieve list of businesses
    .then(jsonResponse => {
      // check if jsonResponse has businesses, we don't want site to crash
      if(jsonResponse.businesses) {
        //Go through all business properties
        return jsonResponse.businesses.map(business => {
          return ({
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories,
            rating: business.rating,
            reviewCount: business.review_count
          });
        })
      }
    });
  }
};

export default Yelp;
