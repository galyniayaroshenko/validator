class FormField {
  constructor(name) {
    this._validators = [];

    this.name = name;
  }

  /* public methods  */
  validate(value, data) {
    // console.log('Object.keys(data)', Object.keys(data)[0]);

    // console.log('data', data);
    // console.log('value', value);
    console.log( Object.keys(data).forEach(function(item, i, arr) {
      
      console.log('item, i, arr',  arr[i] );
    }));

    // console.log('this.name', this.name);
    // console.log('data', data)
    // if () {

    // }
    return this._validatorRun(0, value, data);
  }

  /* validators */
  testAsync() {
    this._validators.push(value => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve('Something wrong with field');
        }, 3000);
      });
    });
    return this;    
  }

  required() {
    this._validators.push(value => {
      if (value == null) {
        return 'Field is required';
      }      
    });
    return this;
  }

  type(type) {    
    this._validators.push(value => {
      if (value != null && value.constructor !== type) {
        return `Expected type ${type.name}, but ${value.constructor.name} found`;
      }
    });
    return this;
  }

  /* private methods */
  _validatorRun(index, value, data) {
    const validator = this._validators[index];
    let result;

    if (validator) {
      result = validator(value, data) || '';

      if (result.constructor === Promise) {
        result = result.then(validationError => {
          if (validationError) {
            return {
              field: this.name,
              message: validationError
            };            
          }
          return this._validatorRun(index + 1, value, data);
        });        
      } else 
      if (result) {
        result = {
          field: this.name,
          message: result
        };
      } else {
        result = this._validatorRun(index + 1, value, data);
      }            
    }
    return Promise.resolve(result);
  }
};

export { FormField };