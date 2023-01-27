import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import { loginUser } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (text, key) => {
    const newUser = { ...user };
    newUser[key] = text.target.value;
    setUser(newUser);
  };

  const onLogin = () => {
    loginUser(user)
      .then((userCredential) => {
        const userCred = userCredential.user;
        localStorage.setItem("user", JSON.stringify(userCred));
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MDBCard>
        <MDBCardBody>
          <MDBCardTitle style={{ margin: "32px 0px", fontSize: "32px" }}>
            Iniciar Sesion
          </MDBCardTitle>
          <MDBInput
            label="Usuario"
            id="form1"
            type="text"
            style={{ width: "400px", marginBottom: "16px", fontSize: "20px" }}
            value={user.username}
            onChange={(text) => handleChange(text, "username")}
          />
          <MDBInput
            label="Contraseña"
            id="form1"
            type='password'
            style={{ width: "100%", marginBottom: "16px", fontSize: "20px" }}
            value={user.password}
            onChange={(text) => handleChange(text, "password")}
          />
          <MDBBtn
            style={{
              backgroundColor: "#5dc1b9",
              color: "white",
              fontSize: "20px",
              marginTop: "16px",
            }}
            onClick={() => onLogin()}
          >
            Iniciar Sesion
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}
