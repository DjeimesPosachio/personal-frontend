import React, { useCallback } from 'react';
import { wrapFormFieldArray } from '../../../utils/wrap-field';
import { Button, Col, Row } from 'antd';
import Input from '../../../components/Input';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import InputSelectEnum from '../../../components/InputSelectEnum';

const ROW_GUTTER = 24;

function InputItensRefeicao({ fields }) {

    const handleAddExercise = useCallback((values) => {
        fields.push({})
    }, [fields]);

    const handleDeleteExercise = useCallback((index) => {
        fields.remove(index)
    }, [fields]);

    return (
        <>
            <Row justify='end'>
                <Button
                    type="primary"
                    onClick={handleAddExercise}
                    icon={<PlusOutlined />}
                    size='small'
                >
                    Adicionar refeição
                </Button>
            </Row>

            {fields.map((fieldName, index) => {

                function onDelete() {
                    handleDeleteExercise(index);
                }

                return (
                    <div style={{ margin: '6px 10px' }} key={`exercicio_${index + 1}`}>
                        <Row gutter={ROW_GUTTER}>
                            <Col sm={24} md={12} lg={12}>
                                <Input.Field
                                    label="Descrição"
                                    placeholder="Descrição"
                                    name={`${fieldName}.descricao`}
                                    required
                                    allowClear
                                />
                            </Col>

                            <Col sm={24} md={12} lg={8}>
                                <Input.Field
                                    label="Quantidade"
                                    placeholder="Quantidade"
                                    name={`${fieldName}.quantidade`}
                                    required
                                    allowClear
                                />
                            </Col>
                            <Col>
                                <Button
                                    type="primary"
                                    danger
                                    size='small'
                                    shape='circle'
                                    icon={<DeleteOutlined />}
                                    style={{ marginTop: 40 }}
                                    onClick={onDelete}
                                />
                            </Col>
                        </Row>

                        <Row gutter={ROW_GUTTER}>
                            <Col sm={24} md={12} lg={12}>
                                <Input.Field
                                    label="Unidade caseira"
                                    placeholder="Unidade caseira"
                                    name={`${fieldName}.unidadeCaseira`}
                                    allowClear
                                />
                            </Col>
                            <Col sm={24} md={12} lg={12}>
                                <InputSelectEnum
                                    label="Unidade de medida"
                                    placeholder="Unidade de medida"
                                    domain="UnidadeMedida"
                                    name={`${fieldName}.unidadeMedida`}
                                    required
                                />
                            </Col>
                        </Row>
                    </div>
                )
            })}
        </>
    )
}

export default wrapFormFieldArray(InputItensRefeicao);
