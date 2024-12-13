import React, { Component } from "react";

import { Modal } from "react-materialize";
import UploadPost from "../post/UploadPost";
class Post extends Component {
  render() {
    return (
      <div>
        <Modal
          id="post"
          className="modals"
          header="Add Post"
          fixedFooter
          trigger={false}
        >
          
          <UploadPost/>
          
        </Modal>
        
      </div>
    );
  }
}

export default Post;
