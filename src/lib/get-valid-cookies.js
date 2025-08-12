import decodeJWT from "./decode-jwt";

export async function getValidCookies(context) {
  const access_token = context.cookies.get("sb-access-token")?.value;
  const refresh_token = context.cookies.get("sb-refresh-token")?.value;

  if (!access_token || !refresh_token) return null;
  const decoded = decodeJWT(access_token);
  if (decoded.user_metadata) {
    return decoded.user_metadata;
  }
}
