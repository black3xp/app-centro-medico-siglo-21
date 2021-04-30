import jwtDecode from 'jwt-decode';
// eslint-disable-next-line import/no-mutable-exports
const isLogin = () => localStorage.getItem('auth');

const isPatient = () => {
  const usuario = jwtDecode(localStorage.getItem('auth'));
  if (usuario.patient_id !== '') {
    return true;
  }
  return false;
};

const url = 'https://test.cmsiglo21.app/api';
// const url = 'http://192.168.1.124:90/api';
// const url = 'https://api.cthrics.com/api';

export { isLogin, url, isPatient };
