const Blueprint = {
	  title: { type: String, required: true }
	, description: { type: String, required: true }
	, createdAt: { type: Date }
	, updatedAt: { type: Date }
	, sharedWith: [`user emails`]
	, categories: {
		  idea: { type: String }
		, users: [ String ]
		, features: [{
			  feature: { type: String, required: true }
			, mvp: { type: Boolean, required: true }
			, complete: { type: Boolean, default: false }
		}]
		, views: [{
			  viewName: { type: String, required: true }
			, mvp: { type: Boolean, required: true }
			, complete: { type: Boolean, default: false }
			, viewFeatures: [`Refs to features`]
			, endpoints: [`Refs to endpoints`]
			, viewDescription: { type: String, required: true }
		}]
		, endpoints: [{
			  url: { type: String, required: true }
			, mvp: { type: Boolean, required: true }
			, complete: { type: Boolean, default: false }
			, schema: { type: `ObjectId`, refTo: `Schemas` }
			, endpointDescription: { type: String, required: true }
		}]
		, schema: [{
			  name: { type: String, required: true }
			, mvp: { type: Boolean, required: true }
			, complete: { type: Boolean, default: false }
			, schema: { type: Object, required: true }
		}]
	}
};