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

const CreateUpdateUsuario = () => {
    const { exercicioId } = useParams();
    const history = useHistory();
    const isEditing = Boolean(exercicioId);
    const title = isEditing ? 'Editar usuário' : 'Cadastrar usuário';

    const createUsuario = async (userData) => {
        try {
            const response = await axios.post('/v1/usuarios', userData);
            return response.data;
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            throw error;
        }
    };

    const onCancel = useCallback(() => {
        history.push('/exercicios');
    }, [history]);

    const renderForm = useCallback(({ handleSubmit }) => {
        return (
            <FormContainer onSubmit={handleSubmit}>
                <Row gutter={ROW_GUTTER}>
                    <Col sm={24} md={12} lg={14}>
                        <Input.Field
                            label="Nome do usuário"
                            placeholder="Nome do usuário"
                            name="nome"
                            required
                            allowClear
                        />
                    </Col>
                    <Col sm={24} md={12} lg={5}>
                        <Input.Field
                            label="E-mail"
                            placeholder="E-mail"
                            name="email"
                            required
                            allowClear
                        />
                    </Col>
                    <Col sm={24} md={12} lg={5}>
                        <Input.Field
                            label="Senha"
                            placeholder="Senha"
                            name="senha"
                            type="password"
                            required
                            allowClear
                        />
                    </Col>
                </Row>
                <Row gutter={ROW_GUTTER}>
                    <SaveCancelButton onSave={createUsuario} onCancel={onCancel} />
                </Row>
            </FormContainer>
        );
    }, [onCancel]);

    return (
        <LayoutPages>
            <Typography.Title level={3}>{title}</Typography.Title>
            <Row style={{ marginTop: '50px' }}>
                <FinalForm
                    render={renderForm}
                    onSubmit={values => createUsuario(values)}
                />
            </Row>
        </LayoutPages>
    );
};

export default CreateUpdateUsuario;
