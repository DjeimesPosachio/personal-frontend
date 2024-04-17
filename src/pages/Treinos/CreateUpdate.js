import React, { useCallback } from 'react';
import { Row, Typography } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import LayoutPages from '../../components/LayoutPages';
import { Form as FinalForm } from 'react-final-form';
import FormContainer from '../../components/Form';
import SaveCancelButton from '../../components/SaveCancelButtons';
import TreinosList from './components/TreinosList';

const ROW_GUTTER = 24;

const CreateUpdateTreino = () => {

    const { alunoId } = useParams();

    const history = useHistory();

    const isEditing = Boolean(alunoId);

    const title = isEditing ? 'Editar treino' : 'Cadastrar treino';

    const onCancel = useCallback(() => {
        history.push('/alunos');
    }, [history]);

    const data = {
        dias: [
            {
                id: '1',
                detalhe: 'A',
                descricao: 'Dorsais e bíceps',
                exercicios: [
                    {
                        nomeExercicio: 'Exercício teste'
                    }
                ]
            },
            {
                id: '2',
                detalhe: 'B',
                descricao: 'Peito e tríceps',
            },
            {
                id: '3',
                detalhe: 'C',
                descricao: 'Quadríceps e posterior',
            },
        ]
    }

    const renderForm = useCallback(({ handleSubmit, form, ...props }) => {

        return (
            <FormContainer
                onSubmit={handleSubmit}
            >
                <TreinosList name="dias"/>

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
                    initialValues={{dias: data}}
                />
            </Row>
        </LayoutPages>
    );
};
export default CreateUpdateTreino;
