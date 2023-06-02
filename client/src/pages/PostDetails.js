import _ from 'lodash'

import { cloneDeep } from 'lodash'

import { useContext, useEffect, useState, useMemo } from "react"
import { useParams, Link } from "react-router-dom"

import { LoadingContext } from "../context/loading.context"

import AddComment from '../components/AddComment'

import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import { useMap } from "react-leaflet/hooks";

import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline'

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import { returnReadableTime, returnRelativeTime } from "../services/time"

import { get, post } from "../services/authService";

import { returnReadableTimeShort } from "../services/time";


const PostDetails = () => {

    // const [mapPosition, setMapPosition] = useState(null)
    const [comment, setComment] = useState({comment: '', author: ""})


    const { singlePost, getSinglePost, user, setSinglePost, posts, getPosts, mapPosition } = useContext(LoadingContext)

    const { id } = useParams()

    let myIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        iconSize: [22, 36],
        iconAnchor: [11, 18],
        className: "marker",
      });
    
    const ChangeMapView = ({ coords }) => {
    const map = useMap();
    map.setView(coords, map.getZoom());

    return null;
    };

    const submitComment = (e) => {
        e.preventDefault()

        post(`/comments/new-comment/${user._id}/${id}`, comment)
            .then((results) => {
                console.log("new comment", results.data)
                // let newArray = [...singlePost.comments, results.data]
                setSinglePost(results.data)
                setComment({comment: '', author: ""})
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                console.log("Single post", singlePost)
            })
    }

    const returnLike = (post) => {
        
        return post.likes.some(like => like._id === user?._id)
    }

    const toggleLike = (post) => {

        if (!returnLike(post)) {
            console.log("line 78")
            get(`/likes/add-like/${post._id}`)
                .then((results) => {
                    console.log(results.data)
                    setSinglePost(results.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            get(`/likes/remove-like/${post._id}`)
                .then((results) => {
                    console.log(results.data)
                    setSinglePost(results.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }

    const likedBy = (array) => {
        let likesArray = _.cloneDeep(array)
        let reversed = likesArray.reverse()
        console.log("REversed?")
        if (reversed.length > 2) {
            return `Liked by ${reversed[0].fullName}, ${reversed[1].fullName} & ${reversed.length - 2} more...`
        } else if (reversed.length === 2) {
            return `Liked by ${reversed[0].fullName} & ${reversed[1].fullName}`
        } else {
            return `Liked by ${reversed[0].fullName}`
        }
    }


    // useEffect(() => {

    //     if (posts.length) {
    //         let thisPost = posts.find((element) => element._id === id)
    //         setSinglePost(thisPost)
    //     } else {
    //         getSinglePost(id)
    //     }

  


    //     // if (!posts.length) {
    //     //     // getPosts()
    //     //     get(`/posts/detail/${id}`)
    //     //     .then((results) => {
    //     //         console.log("single post", results.data)
    //     //         setSinglePost(results.data)
    //     //         let position = [results.data.country.coordinates[0], results.data.country.coordinates[1]];
    //     //         setMapPosition(position)
    //     //     })
    //     //     .catch((err) => {
    //     //         console.log(err)
    //     //     })
    //     // } else {
    //     //     let thisPost = posts.find((element) => element._id === id)
    //     //     setSinglePost(thisPost)
    //     //     let position = [thisPost.country.coordinates[0], thisPost.country.coordinates[1]];
    //     //     setMapPosition(position)
    //     // }

    //     // return () => {
    //     //     setSinglePost(null)
    //     // }
    
    // }, [])

    useEffect(() => {
        if (!singlePost || singlePost._id !== id) {
         getSinglePost(posts, id)
        }
        
    }, [])
    // useEffect(() => {
    //     if (!singlePost || singlePost._id !== id) {
    //         // let thisPost = posts.find((element) => element._id === id)
    //         // setSinglePost(thisPost)
            
    //         getSinglePost(posts, id)
    //     }
        
    //     // window.scrollTo(0,0)
    //     // else {
    //     // }
    // }, [])

    // useEffect(() => {
    //     if (singlePost) {
    //         let position = [singlePost.country.coordinates[0], singlePost.country.coordinates[1]];
    //         setMapPosition(position);
    //     }
    // }, [singlePost])

    // mapPosition && singlePost.likes.length && singlePost.comments.length

  return (
    <>
      {singlePost ? (
        <div>
          <h1>Post Details</h1>

          {singlePost.author._id === user._id && <Link to={`/edit-post/${singlePost._id}`}><button>Edit Post</button></Link>}

          <div>
            <img src={singlePost.image} alt="post" style={{ height: "40vh" }} />

              <div id="map-container">
                <MapContainer
                  id="map"
                  center={singlePost.country.coordinates}
                  zoom={4}
                  scrollWheelZoom={false}
                  
                  
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    style={{width: '30vw'}}
                  />
                  {/* <GeoJSON type="Feature" /> */}
                  <Marker position={singlePost.country.coordinates} icon={myIcon} >
                    <Popup>
                      <span>Location of {singlePost.country.commonName}</span>
                    </Popup>
                  </Marker>
                  <ChangeMapView coords={singlePost.country.coordinates} />
                </MapContainer>
              </div>

          </div>

          <h2>{singlePost.title}</h2>
          <h3>{singlePost.country.commonName}</h3>

          <p>
            Posted {returnRelativeTime(singlePost.createdAt)} on{" "}
            {returnReadableTime(singlePost.createdAt)}
          </p>

          <p>
            Contributed by:{" "}
            <span>
              <Link>{singlePost.author.fullName}</Link>
            </span>
          </p>

          <p style={{ whiteSpace: "pre-wrap" }}>{singlePost.story}</p>

          <h6>Likes:</h6>

          <button onClick={() => toggleLike(singlePost)}>
            {returnLike(singlePost) ? (
              <HeartIconSolid
                style={{ color: "red" }}
                className="mr-1 h-5 w-5 text-danger"
              />
            ) : (
              <HeartIconOutline className="mr-1 h-5 w-5 text-danger" />
            )}
          </button>


     {singlePost.likes.length ? (
       <p>{likedBy(singlePost.likes)} </p>
     ) : (
       <p>No likes yet...</p>
     )}


          <h6>Comments:</h6>

          <AddComment
            comment={comment}
            setComment={setComment}
            submitComment={submitComment}
          />


            <>
              {singlePost.comments.map((comment) => {
                return (
                  <div key={comment._id}>
                    <p>{comment.comment}</p>
                    <p>- {comment.author.fullName}</p>
                    <p>{returnReadableTimeShort(comment.createdAt)}</p>
                  </div>
                );
              })}
            </>

        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>



    // <>
    //   {singlePost ? (
    //     <div>
    //       <h1>Post Details</h1>

    //       {singlePost.author._id === user._id && <Link to={`/edit-post/${singlePost._id}`}><button>Edit Post</button></Link>}

    //       <div>
    //         <img src={singlePost.image} alt="post" style={{ height: "40vh" }} />
    //         {mapPosition ? (
    //           <div id="map-container">
    //             <MapContainer
    //               id="map"
    //               center={mapPosition}
    //               zoom={4}
    //               scrollWheelZoom={false}
                  
    //             >
    //               <TileLayer
    //                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    
    //               />
    //               {/* <GeoJSON type="Feature" /> */}
    //               <Marker position={mapPosition} icon={myIcon} >
    //                 <Popup>
    //                   <span>Location of {singlePost.country.commonName}</span>
    //                 </Popup>
    //               </Marker>
    //               <ChangeMapView coords={mapPosition} />
    //             </MapContainer>
    //           </div>
    //         ) : (
    //           <p>No map available.</p>
    //         )}
    //       </div>

    //       <h2>{singlePost.title}</h2>
    //       <h3>{singlePost.country.commonName}</h3>

    //       <p>
    //         Posted {returnRelativeTime(singlePost.createdAt)} on{" "}
    //         {returnReadableTime(singlePost.createdAt)}
    //       </p>

    //       <p>
    //         Contributed by:{" "}
    //         <span>
    //           <Link>{singlePost.author.fullName}</Link>
    //         </span>
    //       </p>

    //       <p style={{ whiteSpace: "pre-wrap" }}>{singlePost.story}</p>

    //       <h6>Likes:</h6>

    //       <button onClick={() => toggleLike(singlePost)}>
    //         {returnLike(singlePost) ? (
    //           <HeartIconSolid
    //             style={{ color: "red" }}
    //             className="mr-1 h-5 w-5 text-danger"
    //           />
    //         ) : (
    //           <HeartIconOutline className="mr-1 h-5 w-5 text-danger" />
    //         )}
    //       </button>

    //       {singlePost.likes.length ? (
    //         <p>{likedBy(singlePost.likes)} </p>
    //       ) : (
    //         <p>No likes yet...</p>
    //       )}

    //       <h6>Comments:</h6>

    //       <AddComment
    //         comment={comment}
    //         setComment={setComment}
    //         submitComment={submitComment}
    //       />

    //       {singlePost.comments.length ? (
    //         <>
    //           {singlePost.comments.map((comment) => {
    //             return (
    //               <div key={comment._id}>
    //                 <p>{comment.comment}</p>
    //                 <p>- {comment.author.fullName}</p>
    //                 <p>{returnReadableTimeShort(comment.createdAt)}</p>
    //               </div>
    //             );
    //           })}
    //         </>
    //       ) : (
    //         <p>No comments yet...</p>
    //       )}
    //     </div>
    //   ) : (
    //     <p>Loading...</p>
    //   )}
    // </>





  );
}

export default PostDetails


