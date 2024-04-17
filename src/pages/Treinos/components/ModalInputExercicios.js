import React from 'react';
import SaveCancelButton from '../../../components/SaveCancelButtons';
import { Button, Col, Modal, Row } from 'antd';
import InputExercicios from './InputExercicios';
import Input from '../../../components/Input';

const ROW_GUTTER = 24;

function ModalInputExercicios({ visible, callbackOnClose, fields, indexExercicio }) {

    const dia = fields?.value[indexExercicio];

    const handleCancel = () => {
        callbackOnClose(false);
    };

    return (
        <Modal
            title="Adicionar Exercícios"
            visible={visible}
            onCancel={handleCancel}
            footer={<SaveCancelButton />}
            destroyOnClose
        >
            <Button>
                Adicionar exercício
            </Button>

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
            </Row>
            
            <InputExercicios 
                name="exercicios" 
            />

        </Modal>
    )
}

export default ModalInputExercicios;