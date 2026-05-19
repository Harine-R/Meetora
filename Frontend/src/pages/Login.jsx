function Login({ goToHome }) {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Login Page</h2>

      <input placeholder="Email" />
      <br /><br />
      <input placeholder="Password" type="password" />
      <br /><br />

      <button>Login</button>

      <p onClick={goToHome} style={{ cursor: "pointer", marginTop: "10px" }}>
        ← Back to Home
      </p>
    </div>
  );
}

export default Login;