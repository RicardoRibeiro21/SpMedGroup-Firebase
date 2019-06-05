import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component} from 'react';

export class MapContainer extends Component {
    constructor(){
        super();
        this.state ={
            abrirMap: MapContainer
        }
    }
    onInfoWindowClose(){
        console.log("A janela foi fechada.")
        return(
            <p>Para abrir novamente, clique aqui{this.state.abrirMap}</p>
        )
    }
  render() {
    return (
      <Map 
      google={this.props.google}
      styles={{width: '40%', height: '40%'}}
      onReady={this.fetchPlaces}
      onClick={this.mapClicked}
       initialCenter={{
        lat: -23.5411284,        
        lng:  -46.641581        
      }}    
      zoom={15}
      > 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} /> 
        <InfoWindow onClose={this.onInfoWindowClose}>                                                  
        </InfoWindow>
      </Map>
    );
  }
}
        
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCGjPUB8XFpT2scFtxqcDg_mrICDOufMjA'
})(MapContainer)