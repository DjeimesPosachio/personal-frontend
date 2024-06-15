import React, { useCallback, useEffect, useState } from 'react';
import { Row, Col, Typography, message } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import LayoutPages from '../../components/LayoutPages';
import Input from '../../components/Input';
import { Form as FinalForm } from 'react-final-form';
import FormContainer from '../../components/Form';
import SaveCancelButton from '../../components/SaveCancelButton';
import axios from 'axios';
import InputSelectEnum from '../../components/InputSelectEnum';
import { getErrorMessage } from '../../utils/error-helper';
import { getEnumByKeyAndDomain } from '../../utils/enums';

const ROW_GUTTER = 24;

const CreateUpdateUsuario = () => {
    const { usuarioId } = useParams();

    const history = useHistory();

    const isEditing = Boolean(usuarioId);

    const [initialValues, setInitialValues] = useState({});

    const title = isEditing ? 'Editar usuário' : 'Cadastrar usuário';

    useEffect(() => {
        const fetchUsuarioDetails = async () => {
            try {
                const { data } = await axios.get(`/v1/usuarios/${usuarioId}`);
                setInitialValues({
                    id: data?.id,
                    nome: data?.nome,
                    email: data?.email,
                    role: getEnumByKeyAndDomain('UserRole', data?.role),
                });
            } catch (error) {
                getErrorMessage(error, 'Erro ao obter detalhes do usuário.');
            }
        };
        if (isEditing) {
            fetchUsuarioDetails()
        }
    }, [isEditing, usuarioId]);

    const montarObjetoRequest = useCallback((values) => {
        return {
            nome: values?.nome,
            email: values?.email,
            ...(!usuarioId && {
                senha: values?.senha,
                confirmarSenha: values?.confirmarSenha,
            }),
            role: values?.role?.key
        }
    }, [usuarioId]);

    const createUsuario = async (userData) => {
        const body = montarObjetoRequest(userData)
        try {
            const response = await axios.post('/v1/usuarios', body);
            if (response.status === 200) {
                message.success('Usuário cadastrado com sucesso!');
                history.push('/usuarios');
            }
            return response.data;
        } catch (error) {
            getErrorMessage(error, 'Erro ao cadastrar usuário.');
        }
    };

    const updateUsuario = async (userData) => {
        const body = montarObjetoRequest(userData)
        try {
            const response = await axios.put(`/v1/usuarios/${usuarioId}`, body);
            if (response.status === 200) {
                message.success('Usuário atualizado com sucesso!');
                history.push('/usuarios');
            }
            return response.data;
        } catch (error) {
            getErrorMessage(error, 'Erro ao atualizar exercício.')
        }
    };

    const onSubmit = isEditing ? updateUsuario : createUsuario;

    const onCancel = useCallback(() => {
        history.push('/usuarios');
    }, [history]);

    const renderForm = useCallback(({ handleSubmit }) => {
        return (
            <FormContainer onSubmit={handleSubmit}>
                <Row gutter={ROW_GUTTER}>
                    <Col sm={24} md={12} lg={12}>
                        <Input.Field
                            label="Nome do usuário"
                            placeholder="Nome do usuário"
                            name="nome"
                            required
                            allowClear
                        />
                    </Col>
                    <Col sm={24} md={12} lg={12}>
                        <Input.Field
                            label="E-mail"
                            placeholder="E-mail"
                            name="email"
                            required
                            allowClear
                        />
                    </Col>
                </Row>
                <Row gutter={ROW_GUTTER}>
                    {!usuarioId ? (
                        <>
                            <Col sm={24} md={12} lg={8}>
                                <Input.Field
                                    label="Senha"
                                    placeholder="Senha"
                                    name="senha"
                                    inputType="password"
                                    allowClear
                                    required
                                />
                            </Col>
                            <Col sm={24} md={12} lg={8}>
                                <Input.Field
                                    label="Confirmar senha"
                                    placeholder="Confirmar senha"
                                    name="confirmarSenha"
                                    inputType="password"
                                    allowClear
                                    required
                                />
                            </Col>
                        </>
                    ) : null}
                    <Col sm={24} md={12} lg={usuarioId ? 12 : 8}>
                        <InputSelectEnum
                            label="Papel"
                            placeholder="Papel"
                            domain="UserRole"
                            name="role"
                            required
                        />
                    </Col>
                </Row>
                <Row gutter={ROW_GUTTER}>
                    <SaveCancelButton onCancel={onCancel} />
                </Row>
            </FormContainer >
        );
    }, [onCancel, usuarioId]);

    return (
        <LayoutPages>
            <Typography.Title level={3}>{title}</Typography.Title>
            <Row style={{ marginTop: '50px' }}>
                <FinalForm
                    initialValues={initialValues}
                    render={renderForm}
                    onSubmit={onSubmit}
                />
            </Row>
        </LayoutPages>
    );
};

export default CreateUpdateUsuario;
