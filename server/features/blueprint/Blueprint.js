import Sequelize from 'sequelize';
import Endpoint from '../endpoint/Endpoint';
import Feature from '../feature/Feature';
import Schema from '../schema/Schema';
import View from '../view/View';

export default sequelize => {
	const Blueprint = sequelize.define(`blueprint`, {
		title: { type: Sequelize.TEXT, allowNull: false }
		, description: { type: Sequelize.TEXT, allowNull: false }
		, idea: { type: Sequelize.TEXT }
		, users: { type: Sequelize.TEXT }
		, uuid: { type: Sequelize.UUID, primaryKey: true }
		, test: Sequelize.TEXT
	} );

	Endpoint(sequelize).belongsTo(Blueprint);
	Feature(sequelize).belongsTo(Blueprint);
	Schema(sequelize).belongsTo(Blueprint);
	View(sequelize).belongsTo(Blueprint);

	return Blueprint;
}