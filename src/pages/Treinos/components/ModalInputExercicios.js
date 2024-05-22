import React, { useCallback } from 'react';
import { Col, Modal, Row } from 'antd';
import InputExercicios from './InputExercicios';
import Input from '../../../components/Input';
import { Form as FinalForm } from 'react-final-form';
import FormContainer from '../../../components/Form';
import SaveCancelButton from '../../../components/SaveCancelButton';

const ROW_GUTTER = 24;

const DEFAULT_DIAS = ['A', 'B', 'C', 'D', 'E'];

function ModalInputExercicios({ visible, callbackOnClose = () => null, callbackSave = () => null, training }) {

    const handleCancel = useCallback(() => {
        callbackOnClose(false);
    }, [callbackOnClose]);

    const handleSubmit = useCallback((values) => {
        callbackSave(values, training?.id)
        handleCancel()
    }, [callbackSave, training?.id, handleCancel]);

    const initialValues = useCallback(() => {
        if (training) {
            return training;
        }

        //TODO um array de 6 itens, fazer o map e adicionar as posições
        return {
            id: Math.random(),
            descricao: null,
            metricasExercicios: DEFAULT_DIAS.map(item => ({
                serie: null,
                repeticao: null,
                tempoDescanso: null,
                exercicio: null,
                observacao: null
            })),
        }
    }, [training]);

    const renderForm = useCallback(({ handleSubmit, form, ...props }) => {

        return (
            <FormContainer
                onSubmit={handleSubmit}
            >
                <Row gutter={ROW_GUTTER}>
                    <Col sm={24} md={12} lg={12}>
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
