import React, {Component } from 'react';
import firebase from '../services/firebase';

const collection = 'localizacao_atendimento';
class Inicial extends Component{
    constructor(){
        super();
        this.state = {
            endereco: "",
            lat: "",
            long:"",
            especialidade: "",
            idade: "",
            resultado: "",
            dadosApi: []
        }       
    }
    componentDidMount() {
        this.carregarDados();
    }
    carregarDados(){           
        firebase.firestore().collection(collection)
        .get()
        .then((lista) => {
            let array = [];
            lista.forEach((dado) => {
                array.push({
                    idade: dado.idade_paciente,
                    endereco: dado.localizacao,
                    especialidade: dado.especialidade,
                    doenca_paciente: dado.doenca_paciente
                })
            })
            this.setState({ dadosApi : array}); 
        })
        .catch(
            alert("Algo inesperado aconteceu."));
    }
    atualizarEstado(event){
        this.setState({[event.target.name] : event.target.value})        
    }
    cadastrarLocalizacao(event){
        event.preventDefault();
        // if(this.state.idade === 0 || this.state.idade === null  || this.state.idade === ''){
        //     alert('Deverá fazer atualização');
        // } else{
            firebase.firestore().collection(collection).add(
                {
                    localizacao: this.state.lat + ',' + this.state.long,
                    idade_paciente: this.state.idade,
                    especialidade: this.state.especialidade,
                    doenca_paciente: this.state.resultado
                }
                )
                .then(resposta => {
                    alert("Localização cadastrada com sucesso" );                        
                           // LIMPAR DADOS
                    })
                .catch(erro => { 
                    alert('Alguma coisa deu bosta')
            })
        // }
    }

    render(){
        return(
            <div>
                {/* <p>{this.dadosApi.map()}</p> */}
                <form onSubmit={this.cadastrarLocalizacao.bind(this)}>
                    <input type="text" name="lat"placeholder="Latitude"  onChange={this.atualizarEstado.bind(this)} value={this.state.lat} required></input>
                    <input  type="text" name="long"placeholder="Longitude"onChange={this.atualizarEstado.bind(this)} required value={this.state.long}></input>
                    <input type="text" name="idade"placeholder="Idade" onChange={this.atualizarEstado.bind(this)} required value={this.state.idade}></input>
                    <input type="text" name="resultado"placeholder="Resultado" onChange={this.atualizarEstado.bind(this)} required value={this.state.resultado}></input>
                    <input type="text" name="especialidade" placeholder="Especialidade" onChange={this.atualizarEstado.bind(this)} required value={this.state.especialidade}></input>
                    <button  type="submit">Enviar</button>
                </form>
            </div>   
        )
    }
}
export default Inicial;