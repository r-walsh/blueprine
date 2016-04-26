import mongoose from 'mongoose';
const { Schema } = mongoose;

const View = Schema( {
	  name: { type: String, required: true }
	, description: { type: String, required: true }
	, mvp: { type: Boolean, required: true }
	, complete: { type: Boolean, default: false }
	, features: [{ type: Schema.Types.ObjectId, ref: `Feature` }]
	, endpoints: [{ type: Schema.Types.ObjectId, ref: `Endpoint` }]
} );

export default mongoose.model( `View`, View );

// import Sequelize from 'sequelize';
// import Feature from '../feature/Feature';
// import Endpoint from '../endpoint/Endpoint';
//
// export default sequelize => {
// 	const View = sequelize.define(`view`, {
// 		name: { type: Sequelize.TEXT, allowNull: false }
// 		, description: { type: Sequelize.TEXT, allowNull: false }
// 		, mvp: { type: Sequelize.BOOLEAN, allowNull: false }
// 		, complete: { type: Sequelize.BOOLEAN, defaultValue: false }
// 		, uuid: { type: Sequelize.UUID, primaryKey: true }
// 	} );
//
// 	View.belongsToMany(Feature(sequelize), { through: `viewFeatures` });
// 	View.belongsToMany(Endpoint(sequelize), { through: `viewEndpoints` });
//
// 	return View;
// }

/*
 //blueprint owner

 CREATE TABLE blueprints (
 title text NOT NULL,
 description text NOT NULL,
 idea text,
 users text,
 uuid uuid NOT NULL,
 test text,
 ownerUuid uuid NOT NULL,
 "createdAt" timestamp with time zone NOT NULL,
 "updatedAt" timestamp with time zone NOT NULL
 );

 CREATE TABLE users (
 email citext NOT NULL,
 password text NOT NULL,
 admin boolean DEFAULT false,
 mentor boolean DEFAULT false,
 uuid uuid NOT NULL,
 "createdAt" timestamp with time zone NOT NULL,
 "updatedAt" timestamp with time zone NOT NULL
 );

 CREATE TABLE shareTypes (
 name text NOT NULL,
 uuid uuid NOT NULL
 );

 CREATE TABLE sharedBlueprints (
 blueprintUuid uuid NOT NULL,
 sharedWithUuid uuid NOT NULL,
 shareTypeUuid uuid NOT NULL,
 "createdAt" timestamp with time zone NOT NULL,
 "updatedAt" timestamp with time zone NOT NULL
 );


 then i added two new tables, shareTypes and sharedBlueprints
 shareTypes is basically a reference table, you'll probably have two records in there, one named "View"
 and one named "Edit"
 or whatever other permissions
 you might even change the name to sharePermissions
 then there is sharedBlueprints, which is a join table between users, blueprints, and shareTypes
 so like if you wanted to get all the blueprints that are shared with ryan@meatspin.com with view privileges,
 you would query it like this


 select bp.*
 from blueprints bp
 inner join sharedBlueprints sbp on sbp.blueprintUuuid = bp.uuid
 inner join users u on u.uuid = sbp.sharedWithUuid
 inner join shareTypes st on st.uuid = sbp.shareTypeUuid
 where u.email = 'ryan@meatspin.com'
 and st.name = 'View'
 */