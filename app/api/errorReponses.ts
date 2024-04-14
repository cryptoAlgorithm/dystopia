export const noAuthResponse = Response.json(
  { error: 'Insufficient permissions' },
  { status: 401 }
)
