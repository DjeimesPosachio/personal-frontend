import React, { useCallback } from 'react';
import { Col, Row, Typography, message } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import LayoutPages from '../../components/LayoutPages';
import { Form as FinalForm } from 'react-final-form';
import FormContainer from '../../components/Form';
import SaveCancelButton from '../../components/SaveCancelButton';
import TreinosList from './components/TreinosList';
import axios from 'axios';
import Input from '../../components/Input';
import moment from 'moment-timezone';

const ROW_GUTTER = 24;

const CreateUpdateTreino = () => {

    //TODO verificar de onde virá esse id do aluno aki
    const { alunoId } = useParams();

    const history = useHistory();

    const isEditing = Boolean(alunoId);

    const title = isEditing ? 'Editar planejamento' : 'Cadastrar planejamento';

    const onCancel = useCallback(() => {
        history.push('/alunos');
    }, [history]);

    const montarObjetoRequest = useCallback((values) => {

        return {
            dataInicialPlano: values?.dataInicialPlano ? moment(values.dataInicialPlano).format('YYYY-MM-DD') : null,
            dataFinalPlano: values?.dataFinalPlano ? moment(values.dataFinalPlano).format('YYYY-MM-DD') : null,
            //TODO verificar de onde virá esse id do aluno aki
            alunoId: 1,
            treinos: values?.treinos?.map(treino => {
                return {
                    id: treino?.id || null,
                    descricao: treino?.description,
                    metricasExercicios: treino?.metricasExercicios?.map(item => {
                        return {
                            id: item?.id || null,
                            series: item?.series || null,
                            repeticoes: item?.repeticoes || null,
                            tempoDescanso: item?.tempoDescanso || null,
                            // TODO corridir esse atributo quando tiver inputsearch
                            exercicioId: item?.exercicioId || null,
                            observacao: item?.observacao || null
                        }
                    })
                }
            })
        }
    }, []);

    const handleSave = useCallback(async (values) => {
        const body = montarObjetoRequest(values);

        return axios.post('/v1/planejamento-treino', body)
            .then(() => {
                message.success('Planejamento de treino cadastrado com sucesso.')
                history.goBack()
            })
            .catch(error => message.error('Erro ao cadastrar o planejamento do treino'))


    }, [history, montarObjetoRequest]);

    const data = {
        dataInicialPlano: "2024-05-10",
        dataFinalPlano: "2024-06-04",
        userId: 1,
        treinos: [
            {
                id: '1',
                descricao: 'A',
                metricasExercicios: [
                    {
                        id: 1,
                        series: 4,
                        repeticoes: 1,
                        tempoDescanso: 12,
                        observacao: 'Obs 1',
                        exercicioId: 1
                    },
                    {
                        id: 2,
                        series: 3,
                        repeticoes: 2,
                        tempoDescanso: 17,
                        observacao: 'Obs 1',
                        exercicioId: 2
                    }
                ]
            }
        ]
    }

    const renderForm = useCallback(({ handleSubmit, form, ...props }) => {
        return (
            <FormContainer
                onSubmit={handleSubmit}
            >
                <Row gutter={ROW_GUTTER}>
                    <Col sm={24} md={12} lg={12}>
                        <Input.Field
                            label="Data final"
                            placeholder="Data final"
                            name="dataInicialPlano"
                            dateFormat="DD/MM/YYYY"
                            type="date"
                            required
                            allowClear
                        />
                    </Col>

                    <Col sm={24} md={12} lg={12}>
                        <Input.Field
                            label="Data final"
                            placeholder="Data final"
                            name="dataFinalPlano"
                            dateFormat="DD/MM/YYYY"
                            type="date"
                            required
                            allowClear
                        />
                    </Col>
                </Row>
                <TreinosList name="treinos" />

                <Row gutter={ROW_GUTTER}>
                    <SaveCancelButton
                        onCancel={onCancel}
                    />
                </Row>
            </FormContainer>
        )
    }, [onCancel])

    return (
        <LayoutPages>
            <Typography.Title
                level={3}>
                {title}
            </Typography.Title>

            <div style={{ marginTop: '50px' }}>
                <FinalForm
                    render={renderForm}
                    onSubmit={handleSave}
                    initialValues={data}
                />
            </div>
        </LayoutPages>
    );
};
export default CreateUpdateTreino;
