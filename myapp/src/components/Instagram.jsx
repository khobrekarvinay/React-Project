import axios from 'axios';
import React, { useState } from 'react';
import "./Insta.css";

function InstagramApp() {
  const [userid, setUserid] = useState('');
  const [data, setData] = useState(null);

  const scraper = async (userid) => {
    
    const options = {
        method: 'GET',
        url: 'https://instagram-scraper-2022.p.rapidapi.com/ig/reels_posts/',
        params: {
          id_user: userid
        },
        headers: {
          'x-rapidapi-key': 'aee2941e2dmsh0f034055db304a6p1cd3fbjsnbf54328ed76b',
          'x-rapidapi-host': 'instagram-scraper-2022.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
      } catch (error) {
          console.error(error);
      }
  };

  return (
    <div className="instagram-scraper">
      <h1>Instagram Scraper</h1>
      <form onSubmit={scraper}>
        <input
          type="text"
          placeholder="Enter URL or ID"
          value={userid}
          onChange={(event) => setUserid(event.target.value)}
        />
        <button type="submit">Scrape</button>
      </form>
      {data && (
        <div>
          <h2>Scraped Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default InstagramApp;