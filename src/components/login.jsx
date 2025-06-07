import React from 'react'

const login = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
        <button type="button" onClick={() => alert('Forgot Password?')}>Forgot Password?</button>
      </form>
      <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
  )
}

export default login