import React, { useCallback, useEffect, useMemo, useState } from 'react'
import './AdminHomeComp.css'
import AdminHeaderComp from '../AdminHeaderComp/AdminHeaderComp'
import { getAllUser, removeUser } from '../../API/authApi'
import Loader from '../../utils/Loader/Loader'
import Button from '../Button'
import { Link } from 'react-router-dom'

function AdminHomeComp() {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])

  // for search text.
  const [search, setSearch] = useState('')
  const onChangeHandle = useCallback((e)=>{
    setSearch(e.target.value)
  }, [])
 
  // fetching all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await getAllUser();
        // console.log('adminHomeComp :: all user data :: ', response);
        setUsers(response);
      } catch (error) {
        console.error('Error fetching users:', error);
      }finally{
        setLoading(false)
      }
    };

    fetchUsers(); 
  }, []); 

  // filtering users based on search
  const filteredUser = useMemo(() => {
    return users.filter(user => 
      user &&
      (user.username.toLowerCase().includes(search.toLowerCase()) ||
       user.first_name.toLowerCase().includes(search.toLowerCase()) ||
       user.email.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, users]);

  const onRemoveHandle = useCallback((userId)=>{
    const removeUserHandle = async ()=>{
      const result = confirm('Are you sure you want to delete this user?')
      if(result){
        try {
          setLoading(true)
          const response = await removeUser(userId)
          alert(response?.data?.message || 'User deleted successfully');
        
          // Updating the users state to remove the deleted user from the list
          setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        } catch (error) {
          console.log(error);
          alert(error.response?.data?.error || 'Failed to delete user');
        }finally{
          setLoading(false)
        }
      }
    }

    removeUserHandle()
  },[])

  return loading ? < Loader /> : (
    <div className='admin-container'>
        < AdminHeaderComp value={search} onChangeHandle={onChangeHandle} />
        <h1 className="admin-title">Admin Dashboard - Users</h1>

        <div className="table-container">
          <table border="1" className='user-table'>
            <thead>
              <tr>
                <th>No.</th>
                <th>ID</th>
                <th>Profile</th>
                <th>Username</th>
                <th>Email</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Edit</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {filteredUser.length > 0 ? (
                filteredUser.map((user,i) => (
                  user?.is_staff ? null : (
                  <tr key={user.id}>
                    <td>{i}</td>
                    <td>{user.id}</td>
                    <td>
                      <img src={`http://127.0.0.1:8000${user?.user_profile}`} alt={user.username} className='admin_home_user_img' />
                    </td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                    <td>
                      < Link to={`/admin-user-update/:${user.id}`} >
                        <Button label={'Edit'} type={'button'} />
                      </Link>
                    </td>
                    <td><Button label={'Remove'} type={'button'} onClickHandle={()=> onRemoveHandle(user.id)} /></td>
                  </tr>
                  )
                ))
              ) : (
                <tr>
                  <td colSpan="4">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        
        </div>
    </div>
  )
}

export default AdminHomeComp