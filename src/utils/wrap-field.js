import { forwardRef, memo, useCallback } from "react";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";

const defaultParser = value => value;

export const wrapField = (Component) => {
    const FieldWrapper = memo(forwardRef((props, ref) => {
        const { validate, required, ...others } = props;

        const renderItem = useCallback(fieldProps => {
            return (
                <Component
                    ref={ref}
                    {...fieldProps}
                />
            );
        }, [ref]);

        return (
            <Field
                parse={defaultParser}
                {...others}
                required={required}
                render={renderItem}
            />
        );
    }));

    return FieldWrapper;
};

export const wrapFormFieldArray = Component => {
    const FieldArrayWrapper = memo(forwardRef((props, ref) => {
        const renderItem = useCallback(arrayProps => {
            return (
                <Component
                    ref={ref}
                    {...props}
                    {...arrayProps}
                />
            );
        }, [props, ref]);
        return (
            <FieldArray name={props.name}>
                {renderItem}
            </FieldArray>
        );
    }));
    return FieldArrayWrapper;
};

export const wrapForm = (Comp, options = {
    validate: values => null,
    validateOnBlur: values => null,
}) => {

    let onSubmitCallback;

    const handleSubmitCallback = async (...args) => {
        if (onSubmitCallback) {
            const response = await onSubmitCallback(...args);
            return response;
        }
        return {};
    };

    const ComponentWrapper = memo(forwardRef(({ handleSubmit, ...others }, ref) => {
        const handleSubmitWrapper = useCallback(callback => {
            onSubmitCallback = callback;
            return handleSubmit;
        }, [handleSubmit]);

        return (
            <Comp
                ref={ref}
                handleSubmit={handleSubmitWrapper}
                {...others}
            />
        );
    }));

    const FromWrapper = memo(forwardRef((props, ref) => {
        const renderForm = useCallback(renderProps => {
            return <ComponentWrapper ref={ref} {...props} {...renderProps} />;
        }, [props, ref]);
        return (
            <Form
                {...options}
                // eslint-disable-next-line react/jsx-no-bind
                onSubmit={handleSubmitCallback}
                render={renderForm}
                validateOnBlur={false}
            />
        );
    }));

    return FromWrapper;
};