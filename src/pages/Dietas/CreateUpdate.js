import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row, Typography, message } from 'antd';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import LayoutPages from '../../components/LayoutPages';
import { Form as FinalForm } from 'react-final-form';
import FormContainer from '../../components/Form';
import SaveCancelButton from '../../components/SaveCancelButton';
import axios from 'axios';
import Input from '../../components/Input';
import moment from 'moment-timezone';
import RefeicoesList from './components/RefeicoesList';
import { formatarHora } from '../../utils/masks';
import { getEnumByKeyAndDomain } from '../../utils/enums';
import { getErrorMessage } from '../../utils/error-helper';

const ROW_GUTTER = 24;

const CreateUpdateDieta = () => {

    const [dieta, setDieta] = useState({});

    const { alunoId, dietaId } = useParams();

    const location = useLocation()

    const history = useHistory();

    const isEditing = Boolean(location.pathname.startsWith('/editar-dieta'));

    const title = isEditing ? 'Editar planejamento de dieta' : 'Cadastrar planejamento de dieta';

    const onCancel = useCallback(() => {
        history.push('/alunos');
    }, [history]);


    const requestDieta = useCallback(async () => {
        if (isEditing) {
            try {
                const { data } = await axios.get(`/v1/planejamento-dieta/${dietaId}`);

                setDieta({
                    id: data?.id,
                    dataInicialDieta: data?.dataInicialDieta,
                    dataFinalDieta: data?.dataFinalDieta,
                    refeicoes: data?.refeicoes?.map(refeicao => ({
                        ...refeicao,
                        horaRefeicao: refeicao.horaRefeicao,
                        tipoRefeicao: getEnumByKeyAndDomain('TipoRefeicao', refeicao?.tipoRefeicao),
                        itensRefeicao: refeicao?.itensRefeicao?.map(item => ({
                            ...item,
                            unidadeMedida: getEnumByKeyAndDomain('UnidadeMedida', item?.unidadeMedida),
                        }))
                    }))
                })

            } catch (error) {
                getErrorMessage(error, 'Erro ao recuperar dieta.');
            }
        }

    }, [dietaId, isEditing]);

    useEffect(() => {
        const fetchData = async () => {
            await requestDieta();
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const montarObjetoRequest = useCallback((values) => {

        return {
            dataInicialDieta: values?.dataInicialDieta ? moment(values.dataInicialDieta).format('YYYY-MM-DD') : null,
            dataFinalDieta: values?.dataFinalDieta ? moment(values.dataFinalDieta).format('YYYY-MM-DD') : null,
            alunoId,
            refeicoes: values?.refeicoes?.map(refeicao => ({
                id: refeicao?.id || null,
                descricao: refeicao?.descricao,
                tipoRefeicao: refeicao?.tipoRefeicao?.key,
                horaRefeicao: formatarHora(refeicao.horaRefeicao),
                itensRefeicao: refeicao?.itensRefeicao?.map(item => ({
                    descricao: item?.descricao,
                    quantidade: item?.quantidade,
                    unidadeCaseira: item?.unidadeCaseira,
                    unidadeMedida: item?.unidadeMedida?.key
                }))
            }))
        }
    }, [alunoId]);

    const create = useCallback(async (values) => {
        const body = montarObjetoRequest(values);

        return axios.post('/v1/planejamento-dieta', body)
            .then(() => {
                message.success("Dieta cadastrada com sucesso");

                history.goBack()
            })
            .catch(error => getErrorMessage(error, 'Erro ao cadastrar a dieta.'))
    }, [history, montarObjetoRequest]);

    const update = useCallback(async (values) => {
        const body = montarObjetoRequest(values);

        return axios.put(`/v1/planejamento-dieta/${dietaId}`, body)
            .then(() => {
                message.success("Dieta editada com sucesso");
                history.goBack()
            })
            .catch(error => getErrorMessage(error, 'Erro ao editar a dieta.'))

    }, [dietaId, history, montarObjetoRequest]);
   
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
                            name="dataInicialDieta"
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
                            name="dataFinalDieta"
                            dateFormat="DD/MM/YYYY"
                            type="date"
                            required
                            allowClear
                        />
                    </Col>
                </Row>
                <RefeicoesList name="refeicoes" />

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
                    initialValues={dieta}
                />
            </div>
        </LayoutPages>
    );
};
export default CreateUpdateDieta;
