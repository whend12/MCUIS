import React from "react";

const Patient = () => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Your Name</span>
      </label>
      <label className="input-group">
        <span>Full Name</span>
        <input
          type="text"
          placeholder="Jhon Doe"
          className="input input-bordered"
        />
      </label>
    </div>
  );
};

export default Patient;
