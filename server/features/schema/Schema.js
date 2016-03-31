import Sequelize from 'sequelize';

export default sequelize => {
	const Schema = sequelize.define(`schema`, {
		name: { type: Sequelize.TEXT, allowNull: false }
		, schema: { type: Sequelize.JSON, allowNull: false }
		, mvp: { type: Sequelize.BOOLEAN, allowNull: false }
		, complete: { type: Sequelize.BOOLEAN, defaultValue: false }
		, uuid: { type: Sequelize.UUID, primaryKey: true }
	} );
	return Schema;
}