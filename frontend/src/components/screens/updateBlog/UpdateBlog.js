import React, { useEffect, useState } from "react";
import MainScreen from "../../MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlogAction,
  updateBlogAction,
} from "../../../actions/blogActions";
import ErrorMessage from "../../ErrorMessage";
import Loading from "../../Loding";
import ReactMarkdown from "react-markdown";
import { useParams, useNavigate } from "react-router-dom";

function UpdateBlog({ match, history }) {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const blogUpdate = useSelector((state) => state.blogUpdate);
  const { loading, error } = blogUpdate;

  const blogDelete = useSelector((state) => state.blogDelete);
  const { loading: loadingDelete, error: errorDelete } = blogDelete;
  let userId = useParams();
  const navigate = useNavigate();

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteBlogAction(id));
    }
    
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/blog/${userId.id}`);
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [ userId.id, date]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = async(e) => {
    e.preventDefault();
    dispatch(updateBlogAction(userId.id, title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    navigate("/blogs");
  };

  return (
    <MainScreen title="Edit Blog">
      <Card>
        <Card.Header>Edit your Blog</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Blog Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Blog
            </Button>
          
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default UpdateBlog;
