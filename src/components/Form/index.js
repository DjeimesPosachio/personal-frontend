import { Form } from 'antd';
import React from 'react';

function FormContainer({ onSubmit, children }) {
    return (
        <Form
            component="div"
        >
            <form onSubmit={onSubmit}>
                {children}
            </form>
        </Form>
    )
}

export default FormContainer;