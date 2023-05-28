import { useContext, useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

import { LoadingContext } from "../context/loading.context"

import AddComment from '../components/AddComment'

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useMap } from "react-leaflet/hooks";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import { returnReadableTime, returnRelativeTime } from "../services/time"

import { post } from "../services/authService";

import { returnReadableTimeShort } from "../services/time";


const PostDetails = () => {

    const [mapPosition, setMapPosition] = useState(null)
    const [comment, setComment] = useState({comment: '', author: ""})

    const { singlePost, getSinglePost, user, setSinglePost } = useContext(LoadingContext)

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

    useEffect(() => {

            getSinglePost(id)
        
    }, [id])

    useEffect(() => {
        if (singlePost) {
            let position = [singlePost.country.coordinates[0], singlePost.country.coordinates[1]];
            setMapPosition(position);
        }
    }, [singlePost])



  return (


    <>
        {singlePost ?
    
        <div>
        
            <h1>Post Details</h1>

            <div>
                <img src={singlePost.image} alt="post" style={{height: "40vh"}}/>
                {mapPosition ? (
              <div id="map-container">
                <MapContainer
                  id="map"
                  center={mapPosition}
                  zoom={4}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={mapPosition} icon={myIcon}>
                    <Popup>
                      <span>Location of {singlePost.country.commonName}</span>
                    </Popup>
                  </Marker>
                  <ChangeMapView coords={mapPosition} />
                </MapContainer>
              </div>
            ) : (
              <p>No map available.</p>
            )}

            </div>

            <h2>{singlePost.title}</h2>
            <h3>{singlePost.country.commonName}</h3>

            <p>Posted {returnRelativeTime(singlePost.createdAt)} on {returnReadableTime(singlePost.createdAt)}</p>

            <p>Contributed by: <span><Link>{singlePost.author.fullName}</Link></span></p>



            <p style={{whiteSpace: "pre-wrap"}}>{singlePost.story}</p>

            <h6>Comments:</h6>

            <AddComment comment={comment} setComment={setComment} submitComment={submitComment}/>

            {
                singlePost.comments.length ? 
                <>
                    {singlePost.comments.map((comment) => {
                        return  <div key={comment._id}>

                                    <p>{comment.comment}</p>
                                    <p>- {comment.author.fullName}</p>
                                    <p>{returnReadableTimeShort(comment.createdAt)}</p>

                                </div>
                    })}
                </>
                : <p>No comments yet...</p>
            }
    
        </div>
    
        : <p>Loading...</p>
        }
    </>
  )
}

export default PostDetails

