import { forwardRef, memo, useCallback } from "react";
import { Field } from "react-final-form";
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
                <Component ref={ref} {...props} {...arrayProps} />
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