import './App.css';
import ImagePredictor from "./components/ImagePredictor";
import {Page, PageContent} from "./styles";

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
