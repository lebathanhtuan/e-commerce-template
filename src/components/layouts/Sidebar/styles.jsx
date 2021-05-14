import styled, { css } from 'styled-components';

export const SidebarContainer = styled.div`
  position: fixed;
  top: 56px;
  width: 300px;
  height: calc(100vh - 56px);
  background-color: #e6fffb;
`;

export const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: ${(props) => props.height || '50px'};
  cursor: pointer;

  &:hover {
    background-color: #b5f5ec;
  }

  ${(props) => props.active && css`
    background-color: #b5f5ec;
    border-right: 5px solid #5cdbd3;
  `}
`;
