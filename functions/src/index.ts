import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

// Función para obtener todos los usuarios registrados
export const getUsers = functions.https.onRequest(async (req, res) => {
  try {
    const listUsers = await admin.auth().listUsers(); // Listar usuarios

    // Crear una lista de usuarios con los datos deseados
    const users = listUsers.users.map((user) => ({
      uid: user.uid,
      email: user.email ?? null, // Si el email es undefined, se asigna null
      displayName: user.displayName ?? null,
    }));

    // Enviar la respuesta con los usuarios
    res.status(200).json({users});
  } catch (error) {
    console.error("Error al obtener usuarios: ", error);
    res.status(500).send("Error al obtener usuarios");
  }
});
