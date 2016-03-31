import Sequelize from 'sequelize';
import Feature from '../feature/Feature';
import Endpoint from '../endpoint/Endpoint';

export default sequelize => {
	const View = sequelize.define(`view`, {
		name: { type: Sequelize.TEXT, allowNull: false }
		, description: { type: Sequelize.TEXT, allowNull: false }
		, mvp: { type: Sequelize.BOOLEAN, allowNull: false }
		, complete: { type: Sequelize.BOOLEAN, defaultValue: false }
		, uuid: { type: Sequelize.UUID, primaryKey: true }
	} );

	Feature(sequelize).belongsTo( View );
	Endpoint(sequelize).belongsTo( View );

	return View;
}