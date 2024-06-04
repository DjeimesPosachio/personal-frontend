import React, { Suspense, forwardRef, memo, useCallback, useState } from 'react';
import { wrapField } from '../../utils/wrap-field';

import { Form, Select, Spin, message } from 'antd';
import axios from 'axios';
import { useRequestSearchType } from '../../hooks/useRequestSearchType';

const InputSearch = memo(forwardRef((props, ref) => {

    const { label, meta, input, formItemProps,
        hasFeedback, required,
        searchType, params = {}
    } = props;

    const { onChange, value } = input;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [initialLoad, setInitialLoad] = useState(false);

    const requestOptions = useRequestSearchType(searchType);

    const fetchData = async (search, page) => {
        setLoading(true);
        try {

            const response = await axios.get(requestOptions.endpoint, {
                params: {
                    filtro: search,
                    page,
                    size: 20,
                    ...params
                }
            });

            const results = requestOptions.formatter(response.data.content);

            setData(prevData => page === 0 ? results : [...prevData, ...results]);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            message.error('Erro ao buscar dados');
        } finally {
            setLoading(false);
        }
    };

    const pickOptionProps = useCallback(option => {
        return {
            key: option.item.id,
            label: option.label,
            item: option.item,
        };
    }, []);

    const handleSearch = (value) => {
        setSearchTerm(value);
        setPage(0);
        setData([]);
        if (value) {
            fetchData(value, 0);
        }
    };

    const handlePopupScroll = (e) => {
        const { target } = e;
        if (target.scrollTop + target.clientHeight === target.scrollHeight) {
            if (page < totalPages - 1 && !loading) {
                const nextPage = page + 1;
                setPage(nextPage);
                fetchData(searchTerm, nextPage);
            }
        }
    };

    const handleDropdownVisibleChange = (open) => {
        if (open && !initialLoad) {
            setInitialLoad(true);
            fetchData(searchTerm, 0);
        }
    };

    const handleSelect = useCallback((value, option) => {

        onChange(pickOptionProps(option));

    }, [onChange, pickOptionProps]);

    function renderInput() {

        const inputProps = { ...props }

        delete inputProps.label
        delete inputProps.formItemProps
        delete inputProps.charCounter
        delete inputProps.hasFormItem
        delete inputProps.meta
        delete inputProps.input
        delete inputProps.parser

        return (
            <Select
                {...inputProps}
                showSearch
                value={value}
                notFoundContent={loading ? <Spin size="small" /> : null}
                filterOption={false}
                onSearch={handleSearch}
                onPopupScroll={handlePopupScroll}
                onDropdownVisibleChange={handleDropdownVisibleChange}
                onSelect={handleSelect}
            >
                {data.map(item => (
                    <Select.Option key={item.key} children={item.label} {...item}>
                        {item.label}
                    </Select.Option>
                ))}
            </Select>
        )
    }


    return (
        <Suspense
            fallback="loading"
        >
            <Form.Item
                label={required ? <><span style={{ color: 'red' }}>*</span>&nbsp;{label}</> : label}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                validateStatus={meta.touched && meta.error ? 'error' : ''}
                help={meta.touched && meta.error ? meta.error : ''}
                hasFeedback={!meta.active && meta.touched && hasFeedback}
                {...formItemProps}
            >
                {renderInput()}
            </Form.Item>
        </Suspense>
    )
}))

InputSearch.defaultProps = {
    hasFormItem: true,
    meta: {},
}

InputSearch.Field = wrapField(InputSearch)

export default InputSearch;
