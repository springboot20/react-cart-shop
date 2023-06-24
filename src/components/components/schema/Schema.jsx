import * as yup from "yup";

const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const nameRule = /^\w+$/;
const emailRule = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;

export const basicSchema = yup.object().shape({
	firstName: yup.string().matches(nameRule, { message: "only allow letters, number, and underscore", }).required("first name is required"),
	lastName: yup.string().matches(nameRule, { message: "only allow letters, number, and underscore", }).required("last name is required"),
	email: yup.string().email("Invalid email address").required("email is required"),
	password: yup.string().matches(passwordRule, { message: "Password must be at least 8 digits characters long and contain at least one uppercase letter, one lowercase letter, and one number ", }).required("password is equired"),
});

export const signInSchema = yup.object().shape({
	email: yup.string().matches(emailRule, { message: "Enter a valid email", }).required("email is required"),
	password: yup.string().matches(passwordRule, { message: "Password must be at least 8 digits characters long and contain at least one uppercase letter, one lowercase letter, and one number ", }).required("password is equired"),
});

export const orderSchema = yup.object().shape({
	email: yup.string().matches(emailRule, { message: "Enter a valid email", }).required("email is required")
})

export const updateSchema = yup.object().shape({
  firstName: yup.string().matches(nameRule, { message: 'only allow letters, number, and underscore' }).required('first name is required'),
  lastName: yup.string().matches(nameRule, { message: 'only allow letters, number, and underscore' }).required('last name is required'),
  email: yup.string().email('Invalid email address').required('email is required'),
  password: yup.string().matches(passwordRule, { message: 'Password must be at least 8 digits characters long and contain at least one uppercase letter, one lowercase letter, and one number ' }).required('password is equired'),
});