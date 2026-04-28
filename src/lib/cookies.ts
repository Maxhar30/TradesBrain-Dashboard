const TOKEN_KEY = "tb_token";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function setAuthCookie(token: string) {
  document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${MAX_AGE}; SameSite=Strict`;
}

export function clearAuthCookie() {
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
}

export function getAuthToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${TOKEN_KEY}=`));
  return match ? match.split("=")[1] : null;
}
