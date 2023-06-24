import React from 'react'

const SelectField = ({ children, ...rest }) => {
    return (
        <select {...rest}>
            {children}
        </select>
    )
}

export default SelectField
