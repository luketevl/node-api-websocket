import qrcode from './qrcode';

const registerRouters = (app) => {
  app.get('/', (req, res) => res.json({ message: 'Welcome to management' }));
  app.use('/qrcode', qrcode);
};
export default registerRouters;
