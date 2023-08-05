'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import './feedpage.css';

const CustomInfiniteScroll = (props: any) => {
  return <InfiniteScroll {...props}>{props.children}</InfiniteScroll>;
};

const UnsplashPhotos = () => {
  const [photos1, setPhotos1] = useState<any[]>([]);
  const [currentuser, setcurrentuser] = useState<string | null>(null);

  useEffect(() => {
    fetchPhotos();
    
  }, []);

  const removeVar = () => {
    setcurrentuser(null);
  };

  const fetchPhotos1 = async () => {
    try {
      const ACCESS_KEY = 'XL8-E7k4J0xf9NggXm4Eh9EP7wqKgA3-vK5TsHGlRFk';
      const response = await axios.get(
        `https://api.unsplash.com/photos/random/?client_id=${ACCESS_KEY}&count=30&username=${currentuser}`
      );
      setPhotos1((prevPhotos: any[]) => [...prevPhotos, ...response.data]);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const fetchPhotos = async () => {
    try {
      const ACCESS_KEY = 'XL8-E7k4J0xf9NggXm4Eh9EP7wqKgA3-vK5TsHGlRFk';
      const perPage = 10;
      const response = await axios.get(
        `https://api.unsplash.com/photos/random/?client_id=${ACCESS_KEY}&page=${photos1.length / perPage + 1}&per_page=${perPage}&count=30`
      );

      // Check if the API response is empty
      if (response.data.length === 0) {
        // If empty, do nothing and return
        return;
      }

      // Check if photos1 state is empty, meaning it's the initial load
      if (photos1.length === 0) {
        // Set the API response directly to photos1 on initial load
        setPhotos1(response.data);
      } else {
        // If photos1 state is not empty (already loaded photos), cache the API response for 10 seconds
        const newPhotos = [...photos1, ...response.data];
        setPhotos1(newPhotos);

        // Use setTimeout to remove the cached photos after 10 seconds
        setTimeout(() => {
          setPhotos1(photos1);
        }, 10000);
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const handleClick = (username: string) => {
    setcurrentuser(username);
    fetchPhotos1();
  };

  return (
    <div className="unsplash-container">
      {!currentuser ? (
        <div>
          <h1 id="instafeed" style={{ color: 'black' }}>
            INSTAGRAM FEED
          </h1>
          <CustomInfiniteScroll
            dataLength={photos1.length}
            next={fetchPhotos}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            <div className="unsplash-grid">
              {photos1.map((photo) => (
                <div key={photo.id} className="unsplash-photo">
                  <img src={photo.urls.small} alt={photo.alt_description} />
                  <div onClick={() => handleClick(photo.user.username)} className="photo-details">
                    <p style={{ color: 'black' }} className="username">
                      {photo.user.username}
                    </p>
                    <div className="likes">
                      <span>{photo.user.total_likes}</span> likes
                    </div>
                    <p className="description">{photo.description || 'N/A'}</p>
                    <p className="bio">{photo.user.bio || 'N/A'}</p>
                  </div>
                </div>
              ))}
            </div>
          </CustomInfiniteScroll>
        </div>
      ) : (
        <div className="unsplash-container">
          <button
            id="gobackbutton"
            style={{ padding: '5px', margin: '10px', color: 'red', display: 'flex' }}
            onClick={() => removeVar()}
          >
            Go Back To Feed
          </button>
          <h1 style={{ height: '15px', color: 'red' }}>USER:{currentuser}</h1>
          <div className="unsplash-grid">
            {photos1.map((photo) => (
              <div key={photo.id} className="unsplash-photo">
                <img src={photo.urls.small} alt={photo.alt_description} />
                <div className="photo-details">
                  <p style={{ color: 'black' }} className="username">
                    {currentuser}
                  </p>
                  <div className="likes">
                    <span>{photo.user.total_likes}</span> likes
                  </div>
                  <p className="description">{photo.description || 'N/A'}</p>
                  <p className="bio">{photo.user.bio || 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnsplashPhotos;
