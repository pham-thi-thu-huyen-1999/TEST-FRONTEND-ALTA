import React from "react";
import ModalDetailPost from "./ModalDetailPost";

export default class PostDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lstPost: [],
      postComents: []
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
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModal" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close" onClick={() => this.setState({})}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
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
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}