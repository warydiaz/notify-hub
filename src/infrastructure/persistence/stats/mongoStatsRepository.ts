import { AlertModel } from '../alert/alertModel.js';
import { NotificationModel } from '../notification/notificationModel.js';

export class MongoStatsRepository {
  async alertsBySeverity() {
    return AlertModel.aggregate([
      { $match: { resolved: false } },
      { $group: { _id: '$severity', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
  }

  async notificationSuccessRate() {
    return NotificationModel.aggregate([
      {
        $group: {
          _id: '$channel',
          total: { $sum: 1 },
          successful: { $sum: { $cond: ['$success', 1, 0] } },
        },
      },
      {
        $project: {
          channel: '$_id',
          total: 1,
          successful: 1,
          rate: {
            $round: [{ $multiply: [{ $divide: ['$successful', '$total'] }, 100] }, 2],
          },
        },
      },
    ]);
  }

  async avgResolutionTimePerSeverity() {
    return AlertModel.aggregate([
      { $match: { resolved: true, resolvedAt: { $ne: null } } },
      {
        $project: {
          severity: 1,
          resolutionTimeMs: { $subtract: ['$resolvedAt', '$createdAt'] },
        },
      },
      {
        $group: {
          _id: '$severity',
          avgResolutionTimeMs: { $avg: '$resolutionTimeMs' },
        },
      },
      {
        $project: {
          severity: '$_id',
          avgResolutionTimeMinutes: {
            $round: [{ $divide: ['$avgResolutionTimeMs', 60000] }, 2],
          },
        },
      },
    ]);
  }

  async topActiveUsers() {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    return AlertModel.aggregate([
      { $match: { createdAt: { $gte: oneMonthAgo } } },
      { $group: { _id: '$userId', alertCount: { $sum: 1 } } },
      { $sort: { alertCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $project: {
          userId: '$_id',
          alertCount: 1,
          name: '$user.name',
          email: '$user.email',
        },
      },
    ]);
  }
}
