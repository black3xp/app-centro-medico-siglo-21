import { createStore } from 'vuex';

export default createStore({
  state: {
    tipoSeguro: '',
    colectivo: '',
    motivoSolicitud: '',
    fotosCovid: [],
    servicioSeleccionado: '',
    numeroSolicitud: '',
    sintomas: [
      { id: 1, nombre: 'Fiebre', check: false },
      { id: 2, nombre: 'Debilidad', check: false },
      { id: 3, nombre: 'Cansancio', check: false },
      { id: 4, nombre: 'Dolor de cabeza', check: false },
      { id: 5, nombre: 'Perdida de apetito', check: false },
      { id: 6, nombre: 'Dolores articulares', check: false },
      { id: 7, nombre: 'Dolores musculares', check: false },
      { id: 8, nombre: 'Dolor de garganta', check: false },
      { id: 9, nombre: 'Dolor de cuerpo', check: false },
      { id: 10, nombre: 'Tos seca', check: false },
      { id: 11, nombre: 'Tos por mas de 14 días', check: false },
      { id: 12, nombre: 'Dificultad para respirar', check: false },
      { id: 13, nombre: 'Congestión nasal', check: false },
      { id: 14, nombre: 'Estornudo', check: false },
      { id: 15, nombre: 'Dolor de pecho/espalda', check: false },
      { id: 16, nombre: 'Nauseas', check: false },
      { id: 17, nombre: 'Vomitos', check: false },
      { id: 18, nombre: 'Diarrea acuosa', check: false },
      { id: 19, nombre: 'Dolor abdominal', check: false },
    ],
  },
  mutations: {
    estadosSolicitudCovid(state, datos) {
      state.tipoSeguro = datos.tipoSeguro;
      state.colectivo = datos.colectivo;
      state.motivoSolicitud = datos.motivoSolicitud;
      state.allSintomas = datos.allSintomas;
      state.fotosCovid = datos.fotosCovid;
      state.servicioSeleccionado = datos.servicio;
    },
    asignarSintomas(state, datos) {
      state.sintomas = datos;
    },
    actualizarNumeroSolicitud(state, solicitud) {
      state.numeroSolicitud = solicitud;
    },
  },
  actions: {
  },
  modules: {
  },
});
