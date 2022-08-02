import { Button } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../Actions/User';
import Loader from './Loader/Loader';
import User from './User';

const Search = () => {
    const { loading: userLoading, users } = useSelector(state => state.allUsers);
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(getAllUsers(name));
    }

    return (
        userLoading ? <Loader /> : (
            <div class="login-container" style={{ backgroundColor: "transparent", padding: "0" }}>
                <div class="login-row">
                    <div class="login-form-container" id='searchForm'>
                        <form onSubmit={submitHandler} style={{ width: "70vw", margin: "auto" }}>
                            <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                            <Button type="submit" variant='contained' disabled={userLoading}>Search</Button>
                        </form>
                        <div style={{ marginTop: "2rem" }} className="SearchUser">
                            {
                                users && users.map(user => (
                                    <User
                                        key={user._id}
                                        userId={user._id}
                                        name={user.name}
                                        avatar={user.avatar.url}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default Search