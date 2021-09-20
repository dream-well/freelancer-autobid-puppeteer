var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://www.freelancer.com/api/users/0.1/users',
  headers: { },
  params: {
    avatar: true,
    cover_image: true,
    display_info: true,
    country_details: true,
    jobs: true,
    portfolio_details: true,
    preferred_details: true,
    profile_description: true,
    qualification_details: true,
    recommendations: true,
    responsiveness: true,
    status: true,
    users: [
      '51961178'],
    webapp: 1,
    compact: true,
    new_errors: true,
    new_pools: true,
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
