const { Model } = require('objection');
const jwt = require('jsonwebtoken');
const { format } = require('date-fns');

class Customer extends Model {
    static get tableName() {
        return 'customers';
    }

    static get idColumn() {
        return 'id';
    }

    static get relationMappings() {
        return {};
    }

    $formatJson(json) {
        json = super.$formatJson(json);
        delete json.password;
        return json;
    }
    
    $beforeInsert() {
        this.created_at = format(new Date(), 'yyyy-MM-dd HH:mm:ss')

    }

    $beforeUpdate() {
        this.updated_at = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    }

    generateAuthToken(customerId) {
        return jwt.sign({ id: customerId }, process.env.MY_SECRET_KEY);
    }


}

module.exports = Customer;