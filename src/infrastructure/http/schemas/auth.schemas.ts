export const registerSchema = {
  tags: ['Auth'],
  body: {
    type: 'object',
    required: ['email', 'password', 'name'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 6 },
      name: { type: 'string' },
    },
  },
};

export const loginSchema = {
  tags: ['Auth'],
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
    },
  },
};

export const refreshSchema = {
  tags: ['Auth'],
  body: {
    type: 'object',
    required: ['token'],
    properties: {
      token: { type: 'string' },
    },
  },
};

export const logoutSchema = {
  tags: ['Auth'],
  body: {
    type: 'object',
    required: ['token'],
    properties: {
      token: { type: 'string' },
    },
  },
};
