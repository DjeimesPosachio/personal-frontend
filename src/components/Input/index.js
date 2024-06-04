import React, { Suspense, forwardRef, memo, useCallback } from 'react';
import { wrapField } from '../../utils/wrap-field';

import { Input as AntInput, Checkbox, DatePicker, Form } from 'antd';
import InputSelect from '../InputSelect';

const Input = memo(forwardRef((props, ref) => {

    const { label, meta, input, formItemProps, hasFormItem,
        hasFeedback, inputType = "default", required } = props;

    const { onChange } = input;

    const handleDateChange = useCallback(newValue => {
        onChange(newValue);

        return true;
    }, [onChange]);


    function renderInputDefault(inputProps) {
        return (
            <AntInput
                {...inputProps}
                {...input}
                ref={ref}
            />
        )
    }

    function renderInputPassword(inputProps) {
        return (
            <AntInput.Password
                {...inputProps}
                {...input}
                ref={ref}
            />
        )
    }

    function renderCheckbox(inputProps) {
        return (
            <Checkbox
                {...inputProps}
                {...input}
                ref={ref}
            />
        )
    }

    function renderSelect(inputProps) {
        return (
            <InputSelect
                {...input}
                {...inputProps}
                ref={ref}
            />
        )
    }

    function renderDatePicker(inputProps) {
        const {
            dateFormat,
            ...others
        } = inputProps;
        return (
            <DatePicker
                {...others}
                {...input}
                type='date'
                ref={ref}
                onChange={handleDateChange}
                format={dateFormat}
            />
        );
    };


    function renderInput() {

        const inputProps = { ...props }

        delete inputProps.label
        delete inputProps.formItemProps
        delete inputProps.charCounter
        delete inputProps.hasFormItem
        delete inputProps.meta
        delete inputProps.input
        delete inputProps.parser

        const objectInputs = {
            default: renderInputDefault,
            checkbox: renderCheckbox,
            password: renderInputPassword,
            date: renderDatePicker,
            select: renderSelect
        }

        return objectInputs[inputType](inputProps)
    }


    return (
        <Suspense
            fallback="loading"
        >
            <Form.Item
                label={required ? <><span style={{ color: 'red' }}>*</span>&nbsp;{label}</> : label}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                validateStatus={meta.touched && meta.error ? 'error' : ''}
                help={meta.touched && meta.error ? meta.error : ''}
                hasFeedback={!meta.active && meta.touched && hasFeedback}
                {...formItemProps}
            >
                {renderInput()}
            </Form.Item>
        </Suspense>
    )
}))

Input.defaultProps = {
    hasFormItem: true,
    meta: {},
}

Input.Field = wrapField(Input)

export default Input;
