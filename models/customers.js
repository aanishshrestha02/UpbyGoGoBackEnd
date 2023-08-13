const { Model } = require('objection');
const jwt = require('jsonwebtoken');

class Customer extends Model {
    static get tableName() {
        return 'customers';
    }

    static get idColumn() {
        return 'id';
    }

    static get relationMappings() {
o9
        return {};
    }

    $formatJson(json) {
        json = super.$formatJson(json);
        delete json.password;
        return json;
    }

    generateAuthToken(customerId) {
        return jwt.sign({ id: customerId }, process.env.MY_SECRET_KEY);
    }

}

module.exports = Customer;