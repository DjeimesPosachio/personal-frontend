import React, { useCallback } from 'react';
import { Row, Col, Typography } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import LayoutPages from '../../components/LayoutPages';
import Input from '../../components/Input';
import { Form as FinalForm } from 'react-final-form';
import FormContainer from '../../components/Form';
import SaveCancelButton from '../../components/SaveCancelButton';
import axios from 'axios';

const ROW_GUTTER = 24;

const CreateUpdateExercicio = () => {

    const { exercicioId } = useParams();

    const history = useHistory();

    const isEditing = Boolean(exercicioId);

    const title = isEditing ? 'Editar exercício' : 'Cadastrar exercício';

    const createExercise = async (exerciseData, file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('name', exerciseData.name);
            formData.append('sets', exerciseData.sets);
            formData.append('sequence', exerciseData.sequence);

            const response = await axios.post('/v1/exercise', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error creating exercise:', error);
            throw error;
        }
    };


    const onCancel = useCallback(() => {
        history.push('/exercicios');
    }, [history]);

    const renderForm = useCallback(({ handleSubmit, form, ...props }) => {
        return (
            <FormContainer
                onSubmit={handleSubmit}
            >
                <Row gutter={ROW_GUTTER}>
                    <Col sm={24} md={12} lg={14}>
                        <Input.Field
                            label="Nome do exercício"
                            placeholder="Nome do exercício"
                            name="name"
                            required
                            allowClear
                        />
                    </Col>

                    <Col sm={24} md={12} lg={5}>
                        <Input.Field
                            label="Séries"
                            placeholder="Séries"
                            name="sets"
                            required
                            allowClear
                        />
                    </Col>

                    <Col sm={24} md={12} lg={5}>
                        <Input.Field
                            label="Repetições"
                            placeholder="Repetições"
                            name="sequence"
                            required
                            allowClear
                        />
                    </Col>
                </Row>

                <Row gutter={ROW_GUTTER}>
                    <SaveCancelButton
                        onCancel={onCancel}
                    />
                </Row>
            </FormContainer >
        )
    }, [onCancel])

    return (
        <LayoutPages>
            <Typography.Title level={3}>{title}</Typography.Title>

            <Row style={{ marginTop: '50px' }}>
                <FinalForm
                    render={renderForm}
                    onSubmit
                />
            </Row>
        </LayoutPages>
    );
};
export default CreateUpdateExercicio;
