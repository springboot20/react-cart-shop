import React from "react";

const InputField = ({ className, id, type, ...rest }) => {
	return <input className={className} type={type} id={id} {...rest} />;
};

export default InputField;
