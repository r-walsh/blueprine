// AUTH
import authRoutes from './features/auth/authRoutes';
import blueprintRoutes from './features/blueprint/blueprintRoutes';

export default app => {
	authRoutes( app );
	blueprintRoutes( app );
};