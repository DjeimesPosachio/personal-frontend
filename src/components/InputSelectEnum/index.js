import React from 'react';
import Input from '../Input';
import { getEnumByDomain } from '../../utils/enums';

function InputSelectEnum({
    domain,
    ...props
}) {

    const options = getEnumByDomain(domain)

    return (
        <Input.Field
            inputType="select"
            options={options}
            {...props}
        />
    )
}

export default InputSelectEnum;