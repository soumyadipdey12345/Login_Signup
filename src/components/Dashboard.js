import React, { useState,useEffect } from "react"
import { Card, Button, Alert,NavLink } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import auth from "../firebase"
import "firebase/firestore";

const DB = auth.firestore();

export default function Dashboard() {
  const [error, setError] = useState("")
  const [city, setcity] = useState("")
  const [phn, setphn] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  async function  getdata(){
    const data = DB.collection('others-data').doc(currentUser.email);
    const doc = await data.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data()['phn']);
      setphn(doc.data()['phone'])
      setcity(doc.data()['city'])
    
}

  }


useEffect(()=>{
  getdata()

},[])

  return (
    <>
    <div className="" >
    <Navbar  collapseOnSelect expand="lg" bg="dark" variant="dark" >
        <Navbar.Brand href="#home"> {currentUser.email}</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link href="#foo">Order</Nav.Link>
            <Nav.Link href="#bar">List</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/1">action 1</NavDropdown.Item>
              <NavDropdown.Item href="#action/2">action 2</NavDropdown.Item>
              <NavDropdown.Item href="#action/3">action 3</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/4">action 4</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} href="#qux">
            <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Navbar>







      <Card>
        <Card.Body style={{minHeight:"100vh"}}>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <div>
          <strong>Email:</strong> {currentUser.email}

          </div>

          <div>
          <strong>City:</strong> {city}

          </div>
          <div>

          <strong>Phone:</strong> {phn}

          </div>
          {/* <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link> */}
        </Card.Body>
      </Card>
      {/* <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div> */}

     {/* <h1>city:{city}</h1>
     <h1>phone:{phn}</h1> */}
</div>
    </>
  )
}
