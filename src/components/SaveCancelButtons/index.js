import React from 'react';
import { Button } from 'antd';

import styles from './styles.module.scss';

const SaveCancelButton = ({ onSave, onCancel }) => {
    return (
        <div className={styles.buttonGroup}>
            <Button
                type="primary"
                onClick={onSave}
            >
                Salvar
            </Button>
            <Button
                onClick={onCancel}
            >
                Cancelar
            </Button>
        </div>
    );
};

export default SaveCancelButton;
