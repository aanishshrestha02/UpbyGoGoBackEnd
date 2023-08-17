const { format } = require('date-fns');
const { Model } = require('objection');

class Categories extends Model {
    static get tableName() {
        return 'item_categories';
    }

    static get idColumn() {
        return 'id';
    }

    static get relationMappings() {
        const Items = require('./items');
        return {
            items: {
                relation: Model.HasManyRelation,
                modelClass: Items,
                join: {
                    from: 'item_categories.id',
                    to: 'items.category_id'
                }
            },
            category: {
                relation: Model.HasManyRelation,
                modelClass: Categories,
                join: {
                    from: 'item_categories.id',
                    to: 'item_categories.parent_category'
                }
            },
            parentCategory: {
                relation: Model.BelongsToOneRelation,
                modelClass: Categories,
                join: {
                    from: 'item_categories.parent_category',
                    to: 'item_categories.id'
                }
            }
        };
    }

    $beforeInsert() {
        this.created_at = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    }

    $beforeUpdate() {
        this.updated_at = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    }
}

module.exports = Categories;