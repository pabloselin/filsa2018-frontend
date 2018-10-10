import React, { Component } from "react";
import GrupoColaborador from "./GrupoColaborador";

class Colaboradores extends Component {
	render() {
		return (
			<div>
				<GrupoColaborador title="Organiza" key="organiza" grupo={this.props.colaboradores.organiza} />
				<GrupoColaborador title="Patrocina" key="patrocina" grupo={this.props.colaboradores.patrocina} />
				<GrupoColaborador title="Apoya" key="apoya" grupo={this.props.colaboradores.apoya} />
				<GrupoColaborador title="Auspicia" key="auspicia" grupo={this.props.colaboradores.auspicia} />
				<GrupoColaborador title="Colaboran" key="colaboran" grupo={this.props.colaboradores.colaboran} />
				<GrupoColaborador title="Medios Asociados" key="medios" grupo={this.props.colaboradores.medios} />
				<GrupoColaborador title="Participa" key="participa" grupo={this.props.colaboradores.participa} />
			</div>
		);
	}
}

export default Colaboradores;
