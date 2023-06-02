import { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { LoadingContext } from "../context/loading.context";

const Profile = () => {
  const { user, userPosts, getUserPosts, getSinglePost, errorMessage } = useContext(LoadingContext);

  useEffect(() => {
    if (user && !userPosts.length) {
      getUserPosts(user._id);
    }
  }, [user]);

  return (
    <div>
      <h1>Profile</h1>

      {errorMessage && <p>{errorMessage}</p>}

      {user && (
        <div>
          <img id="profile-image" src={user.profilePic} alt="profile" />

          <br />

          {user.visitedCountries.length ? (
            <p>Visited Countries:{" "}{user.visitedCountries.map((country) => country.commonName).sort((a, b) => a.localeCompare(b)).join(", ")}</p>
          ) : (
            <p>No visited countries</p>
          )}

          <p>Name: {user.fullName}</p>
          <p>Age: {user.age}</p>
          <p>Location: {user.location}</p>

          <Link to={`/profile/${user._id}`}>
            <button>Update Profile</button>
          </Link>
        </div>
      )}

      <h4>Posts</h4>
      <Link to="/add-post">
        <button>Create new post</button>
      </Link>

      {userPosts.length ? (
        <div id="all-posts-container">
          {userPosts.map((post) => {
            return (
              <Link to={`/posts/${post._id}`} id="all-posts-link" key={post._id} onClick={()=>getSinglePost(userPosts, post._id)}>
                <img src={post.image} alt="post" />
                <div>
                  <h4 key={post._id}>{post.title}</h4>
                  <h5>Story about {post.country.commonName}</h5>
                  <p>Contributed by: {post.author.fullName}</p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p>No posts yet.</p>
      )}
    </div>
  );
};

export default Profile;
