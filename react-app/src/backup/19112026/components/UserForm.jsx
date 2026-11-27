function UserForm() {
  const formConfig = [
    {
      label: "Full Name",
      name: "name",
      type: "text",
      required: true,
      pattern: "^[A-Za-z ]{3,50}$",
      errorMessage: "Name must contain 3-50 characters and only letters.",
    },
    {
      label: "Email Address",
      name: "email",
      type: "email",
      required: true,
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
      errorMessage: "Please enter a valid email address.",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      required: true,
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
      errorMessage: "Please enter a valid email address.",
    },
    {
      label: "Select Field",
      name: "age",
      type: "select",
      options: ["option1", "option2"],
      required: true,
    },
  ];

  function handleForm(e) {
    e.preventDefault();
    console.log("Submittied form....");
  }

  return (
    <div className="parent-form">
      <form onClick={handleForm}>
        {formConfig.map((item) => (
          <div className="form-control">
            {["text", "email", "phone", "number"].includes(item.type) && (
              <>
                <label>{item.label}</label>
                <input
                  type={item.type}
                  name={item.name}
                  required={item.required}
                  className="input-control"
                />
              </>
            )}
          </div>
        ))}
        <div className="form-control">
          <input className="submit-control" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}

export default UserForm;
