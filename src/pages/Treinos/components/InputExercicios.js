import React from 'react';
import { wrapFormFieldArray } from '../../../utils/wrap-field';
import { Col, Row } from 'antd';
import Input from '../../../components/Input';

const ROW_GUTTER = 24;

function InputExercicios({ fields }) {

    return (
        fields.map((fieldName, index) => {
            console.log('fieldName', fieldName);
            return (
                <>
                    <Row gutter={ROW_GUTTER}>
                        <Col sm={24} md={12} lg={12}>
                            <Input.Field
                                label="Exercício"
                                placeholder="Exercício"
                                name={`${fieldName}.nomeExercicio`}
                                required
                                allowClear
                            />
                        </Col>

                        <Col sm={24} md={12} lg={12}>
                            <Input.Field
                                label="Séries"
                                placeholder="Séries"
                                name={`${fieldName}.qtdSeries`}
                                required
                                allowClear
                            />
                        </Col>
                    </Row>

                    <Row gutter={ROW_GUTTER}>
                        <Col sm={24} md={12} lg={12}>
                            <Input.Field
                                label="Repetições"
                                placeholder="Repetições"
                                name={`${fieldName}.qtdRepeticoes`}
                                allowClear
                            />
                        </Col>
                        <Col sm={24} md={12} lg={12}>
                            <Input.Field
                                label="Observação"
                                placeholder="Observação"
                                name={`${fieldName}.observacao`}
                                allowClear
                            />
                        </Col>
                    </Row>
                </>
            )
        })
    )
}

export default wrapFormFieldArray(InputExercicios);