const Validation = (username, password, email) => {
  {
    console.log(username, "username", password, "Passowrd", email, "email");
  }
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email,
  );
  if (username.trim(" ") == "") {
    return "Username Cannot Be Empty";
  } else if (username.length > 20) {
    return "Username Cannot Be More than 20 Word";
  } else if (password.trim() == "") {
    return "Password Cannot Be Empty";
  } else if (password.length > 10) {
    return "Password Cannot be More Than 10 word";
  } else if (email.trim("") == "") {
    return "Email Cannot Be Empty";
  } else if (!isEmailValid) {
    return "Email Should Be Valid";
  }

  return null;
};

export default Validation;
