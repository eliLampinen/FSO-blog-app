import { Link, useParams } from 'react-router-dom'; 
import { Table } from 'react-bootstrap';


export const SingleUser = ( {allUsers} ) => {
    const { id } = useParams();
    const userToView = allUsers.find(user => user._id === id); 
    if (!userToView) return <p>User not found.</p>;
    console.log(userToView)
    if (!userToView.blogs || userToView.blogs.length === 0) {
        return <h3>{userToView.name} has not yet added any blogs to the service.</h3>;
      }
          
    return (
      <div>
        <h3>Added blogs by {userToView.name}</h3>
        <ul>
          {userToView.blogs.map((blog) => (
            <li key={blog._id}>{blog.title}</li>
          ))}
        </ul> 
      </div>
    )
  };

export const Users = ({ allUsers }) => {
    return (
      <div>
        <h2>User activity</h2>
          <Table striped bordered hover> 
            <thead>
              <tr>
                <th>Name</th>
                <th>Blogs created</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map(user => (
                <tr key={user._id}>
                  <td>
                    <Link to={`/users/${user._id}`}>{user.name}</Link>
                  </td>
                   <td>{user.blogs.length}</td>
                </tr>
            ))}
            </tbody>
        </Table>
      </div>
    );
};


  