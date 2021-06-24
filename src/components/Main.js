import React from "react";
import ModalDetailPost from "./ModalDetailPost";

export default class PostDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lstPost: [],
      postComents: [],
      isShowModalDetail: false
    }
  }
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({
            lstPost: result
          });
        })
  }
  onShowDetailPost = (post) => {
    this.setState({
      isShowModalDetail: !this.state.isShowModalDetail
    })
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.userId}/comments`)
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({
            postComents: result
          });
        })
  }
  render() {
    const { lstPost, postComents, isShowModalDetail } = this.state;
    return (
      <div>
        <h1>
          TEST FORNTEND
        </h1>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Title</th>
              <th scope="col">comment</th>
            </tr>
          </thead>
          <tbody>
            {lstPost.map((post) => (
              <tr onClick={() => this.onShowDetailPost(post)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                <th scope="row">Post {post.id}</th>
                <td>{post.title}</td>
                <td>{post.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {isShowModalDetail ?
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <table class="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Body</th>
                </tr>
              </thead>
              <tbody>
                {
                  postComents.map(item => (
                    <tr>
                      <th scope="row">{item.id}</th>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>@{item.body}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div> : ""}
      </div>
    )
  }
}