import { forwardRef, memo, useCallback } from "react";
import { Field } from "react-final-form";

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