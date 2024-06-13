import { useState } from 'react';
import { useWindowSize } from './useWindowSize';

const DEFAULT_SIZES = {
    xxlX: 700,
    xxlY: 600,
    xlX: 600,
    xlY: 550,
    lgX: 800,
    lgY: 450,
    mdX: 500,
    mdY: 550,
    smX: 400,
    smY: 300,
};

export const useResponsiveScroll = (dimensions = {}) => {
    const { size } = useWindowSize();
    const [options] = useState(dimensions);

    const scroll = {
        x: options.xxlX || DEFAULT_SIZES.xxlX,
        y: options.xxlY || DEFAULT_SIZES.xxlY,
    };

    if (size === 'xl') {
        scroll.x = options.xlX || DEFAULT_SIZES.xlX;
        scroll.y = options.xlY || DEFAULT_SIZES.xlY;
    } else if (size === 'lg') {
        scroll.x = options.lgX || DEFAULT_SIZES.lgX;
        scroll.y = options.lgY || DEFAULT_SIZES.lgY;
    } else if (size === 'md') {
        scroll.x = options.mdX || DEFAULT_SIZES.mdX;
        scroll.y = options.mdY || DEFAULT_SIZES.mdY;
    } else if (size === 'sm') {
        scroll.x = options.smX || DEFAULT_SIZES.smX;
        scroll.y = options.smY || DEFAULT_SIZES.smY;
    }

    return { scroll };
};