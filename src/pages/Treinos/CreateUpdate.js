import React, { useCallback } from 'react';
import { Row, Typography } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import LayoutPages from '../../components/LayoutPages';
import { Form as FinalForm } from 'react-final-form';
import FormContainer from '../../components/Form';
import SaveCancelButton from '../../components/SaveCancelButton';
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
                classTreino: 'A',
                descricao: 'Dorsais e bíceps',
                exercicios: [
                    {
                        nomeExercicio: 'Exercício teste'
                    },
                    {
                        nomeExercicio: 'Exercício teste'
                    }
                ]
            },
            {
                id: '2',
                classTreino: 'B',
                descricao: 'Peito e tríceps',
            },
            {
                id: '3',
                classTreino: 'C',
                descricao: 'Quadríceps e posterior',
            },
        ]
    }

    const renderForm = useCallback(({ handleSubmit, form, ...props }) => {

        return (
            <FormContainer
                onSubmit={handleSubmit}
            >
                <TreinosList name="dias" />

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
            <Typography.Title
                level={3}>
                {title}
            </Typography.Title>

            <Row style={{ marginTop: '50px' }}>
                <FinalForm
                    render={renderForm}
                    onSubmit
                    initialValues={data}
                />
            </Row>
        </LayoutPages>
    );
};
export default CreateUpdateTreino;