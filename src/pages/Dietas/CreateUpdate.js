import React, { useCallback } from 'react';
import { Row, Col, Typography } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import LayoutPages from '../../components/LayoutPages';
import Input from '../../components/Input';
import { Form as FinalForm } from 'react-final-form';
import FormContainer from '../../components/Form';
import SaveCancelButton from '../../components/SaveCancelButton';

const ROW_GUTTER = 24;

const CreateUpdateDieta = () => {

    const { alunoId } = useParams();

    const history = useHistory();

    const isEditing = Boolean(alunoId);

    const title = isEditing ? 'Editar dieta' : 'Cadastrar dieta';

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
                            label="Alimento"
                            placeholder="Alimento"
                            name="nomeAlimento"
                            required
                            allowClear
                        />
                    </Col>

                    <Col sm={24} md={12} lg={12}>
                        <Input.Field
                            label="Quantidade"
                            placeholder="Quantidade"
                            name="qtdAlimento"
                            required
                            allowClear
                        />
                    </Col>
                </Row>
                <Row gutter={ROW_GUTTER}>
                    <Col sm={24} md={12} lg={12}>
                        <Input.Field
                            label="Unidade caseira"
                            placeholder="Unidade caseira"
                            name="unidadeCaseira"
                            allowClear
                        />
                    </Col>

                    <Col sm={24} md={12} lg={12}>
                        <Input.Field
                            label="Substituição"
                            placeholder="Substituição"
                            name="alimentoSubstituicao"
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
export default CreateUpdateDieta;
