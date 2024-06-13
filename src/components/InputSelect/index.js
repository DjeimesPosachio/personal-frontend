import React, { forwardRef, memo, useCallback } from 'react';

import { Select } from 'antd';

const InputSelect = memo(forwardRef(({
    options, mode, onChange,
    renderOption, value,
    ...props
}, ref) => {

    const pickOptionProps = useCallback(option => {
        return {
            key: option.key,
            label: option.label,
        };
    }, []);

    const handleSelect = useCallback((value, option) => {

        onChange(pickOptionProps(option));

    }, [onChange, pickOptionProps]);

    return (
        <Select
            {...props}
            value={value}
            ref={ref}
            filterOption={false}
            onSelect={handleSelect}
            labelInValue
            mode={mode}
        >
            {options.map(item => (
                <Select.Option key={item.key} children={item.label} {...item}>
                    {item.label}
                </Select.Option>
            ))}
        </Select>
    )

}))

export default InputSelect;
