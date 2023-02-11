export const registerForm = {
  email: '',
  password: '',
  confirmPassword: '',
  username: '',
};

export const inputIcons = {
  email: 'mail',
  password: 'ios-lock-open',
  confirmPassword: 'ios-lock-open',
  username: 'person',
};

export const registerValidate = (values: any) => {
  const errors: any = {};
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm Password is required';
  }
  if (!values.username) {
    errors.username = 'Username is required';
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  return errors;
};

export const loginForm = {
  email: '',
  password: '',
};

export const loginValidate = (values: any) => {
  const errors: any = {};
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  return errors;
};

export const resetPasswordValidate = (values: any) => {
  const errors: any = {};
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};
