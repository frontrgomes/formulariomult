import { Link, useNavigate } from "react-router-dom";
import * as C from "./styles";
import {useForm, FormActions} from "../../contexts/FormContext";
import {Theme} from "../../components/Theme";
import { ChangeEvent, useEffect } from "react";
import { SelectOption } from "../../components/SelectOption";


export const FormStep2 = () => {
    const navigate = useNavigate();
    const{state, dispatch} = useForm();//state os dados e dispatch modificadores

    useEffect(()=>{
        if(state.name === ''){
            navigate('/');
        }else{
            dispatch({
                type: FormActions.setCurrentStep,
                payload:2
            });
        }
    },[]);

    const handleNextStep = () => {
        if(state.name !== ''){
            navigate('/step3');
        }else{
            alert('Preencha seu Nome');
        }
        
    }
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type:FormActions.setName,
            payload: e.target.value
        });
    }
    const setLevel = (level:number) => {
        dispatch({
            type:FormActions.setLevel,
            payload:level
        });
    }
    return(
        <Theme>
            <C.Container>
                <p>Passo 2/3</p>
                <h1>{state.name}, o que melhor descreve você?</h1>
                <p>Escolha a opção que melhor condiz com seu estado atual, profissionalmente.</p>

                <hr/>
                <SelectOption 
                    title="Sou iniciante"
                    description="Começei a programar a 2 anos"
                    icon="😀"
                    selected={state.level === 0}
                    onClick={()=> setLevel(0)}
                />
                <SelectOption 
                    title="Sou Programador"
                    description="Já programo há 2 anos ou mais"
                    icon="🤠"
                    selected={state.level === 1}
                    onClick={()=> setLevel(1)}
                />
                <Link className="backbutton" to="/">Voltar</Link>
                <button onClick={handleNextStep}>Próximo</button>
            </C.Container>
        </Theme>
    );
}