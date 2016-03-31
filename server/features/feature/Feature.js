import Sequelize from 'sequelize';

export default sequelize => {
	const Feature = sequelize.define(`feature`, {
		feature: { type: Sequelize.TEXT, allowNull: false }
		, mvp: { type: Sequelize.BOOLEAN, allowNull: false }
		, complete: { type: Sequelize.BOOLEAN, defaultValue: false }
		, uuid: { type: Sequelize.UUID, primaryKey: true }
	} );
	return Feature;
}