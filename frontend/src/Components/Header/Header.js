import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Header.css"
import { AiFillHome, AiOutlineFileSearch, AiOutlineSearch } from 'react-icons/ai'
import feedback from "../../images/feedback.png"
import settings from "../../images/setting.png"
import arrow from "../../images/arrow.png"
import help from "../../images/help.png"
import display from "../../images/display.png"
import logout from "../../images/logout.png"
import { AiOutlineHome } from 'react-icons/ai'
import { GrAddCircle } from 'react-icons/gr'
import { RiAccountCircleFill } from 'react-icons/ri'
import { RiAccountCircleLine } from 'react-icons/ri'
import { BsFillGrid3X3GapFill, BsPlusCircleFill } from 'react-icons/bs'
import { RiMessengerFill } from 'react-icons/ri'
import { IoMdNotifications } from 'react-icons/io'
import { Avatar, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logoutUser } from '../../Actions/User'

const Header = () => {
    const [tab, setTab] = useState(window.location.pathname)

    const [menu, setMenu] = useState("");
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const alert = useAlert();
    const settingsMenuToggle = () => {
        if (menu === "") {
            setMenu("settings-menu-height")
        }
        else {
            setMenu("")
        }
    }

    const logoutHandler = () => {
        dispatch(logoutUser())
        alert.success("Logged out successfully")
    }

    return (
        <>
            <header className="header">
                <div className="left">
                    <div className="logo">
                        <Link to="/"><svg viewBox="0 0 36 36" className="a8c37x1j ms05siws l3qrxjdp b7h9ocf4" fill="#000" height="40" width="40"><defs><linearGradient x1="50%" x2="50%" y1="97.0782153%" y2="0%" id="jsc_s_7"><stop offset="0%" stopColor="#0062E0"></stop><stop offset="100%" stopColor="#19AFFF"></stop></linearGradient></defs><path d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-.8h-4l-1 .8z"></path><path className="p361ku9c" fill='#fff' d="M25 23l.8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"></path></svg></Link>
                    </div>
                    <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
                        <span><button type='submit'><AiOutlineSearch /></button></span>
                        <input type="text" placeholder='Search Facebook' />
                    </form>
                </div>
                <ul className="icons">
                    <li><Link to="/" onClick={() => setTab("/")}>{tab === "/" ? <AiFillHome /> : <AiOutlineHome />}</Link></li>
                    <li><Link to="/newpost" onClick={() => setTab("/newpost")}>{tab === "/newpost" ? <BsPlusCircleFill /> : <GrAddCircle />} </Link></li>
                    <li><Link to="/search" onClick={() => setTab("/search")}>{tab === "/search" ? <AiOutlineFileSearch /> : <AiOutlineSearch />}  </Link></li>
                    <li className='accountLi'><Link to="/account" onClick={() => setTab("/account")}> {tab === "/account" ? <RiAccountCircleFill /> : <RiAccountCircleLine />} </Link></li>
                </ul>
                <ul className="right">
                    <li className='grid'><BsFillGrid3X3GapFill /></li>
                    <li className='messanger'><RiMessengerFill /></li>
                    <li className='notification'><IoMdNotifications /></li>
                    <li onClick={settingsMenuToggle}><Avatar src={user.avatar.url} sx={{ width: "2.5rem", height: "2.5rem" }} /> </li>
                </ul>
                <div className={`settings-menu ${menu}`}>
                    <div className="settings-menu-inner">
                        <div className="user-profile">
                            <img src={user.avatar.url} alt="" />
                            <div>
                                <p>{user.name}</p>
                                <Link to="/account" onClick={() => setMenu("")}>See your Profile</Link>
                            </div>
                        </div>
                        <hr />
                        <div className="user-profile">
                            <img src={feedback} alt="" />
                            <div>
                                <p>Give Feedback</p>
                                <Link to="/">Help us to improve the new design</Link>
                            </div>
                        </div>
                        <hr />

                        <div className="setting-links">
                            <img src={settings} alt="" className="settings-icon" />
                            <Link to="/">Settings & Privacy <img src="../images/arrow.png" alt="" width="10px" /></Link>
                        </div>
                        <div className="setting-links">
                            <img src={help} alt="" className="settings-icon" />
                            <Link to="/">Help & Support<img src="../images/arrow.png" alt="" width="10px" /></Link>
                        </div>
                        <div className="setting-links">
                            <img src={display} alt="" className="settings-icon" />
                            <Link to="/">Display & Accesibility <img src={arrow} alt="" width="10px" /></Link>
                        </div>
                        <div className="setting-links">
                            <img src={logout} alt="" className="settings-icon" />
                            <button onClick={logoutHandler} style={{
                                background: "transparent",
                                border: "none",
                                fontSize: "16px",
                                cursor: "pointer"
                            }}>  <Button>Logout <img src="../images/arrow.png" alt="" width="10px" /></Button></button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header