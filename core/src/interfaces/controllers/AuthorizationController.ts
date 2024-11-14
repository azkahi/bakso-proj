import { decode } from "../../infrastructure/security/JwtAccessTokenManager";

export default function verifyAccessToken(request) {
  const authorizationHeader = request.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    throw new Error('Not authorized')
  }
  const accessToken = authorizationHeader.replace(/Bearer/gi, '').replace(/ /g, '');

  try {
    const decoded_response = decode(accessToken);

    return decoded_response
  } catch (err) {
    throw new Error('Not authorized')
  }
}