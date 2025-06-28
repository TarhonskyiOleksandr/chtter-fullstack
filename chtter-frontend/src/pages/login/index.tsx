import React from 'react';

const LoginPage = () => {
  return (
    <form>
      <h2 className="card-title">Login</h2>
      <input placeholder="Email" className="input input-bordered w-full" />
      <input type="password" placeholder="Password" className="input input-bordered w-full mt-2" />
      <div className="card-actions justify-end mt-4">
        <button className="btn btn-primary">Login</button>
      </div>
    </form>
  );
}

export default LoginPage;