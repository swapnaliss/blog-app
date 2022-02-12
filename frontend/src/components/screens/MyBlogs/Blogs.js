import React, { useEffect } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../MainScreen";
import { useDispatch, useSelector } from "react-redux";
// import Loding from "../../Loding";
import ErrorMessage from "../../ErrorMessage";
import { useNavigate } from "react-router-dom";
// import { blogUpdateReducer } from "../../../reducers/blogReducers";
import { deleteBlogAction, listBlog } from "../../../actions/blogActions";


const Blogs = ({ search, history }) => {
  const dispatch = useDispatch();

  const blogList = useSelector((state) => state.blogList);

  const { blog, error } = blogList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { isAdmin } = userInfo;
  const navigate = useNavigate();
  const blogDelete = useSelector((state) => state.blogDelete);
  const { error: errorDelete, success: successDelete } = blogDelete;

  const noteCreate = useSelector((state) => state.blogCreate);
  const { success: successCreate } = noteCreate;

  const blogUpdate = useSelector((state) => state.blogUpdate);
  const { success: successUpdate } = blogUpdate;

  const deleteBlog = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteBlogAction(id));
    }
  };

  useEffect(() => {
    dispatch(listBlog());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successCreate,
    successDelete,
    successUpdate,
  ]);

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      <Link to="/createblog">
        {isAdmin ? (
          <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
            Create new Blog
          </Button>
        ) : (
          ""
        )}
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}

      {blog &&
        blog.map((blog) => (
          <Row xs={1} md={8} className="g-4 mx-2" key={blog._id}>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>{blog.title}</Card.Title>
                  <Card.Text>{blog.content}</Card.Text>
                  <Card.Footer>
                    {isAdmin ? (
                      <div>
                        <Button href={`/blog/${blog._id}`}>Edit</Button>
                        <Button
                          variant="danger"
                          className="mx-2"
                          onClick={() => deleteBlog(blog._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    ) : (
                      ""
                    )}
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
