function InputValidation(name, value) {
    const errors = [];
  
    if (name === 'username') {
      if (value.trim() === '') {
        errors.push('Username cannot be empty!');
      } else if (!/^[a-zA-Z_][a-zA-Z0-9_.-]*$/.test(value)) {
        errors.push('Invalid username format!');
      }
    }
  
    if (name === 'email') {
      if (value.trim() === '') {
        errors.push('Email cannot be empty!');
      } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)) {
        errors.push('Invalid email format!');
      }
    }
  
    if (name === 'first_name') {
      if (value.trim() === '') {
        errors.push('First_name cannot be empty!');
      } else if (!/^[a-zA-Z]+$/.test(value.trim())) {
        errors.push('First_name should only contain alphabets!');
      }
    }
  
    if (name === 'last_name') {
      if (value.trim() === '') {
        errors.push('Last_name cannot be empty!');
      } else if (!/^[a-zA-Z]+$/.test(value.trim())) {
        errors.push('Last_name should only contain alphabets!');
      }
    }
  
    if (name === 'password') {
      if (value.trim() === '') {
        errors.push('Password cannot be empty!');
      } else {
        if (value.length < 8) {
          errors.push('Password should be at least 8 characters!');
        }
        if (!/[!@#$%^&*_,.+]/.test(value)) {
          errors.push('Password should contain at least one special character!');
        }
      }
    }
  
    if (name === 'phone') {
      if (value.trim() === '') {
        errors.push('Phone cannot be empty!');
      } else if (value.startsWith('0')) {
        errors.push('Phone number cannot start with 0!');
      }
      if (value.length !== 10){
        errors.push('Phone number should contain 10 digits!')
      }
    }
  
    if (name === 'address') {
      if (value.trim() === '') {
        errors.push('Address cannot be empty!');
      }
    }
  
    return errors;
  }
  
  export default InputValidation;
  