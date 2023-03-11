import styled from 'styled-components'
// import {Search} from '@styled-icons/bootstrap/Search';

export const SearchFormWrapper = styled.form`
  //position: fixed;
  //z-index: 11;
  //top: -67px;
  //right: 0;
  display: flex;
  //margin-left: auto;
  //margin-right: 20px;
  margin-top: 80px;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 2px;
  overflow: hidden;
`

export const SearchFormInput = styled.input`
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  width: 100%;
  font: inherit;
  font-size: 16px;
  outline: none;
  
  &::placeholder{
    font: inherit;
    font-size: 18px;
  }
`;