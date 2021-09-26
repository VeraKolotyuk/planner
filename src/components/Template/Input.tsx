import styled from 'styled-components';
import {formFieldStyles} from './FormField';

const Input = styled.input`
    ${formFieldStyles};
    font-family: Helvetica, sans-serif;
    height: 1rem;
`;

export default Input;