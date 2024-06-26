import React, { useCallback, useEffect, useState } from 'react';
import { Row, Col, Typography, message } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import LayoutPages from '../../components/LayoutPages';
import Input from '../../components/Input';
import { Form as FinalForm } from 'react-final-form';
import FormContainer from '../../components/Form';
import SaveCancelButton from '../../components/SaveCancelButton';
import axios from 'axios';
import { getErrorMessage } from '../../utils/error-helper';

const ROW_GUTTER = 24;

const CreateUpdateExercicio = () => {
    const { exercicioId } = useParams();

    const history = useHistory();

    const isEditing = Boolean(exercicioId);

    const [initialValues, setInitialValues] = useState({});

    const title = isEditing ? 'Editar exercício' : 'Cadastrar exercício';

    useEffect(() => {
        const fetchExerciseDetails = async () => {
            try {
                const response = await axios.get(`/v1/exercicios/${exercicioId}`);
                setInitialValues(response.data);
            } catch (error) {
                getErrorMessage(error, 'Erro ao obter detalhes do exercício.')
            }
        };
        if (isEditing) {
            fetchExerciseDetails()
        }
    }, [exercicioId, isEditing]);

    const createExercise = async (exerciseData) => {
        try {
            const response = await axios.post('/v1/exercicios', exerciseData);
            if (response.status === 200) {
                message.success('Exercício cadastrado com sucesso!');
                history.push('/exercicios');
            }
            return response.data;
        } catch (error) {
            getErrorMessage(error, 'Erro ao cadastrar exercício.')
        }
    };

    const updateExercise = async (exerciseData) => {
        try {
            const response = await axios.put(`/v1/exercicios/${exercicioId}`, exerciseData);
            if (response.status === 200) {
                message.success('Exercício atualizado com sucesso!');
                history.push('/exercicios');
            }
            return response.data;
        } catch (error) {
            getErrorMessage(error, 'Erro ao atualizar exercício.')
        }
    };

    const onSubmit = isEditing ? updateExercise : createExercise;

    const onCancel = useCallback(() => {
        history.push('/exercicios');
    }, [history]);

    const renderForm = useCallback(({ handleSubmit }) => {
        return (
            <FormContainer onSubmit={handleSubmit}>
                <Row gutter={ROW_GUTTER} style={{marginTop: 50}}>
                    <Col sm={8} md={8} lg={6}>
                        <Input.Field
                            label="Nome do exercício"
                            placeholder="Nome do exercício"
                            name="nomeExercicio"
                            required
                        />
                    </Col>
                </Row>
                <Row gutter={ROW_GUTTER}>
                    <SaveCancelButton onCancel={onCancel} />
                </Row>
            </FormContainer>
        );
    }, [onCancel]);

    return (
        <LayoutPages>
            <Typography.Title level={3}>{title}</Typography.Title>
                <FinalForm
                    initialValues={initialValues}
                    render={renderForm}
                    onSubmit={onSubmit}
                />
        </LayoutPages>
    );
};

export default CreateUpdateExercicio;
