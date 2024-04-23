import React, { useCallback } from 'react';
import { Col, Modal, Row } from 'antd';
import InputExercicios from './InputExercicios';
import Input from '../../../components/Input';
import { Form as FinalForm } from 'react-final-form';
import FormContainer from '../../../components/Form';
import SaveCancelButton from '../../../components/SaveCancelButton';

const ROW_GUTTER = 24;

const DEFAULT_DIAS = ['A', 'B', 'C', 'D', 'E'];

function ModalInputExercicios({ visible, callbackOnClose = () => null, callbackSave = () => null, dia }) {

    const handleCancel = useCallback(() => {
        callbackOnClose(false);
    }, [callbackOnClose]);

    const handleSubmit = useCallback((values) => {
        callbackSave(values, dia?.id)
        handleCancel()
    }, [callbackSave, dia?.id, handleCancel]);

    const initialValues = useCallback(() => {
        if (dia) {
            return dia
        }

        //TODO um array de 6 itens, fazer o map e adicionar as posições
        return {
            id: Math.random(),
            classTreino: null,
            descricao: null,
            exercicios: DEFAULT_DIAS.map(item => ({
                classTreino: item
            })),
        }
    }, [dia]);

    const renderForm = useCallback(({ handleSubmit, form, ...props }) => {

        return (
            <FormContainer
                onSubmit={handleSubmit}
            >
                <Row gutter={ROW_GUTTER}>
                    <Col sm={24} md={12} lg={12}>
                        <Input.Field
                            label="Classificação do treino"
                            placeholder="Classificação do treino"
                            name="classTreino"
                            required
                            allowClear
                        />
                    </Col>

                    <Col sm={24} md={12} lg={12}>
                        <Input.Field
                            label="Descrição"
                            placeholder="Descrição do treino"
                            name="descricao"
                            required
                            allowClear
                        />
                    </Col>
                </Row>

                <div style={{ maxHeight: 500, overflowY: 'scroll', overflowX: 'hidden' }}>
                    <InputExercicios
                        name="exercicios"
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
            visible={visible}
            onCancel={handleCancel}
            footer={false}
            destroyOnClose
            width={800}
        >
            <FinalForm
                render={renderForm}
                onSubmit={handleSubmit}
                initialValues={dia}
            />
        </Modal>
    )
}

export default ModalInputExercicios;