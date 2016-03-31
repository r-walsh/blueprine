import Sequelize from 'sequelize';
import Schema from '../schema/Schema';

export default sequelize => {
	const Endpoint = sequelize.define(`endpoint`, {
		url: { type: Sequelize.TEXT, allowNull: false }
		, mvp: { type: Sequelize.BOOLEAN, allowNull: false }
		, complete: { type: Sequelize.BOOLEAN, defaultValue: false }
		, description: { type: Sequelize.TEXT, allowNull: false }
		, uuid: { type: Sequelize.UUID, primaryKey: true }
	} );
	Schema(sequelize).belongsTo(Endpoint);

	return Endpoint;
}