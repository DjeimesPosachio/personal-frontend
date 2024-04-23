import React, { useCallback } from 'react';
import { Row, Col, Typography } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import LayoutPages from '../../components/LayoutPages';
import Input from '../../components/Input';
import { Form as FinalForm } from 'react-final-form';
import FormContainer from '../../components/Form';
import SaveCancelButton from '../../components/SaveCancelButton';

const ROW_GUTTER = 24;

const CreateUpdateUser = () => {

    const { alunoId } = useParams();

    const history = useHistory();

    const isEditing = Boolean(alunoId);

    const title = isEditing ? 'Editar aluno' : 'Cadastrar aluno';

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
                            name="nomeAluno"
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
                    <Col sm={24} md={12} lg={12}>
                        <Input.Field
                            label="Telefone"
                            placeholder="Telefone"
                            name="telefone"
                            required
                            allowClear
                        />
                    </Col>

                    <Col sm={24} md={12} lg={12}>
                        <Input.Field
                            label="CPF"
                            placeholder="CPF"
                            name="cpf"
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
export default CreateUpdateUser;
