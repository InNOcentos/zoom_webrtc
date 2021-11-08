export const bcryptSalt = 20

export const jwtTokensConfig = {
    accessTokenExpires: '15m',
    refreshTokenExpires: '30d',
    accessTokenSecret: process.env.accessTokenSecret || 'test',
    refreshTokenSecret: process.env.refreshTokenSecret || 'test123'
}
