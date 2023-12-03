const ERROR_DICTIONARY = {
  notFoundOne: { status: 404, message: "No encontrado" },
  notFound: { status: 404, message: "No encontrados" },
  incomplete: { status: 400, message: "Valores incompletos" },
  auth: {
    status: 401,
    message: "Credenciales inválidas, se requiere autenticación",
  },
  forbidden: { status: 403, message: "No permitido" },
  registered: { status: 403, message: "Ya existe registro con ese email" },
  default: { status: 500, message: "Error en el manejo de datos" },
};

export default ERROR_DICTIONARY;
