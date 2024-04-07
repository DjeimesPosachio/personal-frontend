import React, { useCallback } from 'react';
import { Row, Col, Typography } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import LayoutPages from '../../components/LayoutPages';
import Input from '../../components/Input';
import { Form as FinalForm } from 'react-final-form';
import FormContainer from '../../components/Form';
import SaveCancelButton from '../../components/SaveCancelButtons';

const ROW_GUTTER = 24;

const CreateUpdateTreino = () => {

    const { alunoId } = useParams();

    const history = useHistory();

    const isEditing = Boolean(alunoId);

    const title = isEditing ? 'Editar treino' : 'Cadastrar treino';

    const onCancel = useCallback(() => {
        history.push('/alunos');
    }, [history]);

    const renderForm = useCallback(({ handleSubmit, form, ...props }) => {
        return (
            <FormContainer
                onSubmit={handleSubmit}
            >
                <Row gutter={ROW_GUTTER}>
                    <Col sm={24} md={12} lg={8}>
                        <Input.Field
                            label="Exercício"
                            placeholder="Exercício"
                            name="nomeExercicio"
                            required
                            allowClear
                        />
                    </Col>

                    <Col sm={24} md={12} lg={8}>
                        <Input.Field
                            label="Séries"
                            placeholder="Séries"
                            name="qtdSeries"
                            required
                            allowClear
                        />
                    </Col>

                    <Col sm={24} md={12} lg={8}>
                        <Input.Field
                            label="Repetições"
                            placeholder="Repetições"
                            name="qtdRepeticoes"
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
export default CreateUpdateTreino;
