import { Router } from 'express';
import categoryRoute from './category.route';
import contactRoutes from './contact.route';
import featuresRoutes from './features.route';
import overviewRoute from './overview.route';
import testimonialsRoute from './testimonials.route';
import productRoute from './product.route';

const routes = Router();

routes.use('/api/v1/product-category', categoryRoute);
routes.use('/api/v1/features', featuresRoutes);
routes.use('/api/v1/contact', contactRoutes);
routes.use('/api/v1/testimonials', testimonialsRoute);
routes.use('/api/v1/overview', overviewRoute);
routes.use('/api/v1/product', productRoute);

export default routes;
