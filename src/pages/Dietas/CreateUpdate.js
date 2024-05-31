import React, { useCallback } from 'react';
import { Col, Row, Typography, message } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import LayoutPages from '../../components/LayoutPages';
import { Form as FinalForm } from 'react-final-form';
import FormContainer from '../../components/Form';
import SaveCancelButton from '../../components/SaveCancelButton';
import axios from 'axios';
import Input from '../../components/Input';
import moment from 'moment-timezone';
import RefeicoesList from './components/RefeicoesList';

const ROW_GUTTER = 24;

const CreateUpdateDieta = () => {

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
            dataInicialDieta: values?.dataInicialDieta ? moment(values.dataInicialDieta).format('YYYY-MM-DD') : null,
            dataFinalDieta: values?.dataFinalDieta ? moment(values.dataFinalDieta).format('YYYY-MM-DD') : null,
            //TODO verificar de onde virá esse id do aluno aki
            alunoId: 1,
            refeicoes: values?.refeicoes?.map(refeicao => ({
                id: refeicao?.id || null,
                descricao: refeicao?.descricao,
                tipoRefeicao: refeicao?.tipoRefeicao?.key,
                horaRefeicao: '09:09',
                itensRefeicao: refeicao?.itensRefeicao?.map(item => ({
                    descricao: item?.descricao,
                    quantidade: item?.quantidade,
                    unidadeCaseira: item?.unidadeCaseira,
                    unidadeMedida: item?.unidadeMedida?.key
                }))
            }))
        }
    }, []);

    const handleSave = useCallback(async (values) => {
        const body = montarObjetoRequest(values);

        return axios.post('/v1/planejamento-dieta', body)
            .then(() => {
                message.success("Dieta cadastrada com sucesso");

                history.goBack()
            })
            .catch(error => message.error('Erro ao cadastrar a dieta'))


    }, [history, montarObjetoRequest]);

    const data = {
        dataInicialDieta: "2024-05-10",
        dataFinalDieta: "2024-06-04",
        alunoId: 1,
        refeicoes: [
            {
                id: '1',
                descricao: 'Exemplo de descrição do dieta',
                horaRefeicao: '09:09:00',
                tipoRefeicao: "CAFE_MANHA",
                itensRefeicao: [
                    {
                        descricao: "Pão de forma",
                        quantidade: 1,
                        unidadeCaseira: 1,
                        unidadeMedida: "UNIDADE"
                    },
                    {
                        descricao: "Suco de maçã",
                        quantidade: 2,
                        unidadeCaseira: 1,
                        unidadeMedida: "UNIDADE"
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
                    onSubmit={handleSave}
                    initialValues={data}
                />
            </div>
        </LayoutPages>
    );
};
export default CreateUpdateDieta;
