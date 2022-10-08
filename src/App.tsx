import { Rota } from './rota';
import { FormProvider } from './contexts/FormContext';

function App() {
  return (
    <FormProvider>
        <Rota/>
    </FormProvider>
  );
}

export default App;

