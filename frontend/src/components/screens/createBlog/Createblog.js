import React, { useEffect, useState } from "react";
import MainScreen from "../../MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createBlogAction } from "../../../actions/blogActions";
// import Loading from "../../components/Loading";
import ErrorMessage from "../../ErrorMessage";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";


function CreateBlog({ a }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const blogCreate = useSelector((state) => state.blogCreate);
  const { loading, error, blog } = blogCreate;
  const navigate = useNavigate();

  console.log(blog);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createBlogAction(title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    navigate("/blogs");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Create a Blog">
      <Card>
        <Card.Header>Create a new Blog</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {/* {loading && <Loading size={50} />} */}
            <Button type="submit" variant="primary">
              Create Blog
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateBlog;
