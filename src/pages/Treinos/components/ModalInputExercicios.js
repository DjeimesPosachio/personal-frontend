import React, { useCallback } from 'react';
import { Col, Modal, Row } from 'antd';
import InputExercicios from './InputExercicios';
import Input from '../../../components/Input';
import { Form as FinalForm } from 'react-final-form';
import FormContainer from '../../../components/Form';
import SaveCancelButton from '../../../components/SaveCancelButton';
import InputSelectEnum from '../../../components/InputSelectEnum';
import { getRamdomicString } from '../../../utils/random-string';

const ROW_GUTTER = 24;

const DEFAULT_SEQUENCIA_TREINOS = ['A', 'B', 'C', 'D', 'E'];

function ModalInputExercicios({ visible, callbackOnClose = () => null, callbackSave = () => null, treino }) {

    const handleCancel = useCallback(() => {
        callbackOnClose(false);
    }, [callbackOnClose]);

    const handleSubmit = useCallback((values) => {
        callbackSave(values, treino?.id)
        handleCancel()
    }, [callbackSave, treino?.id, handleCancel]);

    const initialValues = useCallback(() => {
        if (treino) {
            return treino;
        }

        return {
            uniqueId: getRamdomicString(),
            id: null,
            descricao: null,
            metricasExercicios: DEFAULT_SEQUENCIA_TREINOS.map(item => ({
                serie: null,
                repeticao: null,
                tempoDescanso: null,
                exercicio: null,
                observacao: null
            })),
        }
    }, [treino]);

    const renderForm = useCallback(({ handleSubmit, form, ...props }) => {

        return (
            <FormContainer
                onSubmit={handleSubmit}
            >
                <Row gutter={ROW_GUTTER}>
                    <Col sm={24} md={6} lg={6}>
                        <InputSelectEnum
                            label="Sequência do treino"
                            placeholder="Sequência do treino"
                            domain="SequenciaTreino"
                            name="sequenciaTreino"
                            required
                        />
                    </Col>
                    <Col sm={24} md={18} lg={18}>
                        <Input.Field
                            label="Descrição do treino"
                            placeholder="Descrição do treino"
                            name="descricao"
                            required
                        />
                    </Col>
                </Row>

                <div style={{ maxHeight: 500, overflowY: 'scroll', overflowX: 'hidden' }}>
                    <InputExercicios
                        name="metricasExercicios"
                    />
                </div>

                <SaveCancelButton
                    onCancel={handleCancel}
                />
            </FormContainer >
        )
    }, [handleCancel])

    return (
        <Modal
            title="Adicionar Exercícios"
            open={visible}
            onCancel={handleCancel}
            footer={false}
            destroyOnClose
            width={800}
        >
            <FinalForm
                render={renderForm}
                onSubmit={handleSubmit}
                initialValues={initialValues()}
            />
        </Modal>
    )
}

export default ModalInputExercicios;
