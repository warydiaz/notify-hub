export const createAlertSchema = {
  tags: ['Alerts'],
  body: {
    type: 'object',
    required: ['title', 'message', 'severity'],
    properties: {
      title: { type: 'string' },
      message: { type: 'string' },
      severity: { type: 'string', enum: ['low', 'medium', 'high'] },
    },
  },
};

export const getAlertsSchema = {
  tags: ['Alerts'],
  querystring: {
    type: 'object',
    properties: {
      severity: { type: 'string', enum: ['low', 'medium', 'high'] },
      resolved: { type: 'boolean' },
      page: { type: 'integer', minimum: 1 },
      limit: { type: 'integer', minimum: 1, maximum: 100 },
    },
  },
};

export const getAlertByIdSchema = {
  tags: ['Alerts'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' },
    },
  },
};

export const resolveAlertSchema = {
  tags: ['Alerts'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' },
    },
  },
};

export const deleteAlertSchema = {
  tags: ['Alerts'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' },
    },
  },
};
