import Swal from 'sweetalert2';

const handleError = (errors) => {
  const errorKeys = Object.keys(errors);
  if (errorKeys.length === 1) {
    Swal.fire('Error', errors[errorKeys[0]].msg, 'error');
  } else {
    Swal.fire(
      'Error',
      `${errorKeys.reduce((acc, el) => {
        return `${acc}, ${el}`;
      })}, ${errors[errorKeys[0]].msg}`,
      'error'
    );
  }
};

export default handleError;
