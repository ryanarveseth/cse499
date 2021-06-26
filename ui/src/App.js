import './App.css';
import ImagePredictor from "./components/ImagePredictor";
import styled from "styled-components";

const Page = styled.div`
  background: #505050;
  height: 100vh;
  width: 100vw;
`

const PageContent = styled.div`
  padding: 32px;
`;

const App = () => {
  return (
    <Page className="App">
      <PageContent>
        <ImagePredictor/>
      </PageContent>
    </Page>
  );
}

export default App;
