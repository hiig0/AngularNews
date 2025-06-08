import { Router, Request, Response, NextFunction } from 'express';
import admin from '../firebase-config';
import axios from 'axios';

const router: Router = Router();

interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

// Middleware para verificar token Firebase
const verifyFirebaseToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    res.status(401).json({ message: 'Token não fornecido' });
    return;
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    res.status(403).json({ message: 'Token inválido' });
  }
};

// Rota de registro
const handleRegister = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
    return;
  }

  try {
    const userRecord = await admin.auth().createUser({
      displayName: username,
      email,
      password,
    });

    // Salvar dados adicionais no Firestore (opcional)
    // await admin.firestore().collection('usuarios').doc(userRecord.uid).set({ nome, email, createdAt: new Date() });

    res.status(201).json({
      message: 'Usuário registrado com sucesso!',
      uid: userRecord.uid,
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário', error });
  }
};

// Rota de login
const handleLogin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    return;
  }

  try {
    const firebaseApiKey = process.env.FIREBASE_API_KEY;
    if (!firebaseApiKey) {
      res.status(500).json({ message: 'Firebase API Key não configurada no backend' });
      return;
    }

    // Login via API REST do Firebase
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    const { idToken, localId } = response.data;

    // Buscar os dados do usuário com o UID
    const userRecord = await admin.auth().getUser(localId);

    res.status(200).json({
      message: 'Login bem-sucedido',
      token: idToken,
      user: {
        name: userRecord.displayName || 'Usuário',
        email: userRecord.email || email,
      }
    });

  } catch (error: any) {
    console.error('Erro no login:', error.response?.data || error.message);
    res.status(401).json({ message: 'Falha ao autenticar usuário', error: error.response?.data });
  }
};


// Rota protegida
const handleProfile = (req: AuthenticatedRequest, res: Response): void => {
  res.status(200).json({
    message: 'Token válido. Acesso autorizado!',
    user: req.user,
  });
};

// Registro das rotas
router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.get('/profile', verifyFirebaseToken, handleProfile);

export default router;
