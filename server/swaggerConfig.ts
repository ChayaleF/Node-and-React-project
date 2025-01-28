import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import YAML from 'yamljs';
import path from 'path';

const setupSwagger = (app: Express) => {
  const swaggerDocument = YAML.load(path.resolve(__dirname, './swagger.yaml'));
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default setupSwagger;