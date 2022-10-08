import {Children, createContext, ReactNode, useContext, useReducer} from 'react';

//types
//Type dos Dados - State
type State = {
    currentStep:number;
    name:string;
    level:0 | 1;
    email:string;
    github:string;
};
//Type da Action - payload

type Action = {
    type:FormActions;//Os tipos de açoes vem FormActions
    payload:any;
};
//Type do Contexto
type ContexType = {
    state: State;
    dispatch: (action: Action) => void;
}
//Type do Povider
type FormProviderProps = {
    //react node tem  que ser exportado lá enciam
    children: ReactNode
}

//initialState
const initialData: State = {
    currentStep:0,
    name: '',
    level:0,
    email:'',
    github:''
}


//Context
const FormContext = createContext<ContexType | undefined>(undefined);
//Reducer

//Enum é para ter uma variavel com os tipos de ações
//Exportei pra usar fora
export enum FormActions {
    setCurrentStep,
    setName,
    setLevel,
    setEmail,
    setGitHub
}
const formReducer = (state: State, action: Action) => {
    switch(action.type){
        //Primeiro chama os nomes dentro do Enem e se caso for
        //ele retorna a copia o status e modifica ela
        // e se não achar ele volta com o status padrão

        case FormActions.setCurrentStep:
            return {...state, currentStep: action.payload};
        case FormActions.setName:
            return{...state, name:action.payload};
        case FormActions.setLevel:
            return{...state, level:action.payload};
        case FormActions.setEmail:
            return{...state, email:action.payload};
        case FormActions.setGitHub:
            return{...state, github: action.payload};
        default:
            return state;
    }
}

//Provider
//Criei uma função e passei o filho dela
//exportei pra usar fora
export const FormProvider = ({children}: FormProviderProps) => {
    //ele usa o hook reducer
    //passando o form reducer e as informações iniciais que é criada acima
    //state é os dados e dispatch muda as informações
    const[state, dispatch] = useReducer(formReducer, initialData);
    //variavel value com o state e dispatch
    const value = {state, dispatch};

    return(
        //Ele usa o nome context acima com o provider
        //Provider é como uma função
        //value ele pega dos reduceres
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    );
}

//context Hook pra ter acessos 
//exportei pra usar fora
export const useForm = () => {
    // função pra usar o contexto
    const context = useContext(FormContext);
    if(context === undefined){
        throw new Error('useForm precisa ser usado apenas dentro do FormProvider');
    }
    return context;
}