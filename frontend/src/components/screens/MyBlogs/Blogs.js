import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
// import notes from "../../data/notes";
import MainScreen from "../../MainScreen";
import axios from "axios";

const Blogs = () => {
  const [blog, setBlog] = useState([]);
  const deleteBlog = (id) => {
    if (window.confirm("Are you sure?")) {
    }
  };

  const fetchBlogs = async () => {
    const { data } = await axios.get("/blogs");
    setBlog(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <MainScreen title="This is blog ....">
      <Link to="createblog">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Blog
        </Button>
      </Link>

      {blog.map((blog) => (
        <Row xs={1} md={8} className="g-4 mx-2">
          <Col>
            <Card>
              <Card.Img variant="top" src="../../../background1.jpg" />
              <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
                <Card.Footer>
                  <Button href={`/note/${blog._id}`}>Edit</Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteBlog(blog._id)}
                  >
                    Delete
                  </Button>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </MainScreen>
  );
};

export default Blogs;
