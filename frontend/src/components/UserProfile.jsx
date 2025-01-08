import React, { useEffect } from 'react'
import "../css/Profile.css"
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const UserProfile = () => {
   var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  const { userid } = useParams();
  const [isFollow, setIsFollow] = useState(false);
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);

  const followUser = (userId) => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsFollow(true);
      });
  };

  const unfollowUser = (userId) => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        followId: userId
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setIsFollow(!isFollow)
      })
  }

  useEffect(() => {
    console.log(localStorage.getItem("jwt"));
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPosts(result.posts);
        setUser(result.user);
        if (result.user.followers.includes(JSON.parse(localStorage.getItem("user"))._id)) {
          setIsFollow(true);
        }
      })
  }, [isFollow]);



  return (
    <div className='profile'>
      <div className="profile-frame">
        <div className="profile-pic">
          <img
            src={user.Photo ? user.Photo : picLink}
            alt="Image Description"
          />
        </div>

        <div className="profile-data">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <h1>{user.name}</h1>
            <button className='followBtn'
              onClick={() => {
                if (isFollow) {
                  unfollowUser(user._id)
                } else {
                  followUser(user._id)
                }
              }}
            >
              {isFollow ? "Unfollow" : "Follow"}
            </button>
          </div>
          <div className="profile-info ">
            <p>{posts.length} posts</p>
            <p > {user.followers?user.followers.length:"0"} followers</p>
            <p > {user.following?user.following.length:"0" } following</p>
          </div>
        </div>
      </div>


      <hr style={{
        width: "90%",
        margin: "auto",
        opacity: "0.8",
        margin: "25px auto"
      }} />

      <div className="gallery">
        {posts.map((pics) => {
          return (
            <img
              key={pics._id}
              src={pics.photo}
              // onClick={() => {
              //     toggleDetails(pics)
              // }}
              className="item"
            ></img>
          );
        })}
      </div>
      {/* {show &&
                <PostDetail item={posts} toggleDetails={toggleDetails} />
            } */}
      {/* {
        changePic &&
        <ProfilePic changeprofile={changeprofile} />
      } */}

    </div>
  )
}

export default UserProfile