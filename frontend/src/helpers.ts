function parseJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+")?.replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export function isAdminFromToken(token: string) {
  if ((parseJwt(token)["dev-mqe4ep84.us.auth0.comroles"] as string[]).includes("Admin"))
    return true;
  return false;
}
