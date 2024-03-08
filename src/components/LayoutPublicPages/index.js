import { Col, Layout, Row } from 'antd';

import styles from './styles.module.scss';

const { Content } = Layout;

export const LayoutPublicPages = ({
    children, title, maxWidth
}) => {

    return (
        <Layout className={styles.layout}>
                <Content className={styles.content}>
                    <Row
                        className={styles.rowContainer}
                        style={{
                            maxWidth,
                        }}
                    >
                        <Col>
                            <div className={styles.contentContainer}>
                                <div className={styles.imageContainer}>
                                    <img
                                        src={require('../../assets/logoCollapsed.png')}
                                        alt="Logotipo"
                                        height="100px"
                                        className={styles.logoContainer}
                                    />
                                </div>
                                <div className={styles.formContainer}>
                                    <p className={styles.title}>{title}</p>
                                    {children}
                                </div>
                            </div>
                        </Col>
                    </Row>

                </Content>
        </Layout>
    );
};