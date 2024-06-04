import React, { useCallback } from 'react';
import { wrapFormFieldArray } from '../../../utils/wrap-field';
import { Button, Col, Row } from 'antd';
import Input from '../../../components/Input';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import InputSearch from '../../../components/InputSearch';

const ROW_GUTTER = 24;

function InputExercicios({ fields }) {

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
                    Adicionar exercício
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
                                <InputSearch.Field
                                    label="Exercício"
                                    name={`${fieldName}.exercicio`}
                                    searchType="exercicios"
                                    placeholder="Digite para buscar exercicios"
                                />
                            </Col>

                            <Col sm={24} md={12} lg={8}>
                                <Input.Field
                                    label="Séries"
                                    placeholder="Séries"
                                    name={`${fieldName}.series`}
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
                                    label="Repetições"
                                    placeholder="Repetições"
                                    name={`${fieldName}.repeticoes`}
                                    allowClear
                                />
                            </Col>
                            <Col sm={24} md={12} lg={12}>
                                <Input.Field
                                    label="Tempo de descanso"
                                    placeholder="Tempo de descanso"
                                    name={`${fieldName}.tempoDescanso`}
                                    allowClear
                                />
                            </Col>
                            <Col sm={24} md={24} lg={24}>
                                <Input.Field
                                    label="Observação"
                                    placeholder="Observação"
                                    name={`${fieldName}.observacao`}
                                    allowClear
                                />
                            </Col>
                        </Row>
                    </div>
                )
            })}
        </>
    )
}

export default wrapFormFieldArray(InputExercicios);
