import { useState } from 'react';
import axios from "axios";
function SignUp() {

  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [email, setEmail] = useState("");

  const handleClick = () => {
    // console.log(username);
    // console.log(email);
    // console.log(password);
  }
  const changeUsername = (e) => {
    setUser(e.target.value);
  }
  const changePass = (e) => {
    setPass(e.target.value);
  }
  const changeEmail = (e) => {
    setEmail(e.target.value);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post("http://27.79.176.204:8000/api/register/", {
        username,
        email,
        password,
      });
      console.log(data.refresh);
      sessionStorage.setItem("access", data.access);
      sessionStorage.setItem("refresh", data.refresh);

    } catch (error) {
      alert("Tên tài khoản đã được đăng ký");
    }
  };

  return (
    <>
    <section className="vh-100" style={{backgroundColor: "#508bfc"}}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{borderRadius: "1rem"}}>
              <div className="card-body p-5">

                <h3 className="mb-5" style={{textAlign: "center"}}>Sign Up</h3>

               <form onSubmit={handleSubmit}>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="typeUsernameX-2" style={{textAlign: "right"}}>Username</label>
                    <input type="text" id="typeUsernameX-2" className="form-control form-control-lg username" onChange={changeUsername}/>
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="typeEmailX-2" style={{textAlign: "right"}}>Email</label>
                    <input type="email" id="typeEmailX-2" className="form-control form-control-lg email" onChange={changeEmail}/>
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                    <input type="password" id="typePasswordX-2" className="form-control form-control-lg password" onChange={changePass} />
                  </div>

                  <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block button" type="submit" style={{width: "100%", marginBottom: "20px"}} onClick={handleClick}>Sign Up</button>

               </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
export default SignUp;