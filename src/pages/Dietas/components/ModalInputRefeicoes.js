import React, { useCallback } from 'react';
import { Col, Modal, Row } from 'antd';
import Input from '../../../components/Input';
import { Form as FinalForm } from 'react-final-form';
import FormContainer from '../../../components/Form';
import SaveCancelButton from '../../../components/SaveCancelButton';
import InputItensRefeicao from './InputItensRefeicao';

const ROW_GUTTER = 24;

function ModalInputRefeicoes({ visible, callbackOnClose = () => null, callbackSave = () => null, refeicao }) {

    const handleCancel = useCallback(() => {
        callbackOnClose(false);
    }, [callbackOnClose]);

    const handleSubmit = useCallback((values) => {
        callbackSave(values, refeicao?.id)
        handleCancel()
    }, [callbackSave, refeicao?.id, handleCancel]);

    const initialValues = useCallback(() => {
        if (refeicao) {
            return refeicao;
        }

        return {
            id: Math.random(),
            descricao: null,
            refeicoes: [
                {
                    id: null
                }
            ]
        }
    }, [refeicao]);

    const renderForm = useCallback(({ handleSubmit, form, ...props }) => {

        return (
            <FormContainer
                onSubmit={handleSubmit}
            >
                <Row gutter={ROW_GUTTER}>
                    <Col sm={24} md={12} lg={12}>
                        <Input.Field
                            label="Descrição da refeição"
                            placeholder="Descrição da refeição"
                            name="descricao"
                            required
                        />
                    </Col>
                    <Col sm={24} md={12} lg={12}>
                        <Input.Field
                            label="Hora"
                            placeholder="Hora da refeição"
                            name="horaRefeicao"
                            required
                        />
                    </Col>
                    <Col sm={24} md={12} lg={12}>
                        <Input.Field
                            label="Tipo refeição"
                            placeholder="Tipo refeição"
                            name="tipoRefeicao"
                            required
                        />
                    </Col>
                </Row>

                <div style={{ maxHeight: 500, overflowY: 'scroll', overflowX: 'hidden' }}>
                    <InputItensRefeicao
                        name="itensRefeicao"
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
            title="Adicionar refeições"
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

export default ModalInputRefeicoes;
