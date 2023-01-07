export default {
  schedules: {
    fetch: () => 'schedules',
    fetchById: (id: string) => `schedules/${id}`,
  }
}