import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import '../../styles/GetuserPost.css'
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const baseURL = process.env.REACT_APP_BASE_URL

class GetuserPost extends Component {
  constructor(props) {
    super(props);
    
  }

  state = {
    posts: [],
    comments: {}, // Stores input comments
    postComments: {}, // Stores fetched comments for each post
    currentIndex: {},
    postlike: {},
    editingCommentId: null, // Track which comment is being edited
    editedCommentText: "", // Store the text of the edited comment
  };

  
  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = () => {
    const userId = this.props.user.id;
    axios
      .get(`${baseURL}/users/${userId}/post`)
      .then((response) => {

        if (response.data.status === 200) {

          // console.log('ok');
          const currentIndex = response.data.data.reduce((acc, post) => {
            acc[post.id] = 0;
            return acc;
          }, {});

          response.data.data.forEach((post) => {
            this.fetchComments(post.id); // Fetch comments for each post
            this.fetchlikes(post.id);
          });

          this.setState({ posts: response.data.data, currentIndex });
        } else {
          console.log('no post')
           this.setState({ posts: [] });
        }
        
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
      });
  };

  fetchComments = (postId) => {
    axios
      .get(`${baseURL}/users/${postId}/comment`)
      .then((response) => {
        this.setState((prevState) => ({
          postComments: {
            ...prevState.postComments,
            [postId]: response.data.data, // Store comments for the specific post
          },
        }));
      })
      .catch((error) => {
        console.error(`Error fetching comments for post ${postId}:`, error);
      });
  };

