import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { uploadUserPost } from "../../http/index";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoToastService from "../../services/InfoToastService";
import Materialize from "materialize-css";

const baseURL = process.env.REACT_APP_BASE_URL

class UploadPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFiles: [],
      imageUrls: [],
      title: "",
      currentIndex: 0,
    };

    this.fileInputRef = React.createRef();
  }

  handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    this.handleFiles(files);
  };

  handleDragOver = (e) => {
    e.preventDefault();
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFiles = (files) => {
    const validFiles = files.filter((file) => file.type.startsWith("image/"));
    const fileUrls = validFiles.map((file) => URL.createObjectURL(file));

    this.setState((prevState) => ({
      imageFiles: [...prevState.imageFiles, ...validFiles],
      imageUrls: [...prevState.imageUrls, ...fileUrls],
    }));
  };

  handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    this.handleFiles(files);
  };

  handleClick = () => {
    this.fileInputRef.current.click();
  };

  handleNext = () => {
    this.setState((prevState) => ({
      currentIndex: (prevState.currentIndex + 1) % prevState.imageUrls.length,
      isButtonClick: true, // Set to true when button is clicked
    }));
  };

  handlePrev = () => {
    this.setState((prevState) => ({
      currentIndex:
        (prevState.currentIndex - 1 + prevState.imageUrls.length) %
        prevState.imageUrls.length,
      isButtonClick: true, // Set to true when button is clicked
    }));
  };

  handleCancelImage = (index) => {
    this.setState((prevState) => {
      const newImageFiles = [...prevState.imageFiles];
      const newImageUrls = [...prevState.imageUrls];
      newImageFiles.splice(index, 1); // Remove the selected image file
      newImageUrls.splice(index, 1); // Remove the selected image URL

      return {
        imageFiles: newImageFiles,
        imageUrls: newImageUrls,
        currentIndex:
          prevState.currentIndex > 0 ? prevState.currentIndex - 1 : 0,
      };
    });
  };

 
  handleSubmit = async (e) => {
    e.preventDefault();
    const { imageFiles, title } = this.state;

    const formData = new FormData();
    formData.append("userid", this.props.userConnectedData.id);
    formData.append("username", this.props.userConnectedData.username);
    formData.append("Title", title);

    imageFiles.forEach((file) => {
      formData.append("images", file); // Multiple files
    });

    try {
      const response = await axios.post(
        `${baseURL}/users/upload/post`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        InfoToastService.custom.info("Post uploaded successfully", 1400);
        this.setState({
          imageFiles: [],
          imageUrls: [],
          title: "",
          currentIndex: 0,
        });
      }
    } catch (error) {
      Materialize.toast({
        html: "The image must be less than 2 mb",
        displayLength: 1500,
        classes: "rounded info-toast"
      });
           

      console.error("Error uploading post", error);
    }
  };

  render() {
    const { imageUrls, title, currentIndex, isButtonClick } = this.state;

    return (
      <div className="upload-container" style={{ textAlign: "center" }}>
        {/* Navigation buttons */}
        {imageUrls.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginTop: "10px",
            }}
          >
            <button
              type="button"
              onClick={this.handlePrev}
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                border: "none",
                cursor: "pointer",
                padding: "10px 20px",
              }}
            >
              &#10094; Previous
            </button>

            <button
              type="button"
              onClick={this.handleNext}
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                border: "none",
                cursor: "pointer",
                padding: "10px 20px",
              }}
            >
              Next &#10095;
            </button>
          </div>
        )}
        <form onSubmit={this.handleSubmit}>
          <div
            className="drop-zone"
            onClick={this.handleClick}
            onDrop={this.handleDrop}
            onDragOver={this.handleDragOver}
            style={{
              height: "400px",
              border: "2px dashed #ccc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
              position: "relative", // Make this relative for absolute positioning of buttons
              cursor: "pointer",
            }}
          >
            {imageUrls.length > 0 ? (
              <div style={{ width: "100%", height: "100%" }}>
                <img
                  src={imageUrls[currentIndex]}
                  alt={`Preview ${currentIndex}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: isButtonClick
                      ? "none" // No transition effect when button is clicked
                      : "transform 0.5s ease-in-out", // Smooth transition for scrolling
                  }}
                />
              </div>
            ) : (
              <p>Drag and drop images or click to select</p>
            )}
            <input
              type="file"
              ref={this.fileInputRef}
              style={{ display: "none" }}
              onChange={this.handleFileSelect}
              multiple
              accept="image/*"
            />
          </div>

          {/* Display images with cancel buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {imageUrls.map((url, index) => (
              <div key={index} style={{ position: "relative", margin: "10px" }}>
                <img
                  src={url}
                  alt={`Image ${index}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <div className="upload-post-dlt">
                <DeleteIcon
                  onClick={() => this.handleCancelImage(index)} // Use the icon for cancel
                  
                />
                </div>
              </div>
            ))}
          </div>

          <input
            type="text"
            name="title"
            value={title}
            onChange={this.handleInputChange}
            placeholder="Enter images title"
            style={{
              marginBottom: "20px",
              padding: "10px",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
          <button className="btn upload-post-btn" type="submit" style={{ padding: "10px 20px" }}>
            Upload
          </button>
        </form>
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

export default connect(mapStateToProps)(UploadPost);
