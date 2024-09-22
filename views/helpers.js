const helpers = {
  getError: (errors, prop) => {
    // mapped() function will transform an array to object.
    // console.log(errors);
    try {
      return errors.mapped()[prop].msg;
    } catch (err) {
      return "";
    }
  },
};

export default helpers;
