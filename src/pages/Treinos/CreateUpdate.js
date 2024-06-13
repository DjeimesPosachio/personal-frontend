import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row, Typography, message } from 'antd';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import LayoutPages from '../../components/LayoutPages';
import { Form as FinalForm } from 'react-final-form';
import FormContainer from '../../components/Form';
import SaveCancelButton from '../../components/SaveCancelButton';
import TreinosList from './components/TreinosList';
import axios from 'axios';
import Input from '../../components/Input';
import moment from 'moment-timezone';
import { getEnumByKeyAndDomain } from '../../utils/enums';

const ROW_GUTTER = 24;

const CreateUpdateTreino = () => {

    const [treino, setTreino] = useState({});

    const { alunoId } = useParams();

    const location = useLocation()

    const history = useHistory();

    const isEditing = Boolean(location.pathname.startsWith('/editar-treino'));

    const title = isEditing ? 'Editar planejamento de treino' : 'Cadastrar planejamento de treino';

    const onCancel = useCallback(() => {
        history.push('/alunos');
    }, [history]);

    const requestTreino = useCallback(async () => {
        if (isEditing) {
            try {
                const { data } = await axios.get(`/v1/planejamento-treino/recuperar-ultimo/${alunoId}`);

                setTreino({
                    id: data?.id,
                    dataInicialPlano: data?.dataInicialPlano,
                    dataFinalPlano: data?.dataFinalPlano,
                    treinos: data?.treinos?.map(treino => ({
                        ...treino,
                        sequenciaTreino: getEnumByKeyAndDomain('SequenciaTreino', treino?.sequenciaTreino),
                        metricasExercicios: treino?.metricasExercicios?.map(item => ({ ...item }))
                    }))
                })

            } catch (error) {
                message(error?.response?.data?.error);
            }

        }
    }, [alunoId, isEditing]);

    useEffect(() => {
        const fetchData = async () => {
            await requestTreino();
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const montarObjetoRequest = useCallback((values) => {

        return {
            dataInicialPlano: values?.dataInicialPlano ? moment(values.dataInicialPlano).format('YYYY-MM-DD') : null,
            dataFinalPlano: values?.dataFinalPlano ? moment(values.dataFinalPlano).format('YYYY-MM-DD') : null,
            alunoId,
            treinos: values?.treinos?.map(treino => {
                return {
                    id: treino?.id || null,
                    descricao: treino?.descricao,
                    sequenciaTreino: treino?.sequenciaTreino?.key,
                    metricasExercicios: treino?.metricasExercicios?.map(item => {
                        return {
                            id: item?.id || null,
                            series: item?.series || null,
                            repeticoes: item?.repeticoes || null,
                            tempoDescanso: item?.tempoDescanso || null,
                            exercicioId: item?.exercicio?.key || null,
                            observacao: item?.observacao || null
                        }
                    })
                }
            })
        }
    }, [alunoId]);

    const create = useCallback(async (values) => {
        const body = montarObjetoRequest(values);

        return axios.post('/v1/planejamento-c', body)
            .then(() => {
                message.success('Planejamento de treino cadastrado com sucesso.')
                history.goBack()
            })
            .catch(error => message.error('Erro ao cadastrar o planejamento do treino'))

    }, [history, montarObjetoRequest]);

    const update = useCallback(async (values) => {
        const body = montarObjetoRequest(values);

        return axios.put('/v1/planejamento-treino', body)
            .then(() => {
                message.success('Planejamento de treino editado com sucesso.')

                history.goBack()
            })
            .catch(error => message.error('Erro ao editar o planejamento de treino'))

    }, [history, montarObjetoRequest]);
   
    const onSubmit = isEditing ? update : create;

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
                    onSubmit={onSubmit}
                    initialValues={treino}
                />
            </div>
        </LayoutPages>
    );
};
export default CreateUpdateTreino;
