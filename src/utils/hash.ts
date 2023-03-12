import crypto from "crypto";
export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");

  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512");

  return { hash, salt };
}
export function verifyPassword(
  condidatePassword: string,
  password: string,
  salt: string
) {
  const condidateHash = crypto
    .pbkdf2Sync(condidatePassword, salt, 1000, 64, "sha512")
    .toString("hex");
  return condidateHash === password;
}
