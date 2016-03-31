import Sequelize from 'sequelize';
import Blueprint from '../blueprint/Blueprint';

export default sequelize => {
	const User = sequelize.define(`user`, {
		  email: { type: `citext`, allowNull: false, unique: true }
		, password: { type: Sequelize.TEXT, allowNull: false }
		, admin: { type: Sequelize.BOOLEAN, defaultValue: false }
		, mentor: { type: Sequelize.BOOLEAN, defaultValue: false }
		, uuid: { type: Sequelize.UUID, primaryKey: true }
	});

	Blueprint(sequelize).belongsToMany(User, { as: `edit`, foreignKey: `email`, through: `SharedEdit`});
	Blueprint(sequelize).belongsToMany(User, { as: `view`, foreignKey: `email`, through: `SharedView`});

	return User;
}