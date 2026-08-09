import { jwtVerify, JWTPayload } from 'jose';

type TVerifyResult =
  | { success: true; data: JWTPayload }
  | { success: false; data: null };

const verifyToken = async (
  token: string,
  secret: string
): Promise<TVerifyResult> => {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return { success: true, data: payload };
  } catch {
    return { success: false, data: null };
  }
};

export const jwtUtils = {
  verifyToken,
};