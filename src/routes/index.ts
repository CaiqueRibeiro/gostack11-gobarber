import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouters from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouters);
routes.use('/auth', sessionsRouter);

export default routes;
