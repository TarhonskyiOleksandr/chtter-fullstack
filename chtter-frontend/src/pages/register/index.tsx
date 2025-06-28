import React from 'react';

const RegisterPage = () => {
  return (
    <form>
      <h2 className="card-title mb-3">Register</h2>
      <input placeholder="Name" className="input input-bordered w-full" />
      <input placeholder="Email" className="input input-bordered w-full mt-2" />
      <input type="password" placeholder="Password" className="input input-bordered w-full mt-2" />
      <div className="card-actions justify-end mt-4">
        <button className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
}

export default RegisterPage;