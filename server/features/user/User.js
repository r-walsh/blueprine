const User = {
	  email: { type: String, required: true, unique: true }
	, password: { type: String, required: true }
	, admin: { type: Boolean, default: false }
	, mentor: { type: Boolean, default: false }
	, blueprints: {
		  owned: [`Refs to blueprint model`]
		, sharedWith: [`Refs to blueprint model`]
	}
	, createdAt: { type: Date, default: new Date() }
	, updatedAt: { type: Date }
};