  handleDeleteComment = (commentId, postId) => {
    // Perform the delete request
    axios
      .delete(`${baseURL}/users/post/comment/delete/${commentId}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("Comment deleted successfully");
          // Update the state to remove the comment from the UI
          this.setState((prevState) => ({
            postComments: {
              ...prevState.postComments,
              [postId]: prevState.postComments[postId].filter(
                (comment) => comment.id !== commentId
              ),
            },
          }));
        }
      })
      .catch((error) => {
        console.error("There was an error deleting the comment", error);
      });
  };

  handleEditComment = (comment) => {
    this.setState({
      editingCommentId: comment.id,
      editedCommentText: comment.comment,
    });
  };

  handleSubmitEditComment = async (postId) => {
    const { editingCommentId, editedCommentText } = this.state;

    console.log(editingCommentId, editedCommentText, postId);

    try {
      const response = await axios.put(
        `${baseURL}/users/post/comment/edit/${editingCommentId}`,
        { comment: editedCommentText },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Comment edited successfully");
        this.fetchComments(postId); // Re-fetch comments after editing
        this.setState({ editingCommentId: null, editedCommentText: "" }); // Reset state
      }
    } catch (error) {
      console.error("There was an error editing the comment", error);
    }
  };

  fetchlikes = (postId) => {
    axios
      .get(`${baseURL}/users/post/${postId}/like/count`)
      .then((response) => {
        this.setState((prevState) => ({
          postlike: {
            ...prevState.postlike,
            [postId]: response.data.data[0], // Store comments for the specific post
          },
        }));
      })
      .catch((error) => {
        console.error(`Error fetching comments for post ${postId}:`, error);
      });
  };
  handleLike = async (postId) => {
    const userid = this.props.userConnectedData.id;
    const username = this.props.userConnectedData.username;
    const user_image = this.props.userConnectedData.profile_picture_url;

    const sendlikes = {
      id_who_like: userid,
      name_who_like: username,
      image: user_image,
      postid: postId,
    };

    try {
      const response = await axios.post(
        `${baseURL}/users/post/like`,
        sendlikes,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        this.fetchlikes(postId);
      }
    } catch (error) {}
  };
  handleSubmitComment = async (postId) => {
    const comment = this.state.comments[postId];
    const id = this.props.userConnectedData.id;
    const name = this.props.userConnectedData.username;
    const user_image = this.props.userConnectedData.profile_picture_url;

    console.log(this.props.userConnectedData.profile_picture_url);

    const sendcomment = {
      userid: id,
      username: name,
      postid: postId,
      image: user_image,
      comment: comment,
    };

    try {
      const response = await axios.post(
        `${baseURL}/users/post/comment`,
        sendcomment,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        this.fetchComments(postId); // Re-fetch comments after submitting
      }
    } catch (error) {
      console.error("There was an error submitting the comment", error);
    }

    this.setState((prevState) => ({
      comments: {
        ...prevState.comments,
        [postId]: "",
      },
    }));
  };

  handleDelete = (postId) => {
    console.log("Deleting post with ID:", postId);
    axios
      .delete(`${baseURL}/users/post/delete/${postId}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("post deleted successfully");
          // Update the state to remove the comment from the UI
          this.fetchPosts();
        }
      })
      .catch((error) => {
        console.error("There was an error deleting the post", error);
      });
  };

  handleComment = (e, postId) => {
    const value = e.target.value;

    this.setState((prevState) => ({
      comments: {
        ...prevState.comments,
        [postId]: value || "",
      },
    }));
  };

  handlePrevImage = (postId, totalImages) => {
    this.setState((prevState) => ({
      currentIndex: {
        ...prevState.currentIndex,
        [postId]:
          (prevState.currentIndex[postId] - 1 + totalImages) % totalImages,
      },
    }));
  };

  handleNextImage = (postId, totalImages) => {
    this.setState((prevState) => ({
      currentIndex: {
        ...prevState.currentIndex,
        [postId]: (prevState.currentIndex[postId] + 1) % totalImages,
      },
    }));
  };

  render() {
    const {
      posts,
      currentIndex,
      comments,
      postComments,
      editingCommentId,
      editedCommentText,
      postlike,
    } = this.state;

    return (
      <div className="uploaded-post-wrapper">
      {posts.length === 0 ? (
        <div className="no-posts-div">

        <Typography variant="h6" className="no-posts-text">
          No posts yet...
        </Typography>

        </div>
    ) : (

      posts.map((post) => {
        const totalImages = post.imagePaths ? post.imagePaths.length : 0;
        const currentImageIndex = currentIndex[post.id] || 0;
        const showNavigation = totalImages > 1;

        return (
          <Card key={post.id} className="post-card">
            <CardContent>
              <Typography variant="h5">{post.Title}</Typography>
              <Typography variant="subtitle1">
                Posted by: {post.username}
              </Typography>

              {totalImages > 0 && (
                <div className="post-card-inner">
                  <img
                    src={`${baseURL}/uploads/${post.imagePaths[currentImageIndex]}`}
                    alt="Post"
                    className="post-image"
                  />

                  {showNavigation && (
                    <>
                      <button
                        onClick={() =>
                          this.handlePrevImage(post.id, totalImages)
                        }
                        className="prev-button"
                      >
                        <ArrowBackIcon />
                      </button>
                      <button
                        onClick={() =>
                          this.handleNextImage(post.id, totalImages)
                        }
                        className="next-button"
                      >
                        <ArrowForwardIcon />
                      </button>
                    </>
                  )}
                </div>
              )}
            </CardContent>

            <CardActions>
              <IconButton onClick={() => this.handleLike(post.id)}>
                <FavoriteIcon color="error" />
              </IconButton>
              <Typography variant="body2" className="like-count">
                {postlike[post.id] ? postlike[post.id].likeCount : 0} Likes
              </Typography>

              {this.props.user.id === this.props.userConnectedData.id && (
                <IconButton onClick={() => this.handleDelete(post.id)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </CardActions>

            <CardContent>
              <TextField
                label="Comment"
                variant="outlined"
                fullWidth
                value={comments[post.id] || ""}
                onChange={(e) => this.handleComment(e, post.id)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.handleSubmitComment(post.id)}
              >
                Submit Comment
              </Button>
              <div  className="comments-container">
                {Array.isArray(postComments[post.id]) &&
                postComments[post.id].length > 0 ? (
                  <List
                  >
                    {postComments[post.id].map((comment) => (
                      <ListItem key={comment.id}>
                        <div className="comment-item">
                          <div className="comment-header">
                            <div>
                              <img
                                src={comment.image}
                                alt="profile"
                                className="comment-profile-img"
                              />
                            </div>

                            <ListItemText
                              primary={comment.comment}
                              secondary={`By: ${
                                comment.username
                              } | On: ${new Date(
                                comment.created_at
                              ).toLocaleString()}`}
                              className="comment-text"
                            />
                            <div className="comment-actions">
                              {comment.userid ===
                              this.props.userConnectedData.id ? (
                                <>
                                  <IconButton
                                    onClick={() =>
                                      this.handleEditComment(comment)
                                    }
                                  >
                                    <EditIcon />
                                  </IconButton>
                                  <IconButton
                                    onClick={() =>
                                      this.handleDeleteComment(
                                        comment.id,
                                        post.id
                                      )
                                    }
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </>
                              ) : (
                                post.userid ===
                                  this.props.userConnectedData.id && (
                                  <IconButton
                                    onClick={() =>
                                      this.handleDeleteComment(
                                        comment.id,
                                        post.id
                                      )
                                    }
                                  >
                                    <DeleteIcon />
                                    
                                  </IconButton>
                                )
                              )}
                            </div>
                          </div>

                          {editingCommentId === comment.id && (
                            <div className="edit-comment-section">
                              <TextField
                                fullWidth
                                variant="outlined"
                                value={editedCommentText}
                                onChange={(e) =>
                                  this.setState({
                                    editedCommentText: e.target.value,
                                  })
                                }
                              />
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                  this.handleSubmitEditComment(post.id)
                                }
                              >
                                Save
                              </Button>
                            </div>
                          )}
                        </div>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography>
                    <p className="no-comments-text">No comments yet.</p>
                  </Typography>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })
    )};
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userConnectedData: state.user.data,
    userConnectedStatus: state.user.status,
  };
};

export default connect(mapStateToProps)(GetuserPost);
