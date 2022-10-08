import { Link, useNavigate } from "react-router-dom";
import * as C from "./styles";
import {useForm, FormActions} from "../../contexts/FormContext";
import {Theme} from "../../components/Theme";
import { ChangeEvent, useEffect } from "react";

export const FormStep3 = () => {
    const navigate = useNavigate();
    const{state, dispatch} = useForm();//state os dados e dispatch modificadores

    useEffect(()=>{
        dispatch({
            type: FormActions.setCurrentStep,
            payload:3
        });
    },[]);

    const handleNextStep = () => {
        if(state.email !== '' && state.github !== ''){
            alert('Cadastro finalizado com sucesso');
            console.log(state);
            navigate('/');
        }else{
            alert('Preencha seus Dados');  
        }
    }
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type:FormActions.setEmail,
            payload: e.target.value
        });
    }
    const handleGithubChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type:FormActions.setGitHub,
            payload: e.target.value
        });
    }
    
    return(
        <Theme>
            <C.Container>
                <p>Passo 3/3</p>
                <h1>Legal {state.name}, onde te achamos?</h1>
                <p>Preencha com seus contatos para conseguimos entrar em contato</p>

                <hr/>

                <label>
                    Qual seu E-mail
                    <input
                        type="text"
                        value={state.email}
                        onChange={handleEmailChange}
                    />
                </label>
                <label>
                    Qual seu GitHub?
                    <input
                        type="text"
                        value={state.github}
                        onChange={handleGithubChange}
                    />
                </label>
                <Link className="backbutton" to="/step2">Voltar</Link>
                <button onClick={handleNextStep}>Finalizar cadastro</button>
            </C.Container>
        </Theme>
    );
}