export const getSubscriptionsSchema = {
  tags: ['Subscriptions'],
};

export const subscribeChannelSchema = {
  tags: ['Subscriptions'],
  params: {
    type: 'object',
    required: ['channel'],
    properties: {
      channel: { type: 'string', enum: ['email', 'ws'] },
    },
  },
};

export const unsubscribeChannelSchema = {
  tags: ['Subscriptions'],
  params: {
    type: 'object',
    required: ['channel'],
    properties: {
      channel: { type: 'string', enum: ['email', 'ws'] },
    },
  },
};
