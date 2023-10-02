import styled from 'styled-components';
import {ReactNode} from 'react';

export interface LayoutProps {
  children?: never[];
  header: ReactNode;
  content?: ReactNode;
}

const StyledLayout = styled.div`
  display: grid;
  grid-template-areas:
    "header"
    "content";
  grid-template-rows: 60px auto;
  height: 100vh;
`;

const StyledHeader = styled.header`
  grid-area: header;
  background-color: #f2f2f2;
  padding: 10px;
`;

const StyledContent = styled.div`
  grid-area: content;
  background-color: #fff;
  padding: 10px;
`;

export function Layout({header, content}: LayoutProps): JSX.Element {
  return (
    <StyledLayout>
      <StyledHeader>{header}</StyledHeader>
      {content && <StyledContent>{content}</StyledContent>}
    </StyledLayout>
  );
}

export default Layout;
