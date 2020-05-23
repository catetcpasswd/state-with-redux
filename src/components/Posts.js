import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/postActions";

export class Posts extends Component {
  /* will no longer require the constructor and the ComponentWillMount
  // redux will take care of this

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  // deprecated! componentWillMount

  componentWillMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      //.then(data => this.setState({ posts: data }));
      .then(data => {
        //console.log(data);
        this.setState({ posts: data });
      });
  }
  */

  // where will the state exists? in redux

  componentWillMount() {
    /* call fetchPosts like before but results are not save in this.state 
    buy in redux state */
    this.props.fetchPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newPost) {
      this.props.posts.unshift(nextProps.newPost);
    }
  }

  render() {
    const postItems = this.props.posts.map(post => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
    return (
      <div>
        <h1>Posts Component</h1>
        {postItems}
      </div>
    );
  }
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  newPost: PropTypes.object
};
/* get state and map to props so component can access */
const mapStateToProps = state => ({
  posts: state.post.items,
  newPost: state.post.item
});
//export default Posts;
/*
The connect() function connects a React component to a Redux store.

It provides its connected component with the pieces of the data it needs from the store, 
and the functions it can use to dispatch actions to the store.
It does not modify the component class passed to it; 
instead, it returns a new, connected component class that wraps the component you passed in.

*/
export default connect(mapStateToProps, { fetchPosts })(Posts);
