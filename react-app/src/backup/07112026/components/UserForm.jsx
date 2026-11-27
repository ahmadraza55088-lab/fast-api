import { useState } from "react";
function UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [error, setError] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [submit, setSubmit] = useState(false);

  function resetForm(e) {
    e.preventDefault();

    setFormData({
      name: "",
      address: "",
      phone: "",
    });

    setError({
      name: "",
      address: "",
      phone: "",
    });

    setSubmit(false);
  }

  function handleForm(e) {
    e.preventDefault();

    // form validation
    let isFormValid = true;

    // Name field validation
    if (formData.name.trim() == "") {
      isFormValid = false;
      setError((prevData) => ({
        ...prevData,
        name: "This field is required!",
      }));
    } else {
      setError((prevData) => ({
        ...prevData,
        name: "",
      }));
    }

    // Address field validation
    if (formData.address.trim() == "") {
      isFormValid = false;
      setError((prevData) => ({
        ...prevData,
        address: "This field is required!",
      }));
    } else {
      setError((prevData) => ({
        ...prevData,
        address: "",
      }));
    }

    // Phone number validation
    if (formData.phone.trim() == "") {
      isFormValid = false;
      setError((prevData) => ({
        ...prevData,
        phone: "This field is required",
      }));
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      isFormValid = false;
      setError((prevData) => ({
        ...prevData,
        phone: "Phone number is not valid and must be 10 digit",
      }));
    } else {
      setError((prevData) => ({
        ...prevData,
        phone: "",
      }));
    }

    // If form is valid
    if (isFormValid) {
      console.log(formData);
      setSubmit(true);
    }
  }

  // On change function to save input value in use state
  function onChangeInput(key, e) {
    setFormData((prevData) => ({
      ...prevData,
      [key]: e.target.value,
    }));
  }

  return (
    <>
      <div className="parent-form">
        <h1 className="text-3xl font-bold">User Form</h1>
        <form onSubmit={handleForm}>
          <div className="form-control">
            <label htmlFor="userId">User Name</label>
            <input
              value={formData.name}
              onChange={(e) => onChangeInput("name", e)}
              className="input-control"
              type="text"
              id="userId"
              placeholder="Enter your name"
            />
            {error.name ? <div className="error">{error.name}</div> : ""}
          </div>
          <div className="form-control">
            <label htmlFor="userAddress">User Address</label>
            <textarea
              value={formData.address}
              onChange={(e) => onChangeInput("address", e)}
              className="input-control"
              type="text"
              id="userAddress"
              placeholder="Enter your address"
            ></textarea>
            {error.address ? <div className="error">{error.address}</div> : ""}
          </div>

          <div className="form-control">
            <label htmlFor="userPhone">User Phone</label>
            <input
              value={formData.phone}
              onChange={(e) => onChangeInput("phone", e)}
              className="input-control"
              type="text"
              id="userPhone"
              placeholder="Enter your phone"
            />
            {error.phone ? <div className="error">{error.phone}</div> : ""}
          </div>
          <div className="form-control">
            <input className="submit-control" type="submit" value="Submit" />
          </div>
          <div className="form-control">
            <button className="submit-control" onClick={resetForm}>
              Reset
            </button>
          </div>
        </form>

        {submit ? (
          <div
            className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
            role="alert"
          >
            <div className="flex">
              <div className="py-1">
                <svg
                  className="fill-current h-6 w-6 text-teal-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
              </div>
              <div>
                <p className="font-bold">Success</p>
                <p className="text-sm">Your form data is successfull submit</p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default UserForm;
