
export enum TransactionTypeCode {
  'Ingreso'='I',
  'Salida'='E'
}

export function decodeToken(token: string): any | null {
  try {
    const payload = token.split('.')[1]; 
    const decoded = atob(payload);
    const json = JSON.parse(decoded);

    // Map long claim URIs to shorter names
    const mapped = {
      id: json["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
      username: json["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      idRole: json["RoleId"],
      role: json["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
      exp: json["exp"],
      iss: json["iss"],
      aud: json["aud"]
    };

    return mapped;
  } catch {
    return null;
  }
}
