import React, { Suspense, forwardRef, memo } from 'react';
import { wrapField } from '../../utils/wrap-field';

import { Input as AntInput, Checkbox, Form } from 'antd';

const Input = memo(forwardRef((props, ref) => {

    const { label, meta, input, formItemProps, hasFormItem, hasFeedback, inputType = "default" } = props;

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
            password: renderInputPassword
        }

        return objectInputs[inputType](inputProps)
    }

    if (!hasFormItem) return renderInput();

    return (
        <Suspense
            fallback="loading"
        >
            <Form.Item
                label={label}
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