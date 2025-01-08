import React, { useEffect } from 'react'
import "../css/Profile.css"
import { useState } from 'react'
import PostDetail from './PostDetail'
import ProfilePic from '../screens/ProfilePic'

const Profile = () => {
   var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false)
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("")
  const [changePic, setChangePic] = useState(false)

  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setPosts(posts);
    }
  };

  const changeprofile = () => {
    if (changePic) {
      setChangePic(false)
    } else {
      setChangePic(true)
    }
  }

  useEffect(() => {
    fetch(`/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPic(result.posts);
        setUser(result.user);
        console.log(pic)
      })
      .catch((err) => console.log(err));
  }, []);



  return (
    <div className='profile'>
      <div className="profile-frame">
        <div className="profile-pic">
          <img
            onClick={changeprofile}
            src={user.Photo ? user.Photo : picLink}
            alt="Image Description"
          />
        </div>

        <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className="profile-info ">
            <p>{pic ? pic.length : "0"} posts</p>
            <p>{user.followers ? user.followers.length : "0"} followers</p>
            <p>{user.following ? user.following.length : "0"} following</p>
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
        {pic.map((pics) => {
          return <img key={pics._id} src={pics.photo}
            onClick={() => {
              toggleDetails(pics)
            }}
            className="item"></img>;
        })}
      </div>
      {show &&
        <PostDetail item={posts} toggleDetails={toggleDetails} />
      }
      {
        changePic &&
        <ProfilePic changeprofile={changeprofile} />
      }

    </div>
  )
}

export default Profile