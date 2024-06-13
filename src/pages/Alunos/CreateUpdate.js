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

const CreateUpdateAluno = () => {
    const { alunoId } = useParams();

    const history = useHistory();

    const isEditing = Boolean(alunoId);

    const [initialValues, setInitialValues] = useState({});

    const title = isEditing ? 'Editar aluno' : 'Cadastrar aluno';

    useEffect(() => {
        const fetchAlunoDetails = async () => {
            try {
                const response = await axios.get(`/v1/alunos/${alunoId}`);
                setInitialValues(response.data);
            } catch (error) {
                getErrorMessage(error, 'Erro ao obter detalhes do aluno.');
            }
        };
        if (isEditing) {
            fetchAlunoDetails()
        }
    }, [alunoId, isEditing]);

    const updateAluno = async (alunoData) => {
        try {
            const response = await axios.put(`/v1/alunos${alunoId}`, alunoData);
            if (response.status === 200) {
                message.success('Aluno atualizado com sucesso!');
                history.push('/alunos');
            }
            return response.data;
        } catch (error) {
            getErrorMessage(error, 'Erro ao atualizar o aluno.');
        }
    };

    const onCancel = useCallback(() => {
        history.push('/alunos');
    }, [history]);

    const renderForm = useCallback(({ handleSubmit, form, ...props }) => {
        return (
            <FormContainer
                onSubmit={handleSubmit}
            >
                <Row gutter={ROW_GUTTER}>
                    <Col sm={24} md={12} lg={12}>
                        <Input.Field
                            label="Nome do aluno"
                            placeholder="Nome"
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
                    initialValues={initialValues}
                    render={renderForm}
                    onSubmit={updateAluno}
                />
            </Row>
        </LayoutPages>
    );
};
export default CreateUpdateAluno;
