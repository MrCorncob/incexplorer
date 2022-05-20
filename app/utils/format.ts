import { BigNumber } from 'bignumber.js';
import floor from 'lodash/floor';
import moment from 'moment';
import convert from './convert';
import { getGroupSeparator, getDecimalSeparator } from './separator';

interface IAmount {
    originalAmount?: number;
    humanAmount?: number;
    decimals: number;
    clipAmount?: boolean;
    decimalDigits?: boolean;
    maxDigits?: number;
}

const removeTrailingZeroes = ({ amountString }: { amountString: string }) => {
    let formattedString = amountString;
    const decimalSeparator = getDecimalSeparator();
    while (
        formattedString.length > 0 &&
        ((formattedString.includes(decimalSeparator) && formattedString[formattedString.length - 1] === '0') ||
            formattedString[formattedString.length - 1] === decimalSeparator)
    ) {
        formattedString = formattedString.slice(0, formattedString.length - 1);
    }

    return formattedString;
};

interface IMaxDigits {
    decimalDigits: boolean;
    clipAmount: boolean;
    decimals: number;
    humanAmount: number;
}

const getMaxDecimalDigits = (payload: IMaxDigits) => {
    const { decimals, decimalDigits, clipAmount, humanAmount } = payload;
    let maxDigits = decimals;
    try {
        if (clipAmount) {
            if (humanAmount > 0 && humanAmount < 1 && !!decimalDigits) {
                maxDigits = 5;
            }
            if (humanAmount > 1) {
                maxDigits = 4;
            }
            if (humanAmount > 1e3) {
                maxDigits = 2;
            }
            if (humanAmount > 1e5) {
                maxDigits = 0;
            }
        }
    } catch (error) {
        maxDigits = decimals;
        throw error;
    }
    return maxDigits;
};

interface IToFixed {
    number: number;
    decimals: number;
}

const toFixed = (payload: IToFixed) => {
    const decimalSeparator = getDecimalSeparator();
    const { number, decimals } = payload;
    const bigNumber = new BigNumber(number);
    if (bigNumber.isNaN()) {
        return '0';
    }
    return removeTrailingZeroes({
        amountString: bigNumber.toFixed(decimals).replace('.', decimalSeparator),
    });
};

const formatAmount = (payload: IAmount) => {
    const { originalAmount, humanAmount, decimals, clipAmount = true, decimalDigits = true } = payload;
    const decimalSeparator = getDecimalSeparator();
    const groupSeparator = getGroupSeparator();
    const fmt = {
        decimalSeparator,
        groupSeparator,
        groupSize: 3,
    };
    let formatedAmount;
    try {
        const convertHumanAmount =
            humanAmount ||
            convert.toHumanAmount({
                originalAmount,
                decimals,
            });
        const maxDigits = getMaxDecimalDigits({
            clipAmount,
            decimalDigits,
            decimals,
            humanAmount: convertHumanAmount,
        });
        let fixedNumber = convertHumanAmount;
        if (decimals) {
            fixedNumber = floor(convertHumanAmount, Math.min(decimals, maxDigits));
        } else {
            fixedNumber = floor(convertHumanAmount, maxDigits);
        }
        const fixedString = toFixed({
            number: fixedNumber,
            decimals,
        });
        const amountString = new BigNumber(fixedString).toFormat(maxDigits, BigNumber.ROUND_DOWN, fmt);
        formatedAmount = removeTrailingZeroes({
            amountString,
        });
    } catch (error) {
        formatedAmount = '0';
        throw error;
    }
    return formatedAmount;
};

const formatUnixDateTime = (dateTime: number, formatPattern = 'DD MMM HH:mm:ss') =>
    moment.unix(dateTime).format(formatPattern);
  
    const formatDateTime = (dateTime: string, formatPattern = 'DD MMM HH:mm:ss') =>
    moment(dateTime).format(formatPattern);

const number = (num: number) => {
    const fmt = {
        decimalSeparator: getDecimalSeparator(),
        groupSeparator: getGroupSeparator(),
        groupSize: 3,
    };
    const rs = new BigNumber(num);
    return rs.isFinite() ? rs.toFormat(fmt) : num;
};

export const formatTime = (seconds: number) => {
    let h = `0${Math.floor(seconds / 3600)}`.slice(-2);
    let m = `0${Math.floor(seconds / 60) % 60}`.slice(-2);
    let s = `0${seconds % 60}`.slice(-2);
    return `${h}:${m}:${s}`;
};

export const getTokenIcon = (token: string) => {
    try {
        let nane = token.replace('p', '').toLowerCase();
        return `https://s3.amazonaws.com/incognito-org/wallet/cryptocurrency-icons/32@2x/color/${nane}@2x.png`;
    } catch (error) {
        return 'https://incscan.io/static/default_token_icon.png';
    }
};

export const getTagTxTypeColor = (typeid: string) => {
    const colors = [
        { key: '206', color: '#009688' },
        { key: '205', color: '#527529' },
        { key: '24', color: '#4caf50' },
        { key: '25', color: '#87d068' },
        { key: '250', color: '#87d068' },
        { key: '251', color: '#87d068' },
        { key: '260', color: '#87d068' },
        { key: '261', color: '#87d068' },
        { key: '80', color: '#87d068' },
        { key: '81', color: '#87d068' },
        { key: '82', color: '#87d068' },
        { key: '240', color: '#f50' },
        { key: '252', color: '#f50' },
        { key: '262', color: '#f50' },
        { key: '26', color: '#f50' },
    ];
    let color = '#607d8b';
    colors.forEach((item) => {
        if (item.key === typeid) {
            color = item.color;
        }
    });
    return color;
};

const format = {
    formatAmount,
    formatUnixDateTime,
    formatDateTime,
    number,
    toFixed,
    formatTime,
    getTokenIcon,
    getTagTxTypeColor,
};

export default format;
