import styled from 'styled-components';
import {Layout} from './shared';
import Header from './header/header';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Layout header={<Header></Header>} content={<span>conten2t</span>}></Layout>
    </StyledApp>
  );
}

export default App;
