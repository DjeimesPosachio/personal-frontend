import React, { useCallback } from 'react';
import { Layout, Button, theme, Row } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import LayoutPages from '../../components/LayoutPages';

const { Content } = Layout;

const CreateUpdateUser = () => {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    const { alunoId } = useParams();

    const history = useHistory();

    const isEditing = Boolean(alunoId);

    const title = isEditing ? 'Editar aluno' : 'Cadastrar aluno';

    const onHistoryBack = useCallback(() => {
        history.push('/alunos');
    }, [history]);

    return (
        <LayoutPages>
            <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 807,
                    fontSize: 22,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <Row
                    justify="space-between"
                    style={{
                        fontSize: 22,
                    }}>
                    <span>{title}</span>
                    <Button
                        type="primary"
                        onClick={onHistoryBack}
                        style={{
                            justifyContent: 'left'
                        }}
                    >
                        Cancelar
                    </Button>
                </Row>

            </Content>
        </LayoutPages>
    );
};
export default CreateUpdateUser;
