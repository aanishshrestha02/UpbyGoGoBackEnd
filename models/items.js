const { Model } = require('objection');
const { format } = require('date-fns');

class Items extends Model {
    static get tableName() {
        return 'items';
    }

    static get idColumn() {
        return 'id';
    }

    static get relationMappings() {
        const Categories = require('./categories');
        return {
            category: {
                relation: Model.BelongsToOneRelation,
                modelClass: Categories,
                join: {
                    from: 'items.category_id',
                    to: 'item_categories.id'
                }
            }
        };
    }

    $beforeInsert() {
        console.log("format(new Date(), 'yyyy-MM-dd HH:mm:ss')", format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
    }

    $beforeUpdate() {
        console.log("format(new Date(), 'yyyy-MM-dd HH:mm:ss')", format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
    }
}

module.exports = Items;