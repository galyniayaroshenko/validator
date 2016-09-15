/**
 * General validation
 * Register all fields
 * Create array of validators
 * Check for extra fields
 * Add possibility to add custom validator, e.g.:
  .add(function(value) {
    return User.checkByEmail(value);
  }) 
 * Async
 * Nested objects
 */

import { FormField } from './FormField'

class FormValidator {
  constructor() {
    this._fields = {};
  }

  /**
   * Add field
   */
  field(name) {
    if (name in this._fields) {
      throw new Error(`Field ${name} already exists`);
    }
    return this._fields[name] = new FormField(name);
  }



  /**
   * ???
   */
  validate(data) {
    let promises = [];

    let dataKeys = Object.keys(data);
    let fieldsKeys = Object.keys(this._fields);

    Array.prototype.diff = function(fieldsKeys) {
      return this.filter(function(dataKeys){
        return fieldsKeys.indexOf(dataKeys) < 0;
      });
    };

    let unexpectedFields = dataKeys.diff(fieldsKeys);

    if (unexpectedFields.length) {
      throw new Error(`Unexpected fields [${unexpectedFields}]`)
    }

    for (let fieldName in this._fields) {
      let field = this._fields[fieldName];

      promises.push(field.validate(data[field.name], data));
    }

    return Promise.all(promises)
      .then(data => {
        let result = {};

        data.forEach(fieldResult => {
          if (fieldResult && fieldResult.message) {
            result[fieldResult.field] = fieldResult.message;
          }
        });

        if (Object.keys(result).length) {
          return result;
        }
      });
  }
};

export { FormValidator };
