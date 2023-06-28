import { Router } from 'express';
import categoryRoute from './category.route';
import contactRoutes from './contact.route';
import featuresRoutes from './features.route';
import overviewRoute from './overview.route';
import productRoute from './product.route';
import projectRoute from './project.route';
import testimonialsRoute from './testimonials.route';
import authRoute from './auth.route';
import userRoute from './user.route';

const routes = Router();

routes.use('/api/v1/product-category', categoryRoute);
routes.use('/api/v1/features', featuresRoutes);
routes.use('/api/v1/contact', contactRoutes);
routes.use('/api/v1/testimonials', testimonialsRoute);
routes.use('/api/v1/overview', overviewRoute);
routes.use('/api/v1/product', productRoute);
routes.use('/api/v1/project', projectRoute);
routes.use('/api/v1/auth', authRoute);
routes.use('/api/v1/user', userRoute);

export default routes;
