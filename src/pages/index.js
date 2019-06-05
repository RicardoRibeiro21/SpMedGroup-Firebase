import React, {Component } from 'react';
import firebase from '../services/firebase';
import '../assets/css/mapstyle.css' 
import MapContainer from '../pages/mapTest'
import google from 'google-maps-react';
const collection = 'localizacao_atendimento';

class Inicial extends Component{
    constructor(){
        super();
        this.state = {
            localizacao: "",
            lat: "",
            long:"",    
            especialidade: "",
            idade_paciente: "",
            doenca_paciente: "",
            dadosApi: [],
            clinicaArray: [],
            latitude: "",
            longitude: "",
            clinica: "",
            desc: "",
            }       
    }

    componentDidMount() {
        this.carregarDados();
        this.carregarClinica();
    }
    carregarClinica(){
        firebase.firestore().collection(collection)
        .where("clinica", "==", 'SpMedGroup')
        .get()
        .then((lista) =>  {
            let arrayClinica =[];
            lista.forEach((dado) => {
                arrayClinica.push({
                    latitude: dado.data().latitude,
                    longitude: dado.data().longitude,
                    desc: dado.data().desc,
                    clinica: dado.data().clinica
                })
            });
            this.setState({ clinicaArray : arrayClinica})
        })
    }
    carregarDados(){           
        firebase.firestore().collection(collection)
        .where("idade_paciente",  ">=" , "0")
        .get()
        .then((lista) => {
            let array = [];
            lista.forEach((dado) => {
                array.push({
                    idade_paciente: dado.data().idade_paciente,
                    // localizacao: dado.data().localizacao.split("@")[0],
                    localizacao: dado.data().localizacao,
                    especialidade: dado.data().especialidade,
                    doenca_paciente: dado.data().doenca_paciente
                })
            })
            this.setState({ dadosApi : array}); 
            console.log(this.state.dadosApi);
        })
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
                    localizacao: this.state.lat + ' , ' + this.state.long,
                    idade_paciente: this.state.idade_paciente,
                    especialidade: this.state.especialidade,
                    doenca_paciente: this.state.doenca_paciente
                }
                )
                .then(resposta => {
                    alert("Dados cadastrados com sucesso" );                        
                           // LIMPAR DADOS
                    })
                .catch(erro => { 
                    alert('Alguma coisa deu bosta');
            })
        // }
    }
        
    render(){
        return(
            <div>
                <p>{this.state.dadosApi.map((dado, key) => {
                    return(
                        <div>
                        <li key={key}>
                                {dado.idade_paciente} | {dado.localizacao} | {dado.especialidade} | {dado.doenca_paciente} | <button><a href={`https://www.google.com.br/maps/@${dado.localizacao}`}>Ver localização</a></button>
                            </li>
                        
                        </div>
                    )
                })}</p>
                <form onSubmit={this.cadastrarLocalizacao.bind(this)}>
                    <input type="text" name="lat"placeholder="Latitude" onChange={this.atualizarEstado.bind(this)} value={this.state.lat} required></input>
                    <input  type="text" name="long"placeholder="Longitude" onChange={this.atualizarEstado.bind(this)} required value={this.state.long}></input>
                    <input type="text" name="idade_paciente"placeholder="Idade" onChange={this.atualizarEstado.bind(this)} required value={this.state.idade_paciente}></input>
                    <input type="text" name="doenca_paciente"placeholder="Resultado" onChange={this.atualizarEstado.bind(this)} required value={this.state.doenca_paciente}></input>
                    <input type="text" name="especialidade" placeholder="Especialidade" onChange={this.atualizarEstado.bind(this)} required value={this.state.especialidade}></input>
                    <button  type="submit">Enviar</button>
                </form>    
                <div className="Mapa">
                    <p>{this.state.clinicaArray.map((dados) =>{
                        return(
                            <div>
                                <h1>{dados.clinica}</h1>
                                <p>{dados.desc}</p>
                            </div>
                        )
                    })}</p>
                    <MapContainer google={this.props.google} 
                    />
      </div>
    </div>   
        )
    }
}


export default Inicial;