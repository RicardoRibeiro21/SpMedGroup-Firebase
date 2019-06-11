import React, { Component } from 'react';
import firebase from '../services/firebase';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import '../assets/css/index.css'
const collection = 'localizacao_atendimento';

class Inicial extends Component {
    constructor() {
        super();
        this.state = {
            localizacao: "",
            lat: "",
            long: "",
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
    carregarClinica() {
        firebase.firestore().collection(collection)
            .where("clinica", "==", 'SpMedGroup')
            .get()
            .then((lista) => {
                let arrayClinica = [];
                lista.forEach((dado) => {
                    arrayClinica.push({
                        latitude: dado.data().latitude,
                        longitude: dado.data().longitude,
                        desc: dado.data().desc,
                        clinica: dado.data().clinica
                    })
                });
                this.setState({ clinicaArray: arrayClinica })
            })
    }
    carregarDados() {
        firebase.firestore().collection(collection)
            .where("idade_paciente", ">=", "0")
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
                this.setState({ dadosApi: array });
                console.log(this.state.dadosApi);
            })
    }
    atualizarEstado(event) {
        this.setState({ [event.target.name]: event.target.value })
    }
    cadastrarLocalizacao(event) {
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
                alert("Dados cadastrados com sucesso");
                // LIMPAR DADOS
            })
            .catch(erro => {
                alert('Alguma coisa deu bosta');
            })
        // }
    }

    render() {
        return (
            <div>
                <div className="Mapa">
                    <Map
                        style={{ width: ' 45% ', height: '50% ', position: ' relative ' }}
                        google={this.props.google}
                        onReady={this.fetchPlaces}
                        onClick={this.mapClicked}
                        initialCenter={{
                            lat: -23.5411284,
                            lng: -46.641581
                        }}
                        onDragend={this.centerMoved}
                        zoom={15}>

                        {
                            this.state.dadosApi.map((dado, key) => {
                                    return(
                                        <Marker key={key} position={{lat: dado.localizacao.split(",")[0], lng: dado.localizacao.split(",")[1]}} name={{key}}/>
                                    )
                            })
                        }

                        <Marker onMouseover={this.props.onMouseover}
                            onClick={this.props.onClick} />
                    </Map>
                </div>
                <div>
                    {this.state.clinicaArray.map((dados) => {
                        return (
                            <div className="title">
                                <h1>{dados.clinica}</h1>
                                <p>{dados.desc}</p>
                            </div>
                        )
                    })}
                </div>
                <form className="grid-form" onSubmit={this.cadastrarLocalizacao.bind(this)}>
                    <input className="input" type="text" name="lat" placeholder="Latitude" onChange={this.atualizarEstado.bind(this)} value={this.state.lat} required></input>
                    <input className="input" type="text" name="long" placeholder="Longitude" onChange={this.atualizarEstado.bind(this)} required value={this.state.long}></input>
                    <input className="input" type="text" name="idade_paciente" placeholder="Idade" onChange={this.atualizarEstado.bind(this)} required value={this.state.idade_paciente}></input>
                    <input className="input" type="text" name="doenca_paciente" placeholder="Resultado" onChange={this.atualizarEstado.bind(this)} required value={this.state.doenca_paciente}></input>
                    <input className="input" type="text" name="especialidade" placeholder="Especialidade" onChange={this.atualizarEstado.bind(this)} required value={this.state.especialidade}></input>
                    <button type="submit">Enviar</button>
                </form>
                <div className="container">
                    <table className="bordered striped centered">
                        <tbody>
                            <tr className="item">
                                <th>Idade Paciente</th>
                                <th>localizacao</th>
                                <th>Especialidade</th>
                                <th>Diagnóstico</th>
                                <th>Localizar</th>
                            </tr>
                            {this.state.dadosApi.map((dado) => {
                                return (
                                    <tr>
                                        <td>{dado.idade_paciente}</td>
                                        <td> {dado.localizacao} </td>
                                        <td>{dado.especialidade} </td>
                                        <td> {dado.doenca_paciente} </td>
                                        <td className="btn-td"><button className="btn-localizacao"><a href={`https://www.google.com.br/maps/@${dado.localizacao}`}>Ver localização</a></button></td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyCGjPUB8XFpT2scFtxqcDg_mrICDOufMjA',
    language: 'pt-br',
    // LoadingContainer: Animation
})(Inicial)

// export default Inicial;