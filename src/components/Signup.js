

import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

import auth from "../firebase"
import "firebase/firestore";


const DB = auth.firestore();

export default function Signup() {
    const { currentUser, logout } = useAuth()

    const [mail,setmail]=useState("")
    const [password,setpassword]=useState("")
    const [confirmpassword,setconfirmpassword]=useState("")
    const [city,setcity]=useState("")
    const [phn,setphn]=useState("")
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [ui, setUI] = useState(0);
    const [active, setactive] = useState(0)
  async function handleSubmit(e) {
    e.preventDefault()

    if (password !== confirmpassword){
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      console.log(mail,password,phn, city);
      await signup(mail,password,phn, city);
       
     
        
      await SAVE(phn,city)
     
        history.push("/")
      
     
      
    } catch(err) {
      setError("Failed to create an account")
      console.log(err);
    }

    setLoading(false)
  }

  
  function SAVE(phn,city) {
    DB.collection("others-data").doc(currentUser.email).set({
      phone: phn,
      city:city,
      
    });
  }

  



  return (
    <>
    <div className="short">
     <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>


          {active === 0 &&(
          <div>

            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control   type="email" defaultValue={mail}  onChange={(e)=>setmail(e.target.value)} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control  defaultValue={password}  onChange={(e)=>setpassword(e.target.value)} type="password"  required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password"  defaultValue={confirmpassword}  onChange={(e)=>setconfirmpassword(e.target.value)} required />
            </Form.Group>

            <h6 onClick={()=>setactive(1)} className="btn btn-secondary">Next</h6>

            </div>


          )}


        {active === 1 &&(
        

          <div>


          <Form.Group id="email">
              <Form.Label>city</Form.Label>
              <Form.Control type="text" defaultValue={city}  onChange={(e)=>setcity(e.target.value)} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>phn</Form.Label>
              <Form.Control type="number"  defaultValue={phn}  onChange={(e)=>setphn(e.target.value)} required />
            </Form.Group>


            <h6 className="btn btn-secondary" onClick={()=>setactive(0)}>Back</h6>


            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </div>
            )}
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
      </div>
    </>
  )
}
