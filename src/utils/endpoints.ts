export default {
  auth: {
    validateToken: () => 'auth/validate'
  },
  schedules: {
    fetch: () => 'schedules',
    fetchById: (id: string) => `schedules/${id}`,
  }
}