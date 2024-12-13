import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import Popscore from "../components/profile/Popscore";
import InterestTagsOnly from "../components/profile/InterestTagsOnly";
import moment from "moment";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ApiCall from "../services/ApiCall";
import ManPicture from "../assets/default-profile-man.jpg";
import WomanPicture from "../assets/default-profile-woman.jpg";
import NoGender from "../assets/default-profile-no-gender.png";
import "../styles/Cards.css"; // Import your CSS

const Card = ({ user, currentUserId, onLike, onDislike, swipeDirection }) => {
  const [tags, setTags] = useState([]);
  const [likesProfile, setLikesProfile] = useState(false);
  const [likedByProfile, setLikedByProfile] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await ApiCall.user.checkUserLikedByAndReverse(user.id);
        if (res) {
          setLikedByProfile(res.likedBy);
          setLikesProfile(res.reverse);
        } else {
          console.error("No response from API");
        }
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    };
    fetchTags();
  }, [user]);

  const handleLike = () => {
    console.log("Liked:", user.id);
    setLikesProfile(true);
    ApiCall.user.createUserLike(user.id, currentUserId); // Pass the current user ID
    onLike(user.id);
  };

  const handleDislike = () => {
    console.log("Disliked:", user.id);
    setLikesProfile(false);
    ApiCall.user.deleteUserLike(user.id, currentUserId); // Pass the current user ID
    onDislike(user.id);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      handleDislike();
      swipeDirection('left');
    },
    onSwipedRight: () => {
      handleLike();
      swipeDirection('right');
    },
  });

  return (
    <div className={`card ${swipeDirection}`} {...swipeHandlers}>
      <div className="card-image">
        <img
          src={user.profile_picture_url || (user.gender === "man" ? ManPicture : user.gender === "woman" ? WomanPicture : NoGender)}
          alt="Profile"
        />
        <div className="like-button" onClick={handleLike}>
          {likesProfile ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </div>
        <Popscore popscore={user.pop_score} />
      </div>
      <div className="card-content">
        <span className="card-title">
          {user.username} {user.online ? <span className="online" /> : <span className="offline" title={moment(user.last_connexion).fromNow()} />}
        </span>
        <div>{user.firstname} {user.lastname}</div>
        <div>{user.city || "No location"}</div>
        <div>{user.birthdate ? `${user.birthdate} years old` : "No birthdate"}</div>
        <InterestTagsOnly tags={tags} />
      </div>
      <div className="card-reveal">
        <span className="card-title">Bio</span>
        <p>{user.bio || "No bio yet"}</p>
      </div>
    </div>
  );
};

export default Card;
